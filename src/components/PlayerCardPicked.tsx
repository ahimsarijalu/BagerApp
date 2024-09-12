import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";

export default function PlayerCardPicked({ cardName, image, color }) {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Cover style={{height: 300}} source={image} resizeMode="cover" width={100} height={300} />
        <Card
          style={[styles.button, { backgroundColor: color }]}
          mode="contained"
        >
          <Card.Content>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 24,
                paddingHorizontal: 64
              }}
            >
              {cardName}
            </Text>
          </Card.Content>
        </Card>
      </Card>
    </View>
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
    width: 280
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    marginTop: 6,
  
  },
});
