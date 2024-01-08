import Theme from '../constants/Colors'
import {create, StateCreator} from "zustand";
type themeProperties = typeof Theme['light'] | typeof Theme['dark'];
export type ThemeSlice = {
    colorSchemeName: 'light' | 'dark';
    theme: themeProperties;
    toggleTheme: () => void;
};

const createThemeStore: StateCreator<ThemeSlice> = (set) => ({
    colorSchemeName: 'dark',
    theme: Theme['light'],
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === Theme['light'] ? Theme['dark'] : Theme['light'],
            colorSchemeName: state.theme === Theme['light'] ? 'dark' : 'light',
        })),
});

export const useTheme = create(createThemeStore);
