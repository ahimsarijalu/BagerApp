import {  StyleSheet, } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const ComputerCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Cover
        style={{ height: "100%", borderRadius: 10 }}
        resizeMode="cover"
        source={require("assets/computer-bg.png")}
      />
    </Card>
  );
};

export default ComputerCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 24,
  },
});
