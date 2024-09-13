import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/theme/Colors";

const TurnResult = ({ result }) => {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
};

export default TurnResult;

const styles = StyleSheet.create({
  resultContainer: {
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
  result: {
    fontWeight: "700",
    fontSize: 80,
    color: colors.totalPoints,
    textAlign: "center",
  },
});
