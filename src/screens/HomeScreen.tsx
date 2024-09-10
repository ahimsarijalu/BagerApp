import colors from "@/theme/Colors";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Avatar } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.profile}>
        <View>
          <Avatar.Image size={40} source={require("assets/profilePic.png")} />
        </View>
        <View style={[styles.profileInfo, { flex: 3 }]}>
          <Text style={styles.name}>Prima Gaul</Text>
          <Text style={styles.points}>2890 points</Text>
        </View>
        <View style={{ flex: 7 }}>
          <Image source={require("assets/juara.png")}></Image>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetings: {
    fontWeight: "700",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    marginTop: 64,
  },
  hello: {
    color: colors.totalPoints,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
  },
  points: {
    fontWeight: "400",
    fontSize: 12,
  },
});

export default HomeScreen;
