/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, StyleSheet } from 'react-native';
import {Canvas as DefaultCanvas} from "@shopify/react-native-skia";
import { useTheme } from '../../store';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & typeof DefaultText.arguments;
export type ViewProps = ThemeProps & typeof DefaultView.arguments;
export type CanvasProps = ThemeProps & typeof DefaultCanvas.arguments;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <DefaultText
      style={[{ color: theme.text }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { theme } = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: theme.background}, styles.defaultContainer, style]}
      {...otherProps}
    />
  );
}

export function Canvas(props: CanvasProps) {
  const { style, lightColor, darkColor,...otherProps } = props;
  const { theme } = useTheme();

  return (
    <DefaultCanvas
      style={[{ backgroundColor: theme.background }, styles.defaultContainer, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
})
