import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/theme/Colors";
import React from "react";

const Health = ({ iconName }) => {
  return (
    <View>
      <Ionicons
        name={iconName}
        size={32}
        color={colors.health}
        style={styles.health}
      />
    </View>
  );
};

export default Health;

const styles = StyleSheet.create({
  health: {
    marginHorizontal: 2,
  },
});
