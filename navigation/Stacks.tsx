import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail, { TDetail } from "../screens/Detail";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../colors";

export type StacksParamList = {
  Detail: TDetail;
};

const Stack = createNativeStackNavigator<StacksParamList>();

function Stacks() {
  const isDark = useColorScheme() === "dark";
  return (
    <Stack.Navigator
      screenOptions={{
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
