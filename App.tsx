import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./src/redux/store";
import SignupScreen from "@/screens/SignupScreen";
import LoginScreen from "@/screens/LoginScreen";
import HomeScreen from "@/screens/HomeScreen";
import PlayScreen from "@/screens/PlayScreen";
import BottomSheetComponent from "@/screens/TestingBottomSheet";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="playScreen"
            component={PlayScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={SignupScreen}
            options={{ headerShown: false, headerTitle: "Sign Up"}}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}