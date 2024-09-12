import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GuideContentItem = ({ text, index = null, bullet = "\u2022" }) => {
  const indicator = index !== null ? `${index}.` : bullet;

  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.indicator}>{indicator}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default GuideContentItem;

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  indicator: {
    width: 24, // Increased width for numbered items
    textAlign: "right",
    paddingRight: 8, // More space between the bullet/number and text
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    lineHeight: 24, // Better spacing for readability
  },
});
