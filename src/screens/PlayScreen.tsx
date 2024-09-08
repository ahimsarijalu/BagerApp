import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ComputerCard from "@/components/ComputerCard";
import PlayerCard from "@/components/PlayerCard";

const PlayScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "green", flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <ComputerCard />
        </View>
        <View style={{ flex: 3 }}>
          <ComputerCard />
        </View>
        <View style={{ flex: 3 }}>
          <ComputerCard />
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "yellow", flexDirection: "row" }}
      >
        <View style={{ flex: 3 }}>
          <Text>hello world 1</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>hello world 2</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>hello world 3</Text>
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "yellow", flexDirection: "row" }}
      >
        <View style={{ flex: 3 }}>
          <PlayerCard />
        </View>
        <View style={{ flex: 3 }}>
          <PlayerCard />
        </View>
        <View style={{ flex: 3 }}>
          <PlayerCard />
        </View>
      </View>
    </View>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
