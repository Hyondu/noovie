import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";

const Stack = createNativeStackNavigator();

function Stacks() {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default Stacks;
