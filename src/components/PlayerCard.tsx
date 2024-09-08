import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function PlayerCard() {
  return (
    <Pressable onPress={() => console.log("pressed")}>
      <Card style={styles.card}>
        <Card.Cover source={require("@/img/computer-bg.png")} />
        <Card style={styles.button} mode="contained">
          <Card.Content>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Paper
            </Text>
          </Card.Content>
        </Card>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 20,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    marginTop: 6,
    backgroundColor: "#FFD54B",
  },
});
