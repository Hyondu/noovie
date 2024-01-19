import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stacks, { StacksParamList } from "./Stacks";
import Tabs from "./Tabs";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootParamList = {
  Tabs: undefined;
  Stacks: NavigatorScreenParams<StacksParamList>;
};
const Nav = createNativeStackNavigator<RootParamList>();

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stacks" component={Stacks} />
    </Nav.Navigator>
  );
};

export default Root;
