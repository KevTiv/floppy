import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../store';
import { useColorScheme } from './ColorSchemeProvider';
import { Feather } from '@expo/vector-icons';

type ToggleThemeButtonProps = {
  size?: number;
};

export const ToggleThemeButton = ({ size }: ToggleThemeButtonProps) => {
  const { theme, colorSchemeName } = useTheme();
  const { toggle, active } = useColorScheme();
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <Pressable style={styles.container}>
        {colorSchemeName === 'dark' ? (
          <Feather name="moon" size={size} color={theme.text} />
        ) : (
          <Feather name="sun" size={size} color={theme.text} />
        )}
      </Pressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12
  }
})
