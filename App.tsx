import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./src/redux/store";
import SignupScreen from "@/screens/SignupScreen";
import HomeScreen from "@/screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="signup"
            component={HomeScreen}
            options={{ headerTitle: "Sign Up" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
