import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";
import MainTabs from "./(tabs)/MainTabs";
import SignInScreen from "./(tabs)/SignInScreen";

const Stack = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        // If the user is authenticated, show MainTabs
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        // If not, show SignIn
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
