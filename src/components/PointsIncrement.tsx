import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/theme/Colors";

const PointsIncrement = ({ points }) => {
  return (
    <View>
      <Text>
        <Text style={styles.points}>+{points}</Text>
        <Text style={styles.pointsTrail}> points</Text>
      </Text>
    </View>
  );
};

export default PointsIncrement;

const styles = StyleSheet.create({
  points: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.totalPoints,
    opacity: 0.4
  },
  pointsTrail: {
    fontWeight: "400",
    fontSize: 16,
    color: colors.totalPoints,
    opacity: 0.4
  },
});
