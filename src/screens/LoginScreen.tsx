import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Gambar Atas */}
      <View style={styles.header}>
        <Image source={require("@/img/image_25.png")} style={styles.topImage} />
        <Image source={require("@/img/bagerlogin.png")} />
      </View>

      {/* Login */}
      <View style={styles.formContainer}>
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
              source={require("@/img/image_29.png")}
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
            // onPress={() => navigation.navigate("signup")}
          >
            Register Now
          </Text>
        </Text>
      </View>
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
