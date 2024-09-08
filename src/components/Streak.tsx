import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import colors from "@/theme/Colors";

const Streak = ({ streaks }) => {
  return <Button mode="contained" buttonColor={colors.streaks}>Streak x{streaks}</Button>;
};

export default Streak;

const styles = StyleSheet.create({});
