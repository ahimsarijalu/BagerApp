import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import SignupScreen from "@/screens/SignupScreen";
import LoginScreen from "@/screens/LoginScreen";
import HomeScreen from "@/screens/HomeScreen";
import PlayScreen from "@/screens/PlayScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import LeaderboardScreen from "@/screens/LeaderboardScreen";
import { supabase } from "@/utils/supabase";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkUserSession();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "home" : "login"}
          screenOptions={{ contentStyle: { backgroundColor: "#EFFBFC" } }}
        >
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
            options={{ headerShown: false, headerTitle: "Sign Up" }}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="leaderboard"
            component={LeaderboardScreen}
            options={{ headerShown: false }}
          />          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
