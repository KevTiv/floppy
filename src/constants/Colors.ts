import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    ...DefaultTheme,
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    ...DarkTheme,
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
