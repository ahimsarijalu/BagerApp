import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

export class ComputerCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text>computer</Text>
      </View>
    );
  }
}

export default ComputerCard;

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
