import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainScreen from "./MainScreen";
import FundsScreen from "./FundsScreen";
import TransactionsScreen from "./TransactionsScreen";

const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === "Home"
              ? focused
                ? "home"
                : "home-outline"
              : route.name === "Funds"
              ? focused
                ? "wallet"
                : "wallet-outline"
              : route.name === "Transactions"
              ? focused
                ? "list"
                : "list-outline"
              : "help";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Funds" component={FundsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
