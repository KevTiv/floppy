import {
  Canvas,
  Circle,
  dist,
  Image,
  ImageShader,
  makeImageFromView,
  mix,
  SkImage,
  vec,
} from '@shopify/react-native-skia';
import React, {
  createContext,
  ReactElement,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../store';

interface ColorScheme {
  active: boolean;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

interface ColorSchemeContext extends ColorScheme {
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{ x: number; y: number; r: number }>;
  dispatch: (scheme: ColorScheme) => void;
}

interface ColorSchemeProviderProps {
  children: ReactElement;
}

const TIME_OUT = 12;
const TRANSITION = 450;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const SCREEN_CORNERS = [
  vec(0, 0),
  vec(SCREEN_WIDTH, 0),
  vec(SCREEN_WIDTH, SCREEN_HEIGHT),
  vec(0, SCREEN_HEIGHT),
];

const defaultValue: ColorScheme = {
  active: false,
  overlay1: null,
  overlay2: null,
};

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const { toggleTheme, colorSchemeName } = useTheme();
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error('No ColorScheme context context found');
  }
  const { dispatch, ref, transition, circle, active } = ctx;
  const newColorScheme = useMemo(() => colorSchemeName, [colorSchemeName]);
  const toggle = useCallback(
    async (x: number, y: number) => {
      dispatch({
        active: true,
        overlay1: null,
        overlay2: null,
      });
      // 0. Define the circle and its maximum radius
      const r = Math.max(
        ...SCREEN_CORNERS.map((corner) => dist(corner, { x, y })),
      );
      circle.value = { x, y, r };

      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref);
      // 2. display it
      dispatch({
        active: true,
        overlay1,
        overlay2: null,
      });
      // 3. switch to next theme mode
      toggleTheme();
      await wait(TIME_OUT);
      dispatch({
        active: true,
        overlay1,
        overlay2: null,
      });
      // 4. wait for the next theme to render
      await wait(TIME_OUT);
      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        active: true,
        // colorScheme: newColorScheme,
        overlay1,
        overlay2,
      });
      // 6. transition
      transition.value = 0;
      transition.value = withTiming(1, { duration: TRANSITION });
      await wait(TRANSITION);
      dispatch({
        active: false,
        overlay1: null,
        overlay2: null,
      });
    },
    [circle, dispatch, newColorScheme, ref, toggleTheme, transition],
  );
  return { toggle, active };
};

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);
  const ref = useRef<View>(null);
  const [{ overlay1, overlay2, active }, dispatch] = useReducer(
    colorSchemeReducer,
    defaultValue,
  );
  const clipRadius = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  const contextValue = useMemo(
    () => ({
      active,
      overlay1,
      overlay2,
      dispatch,
      ref,
      transition,
      circle,
    }),
    [active, circle, overlay1, overlay2, transition],
  );

  return (
    <>
      <View ref={ref} style={styles.container}>
        <ColorSchemeContext.Provider value={contextValue}>
          {children}
        </ColorSchemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
        <Image
          image={overlay1}
          x={0}
          y={0}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
        />
        {overlay2 && (
          <Circle c={circle} r={clipRadius}>
            <ImageShader
              image={overlay2}
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
