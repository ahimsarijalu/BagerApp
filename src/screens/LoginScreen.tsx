import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const LoginScreen = () => {
  const navigation = useNavigation();
  const translateY = useSharedValue(0);
  const [tapped, setTapped] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Dimen = Dimensions.get("screen"); 
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: !tapped? withTiming(translateY.value + 0) : withTiming( (Platform.OS === "ios" ? 0-(Dimen.height/4) : 0))}],
  }));

  useEffect(() => {
    const upp = Keyboard.addListener('keyboardDidShow', () => {
      setTapped(true)
    });
    const down = Keyboard.addListener('keyboardDidHide', () => {
      setTapped(false)
    });
    return () => {
      upp.remove();
      down.remove();
    }
  })

  return (
    <View style={styles.container}>
      {/* Gambar Atas */}
      <View style={styles.header}>
        <Image source={require("assets/image_25.png")} style={styles.topImage} />
        <Image source={require("assets/bagerlogin.png")} />
      </View>

      {/* Login */}
        <Animated.View style={[styles.formContainer, animatedStyles]}>
          <Text style={styles.formTitle}>Welcome Back Challenger</Text>
          <Text style={styles.formSubtitle}>
            Log in and get back into the game to prove you're the ultimate
            Rock-Paper-Scissors Champion!
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!passwordVisible}
              style={styles.inputPassword}
              placeholder="Password"
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.googleContainer}>
            <TouchableOpacity
              onPress={() => {
                alert("tsx");
              }}
            >
              <Image
                style={styles.googleIcon}
                source={require("assets/image_29.png")}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don't Have an Account?{" "}
            <Text
              style={[styles.registerText]}
              onPress={() => navigation.navigate("signup")}
            >
              Register Now
            </Text>
          </Text>
        </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#44c9e0",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  topImage: {
    width: 420,
    height: 150,
    marginTop: 70,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // bottom:200
  },
  formContainerUpper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    bottom:200,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    paddingTop: 5,
  },
  formSubtitle: {
    fontSize: 14,
    textAlign: "left",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
  },
  googleContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: "#44c9e0",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  registerText: {
    fontWeight: "bold",
  },
  containerregister: {},
});

export default LoginScreen;
