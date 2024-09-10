import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Keyboard, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const LoginScreen = () => {
  const navigation = useNavigation();
  const translateY = useSharedValue(0);
  const [tapped, setTapped] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: !tapped
          ? withTiming(translateY.value + 0)
          : withTiming(translateY.value - 200),
      },
    ],
  }));

  useEffect(() => {
    const upp = Keyboard.addListener("keyboardDidShow", () => {
      setTapped(true);
    });
    const down = Keyboard.addListener("keyboardDidHide", () => {
      setTapped(false);
    });
    return () => {
      upp.remove();
      down.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Image source={require("assets/image_hand.png")} style={styles.topImage} />
          <Image source={require("assets/bagerlogin.png")} style={styles.bagerImage} />
        </View>

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
                alert("Google Auth");
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
              style={styles.registerText}
            >
              Register Now
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#44c9e0",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    height: height * 0.4,
  },
  topImage: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 420 / 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  bagerImage: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 420 / 150,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    paddingTop: 5,
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 14,
    textAlign: "center",
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
    color: "#44c9e0",
  },
});

export default LoginScreen;
