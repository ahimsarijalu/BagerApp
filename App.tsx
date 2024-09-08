import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./src/redux/store";
import SignupScreen from "@/screens/SignupScreen";
<<<<<<< HEAD
import LoginScreen from "@/screens/LoginScreen";
=======
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PlayScreen from "@/screens/PlayScreen";
>>>>>>> c2c146a6f4bbe16e4aef7cccbc4705ca4fd0b62f

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator initialRouteName="signup">
=======
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="playScreen"
            component={PlayScreen}
            options={{ headerShown: false }}
          />
>>>>>>> c2c146a6f4bbe16e4aef7cccbc4705ca4fd0b62f
          <Stack.Screen
            name="signup"
            component={HomeScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
            component={SignupScreen}
<<<<<<< HEAD
            options={{ headerShown: false}}
=======
            options={{ headerTitle: "Sign Up" }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
>>>>>>> c2c146a6f4bbe16e4aef7cccbc4705ca4fd0b62f
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}