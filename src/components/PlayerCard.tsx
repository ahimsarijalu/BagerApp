import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PlayerCard() {
  return (
    <View style={styles.card}>
      <Text>PlayerCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
  },
});
