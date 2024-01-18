import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, PINK_COLOR, YELLOW_COLOR } from "../colors";
import { DarkTheme } from "@react-navigation/native";
import { darkTheme } from "../styled";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="film-outline" color={focused ? YELLOW_COLOR : color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="tv-outline" color={focused ? YELLOW_COLOR : color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search-outline" color={focused ? YELLOW_COLOR : color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
