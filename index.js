/**
 * @format
 */

import { AppRegistry, useColorScheme } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { Colors } from './Theme/Color';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import merge from 'deepmerge';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from './Screens/Components/SessionContext';
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const paperTheme =
        colorScheme === 'dark'
            ? CombinedDarkTheme
            : CombinedDefaultTheme;
    return (
        <SessionProvider>
            <PaperProvider theme={paperTheme}>
                <ThemeProvider value={paperTheme}>
                    <SafeAreaProvider>
                        <App />
                    </SafeAreaProvider>
                </ThemeProvider>
            </PaperProvider>
        </SessionProvider>)
}

AppRegistry.registerComponent(appName, () => RootLayout);
