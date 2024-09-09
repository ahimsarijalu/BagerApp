import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/theme/Colors";

const Countdown = ({ countdown }) => {
  return <Text style={styles.countdown}>{countdown}</Text>;
};

export default Countdown;

const styles = StyleSheet.create({
  countdown: {
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    fontWeight: "700",
    fontSize: 96,
    color: colors.countdown,
  },
});
