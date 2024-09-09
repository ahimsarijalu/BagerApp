import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ComputerCard from "@/components/ComputerCard";
import PlayerCard from "@/components/PlayerCard";
import TotalPoints from "@/components/TotalPoints";
import Health from "@/components/Health";
import Streak from "@/components/Streak";
import PointsIncrement from "@/components/PointsIncrement";
import colors from "@/theme/Colors";
import Countdown from "@/components/Countdown";

const PlayScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.card}>
          <ComputerCard />
        </View>
        <View style={styles.card}>
          <ComputerCard />
        </View>
        <View style={styles.card}>
          <ComputerCard />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={[styles.indicator, styles.playerHealth]}>
          <Health iconName={"heart"} />
          <Health iconName={"heart"} />
          <Health iconName={"heart"} />
        </View>
        <View style={styles.indicator}>
          <Streak streaks={2} />
        </View>
        <View style={[styles.indicator, styles.points]}>
          <PointsIncrement points={100} />
          <TotalPoints points={5000} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <PlayerCard
            image={require("assets/scissors.png")}
            name={"Scissors"}
            color={colors.scissors}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PlayerCard
            image={require("assets/rock.png")}
            name={"Rock"}
            color={colors.rock}
          />
        </View>
        <View style={{ flex: 1 }}>
          <PlayerCard
            image={require('assets/paper.png')}
            name={"Paper"}
            color={colors.paper}
          />
        </View>
      </View>
      <Countdown countdown={5} />
    </View>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "flex-end",
  },
  playerHealth: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  points: {
    alignItems: "flex-end",
    marginRight: 24,
  },
});
