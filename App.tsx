import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
