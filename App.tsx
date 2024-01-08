import {StyleSheet} from 'react-native';
import {NavigationContainer, ThemeProvider} from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AppNavigation} from "./src/router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ColorSchemeProvider} from "./src/components";
import {useTheme} from "./src/store";


export default function App() {
    const { theme } = useTheme();

    return (
      <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
                <ThemeProvider value={theme}>
                    <ColorSchemeProvider>
                        <AppNavigation />
                    </ColorSchemeProvider>
                </ThemeProvider>
            </NavigationContainer>
          </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
