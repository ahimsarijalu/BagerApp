import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";

export default function PlayerCardPicked({ cardName, image, color }) {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Cover
          source={image}
          resizeMode='cover'
          resizeMethod="resize"
          
        />
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
                paddingHorizontal: 32,
                maxWidth: 200
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
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    marginTop: 6,
  },
});
