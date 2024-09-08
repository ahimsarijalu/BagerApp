import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./src/redux/store";
import SignupScreen from "@/screens/SignupScreen";
<<<<<<< HEAD
import SplashScreen from "@/screens/SplashScreen";
import LoginScreen from "@/screens/LoginScreen";
=======
import LoginScreen from "@/screens/LoginScreen";
import PlayScreen from "@/screens/PlayScreen";
>>>>>>> 7bc46cc5bc311f06fc7ab37fd5457652751e59b7

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
=======
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="playScreen"
            component={PlayScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={SignupScreen}
            options={{ headerTitle: "Sign Up" }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerTitle: "Login" }}
          />
>>>>>>> 7bc46cc5bc311f06fc7ab37fd5457652751e59b7
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
