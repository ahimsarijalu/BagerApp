import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/theme/Colors";

const TotalPoints = ({ points }) => {
  return (
    <View>
      <Text>
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.pointsTrail}> points</Text>
      </Text>
    </View>
  );
};

export default TotalPoints;

const styles = StyleSheet.create({
  points: {
    fontWeight: "700",
    fontSize: 24,
    color: colors.totalPoints,
  },
  pointsTrail: {
    fontWeight: "400",
    fontSize: 16,
    color: colors.totalPoints,
  },
});
