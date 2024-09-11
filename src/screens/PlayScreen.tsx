import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ComputerCard from "@/components/ComputerCard";
import PlayerCard from "@/components/PlayerCard";
import TotalPoints from "@/components/TotalPoints";
import Health from "@/components/Health";
import Streak from "@/components/Streak";
import PointsIncrement from "@/components/PointsIncrement";
import colors from "@/theme/Colors";
import Countdown from "@/components/Countdown";
import PlayerCardPicked from "@/components/PlayerCardPicked";
import PickedCardType from "@/types/PickedCard";

const PlayScreen = () => {
  const [playerPicked, setPlayerPicked] = useState(false);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [incrementPoint, setIncrementPoint] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [pickedCard, setPickedCard] = useState<PickedCardType>(null);
  const [isPickedCardHidden, setIsPickedCardHidden] = useState(true);
  const [computerPickedCard, setComputerPickedCard] =
    useState<PickedCardType>(null);
  const [isComputerPickedCardHidden, setIsComputerPickedCardHidden] =
    useState(true);

  function handlePlayerPick(image, cardName, color) {
    const computerPicked = Math.floor(Math.random() * 3) + 1;

    
    setIsPickedCardHidden(false);
    setIsComputerPickedCardHidden(false);

    setPickedCard({
      image: image,
      cardName: cardName,
      color: color,
    });

    switch (computerPicked) {
      case 1: {
        setComputerPickedCard({
          image: require("assets/scissors.png"),
          cardName: "Scissors",
          color: colors.scissors,
        });
        break;
      }
      case 2: {
        setComputerPickedCard({
          image: require("assets/rock.png"),
          cardName: "Rock",
          color: colors.rock,
        });
        break;
      }
      case 3: {
        setComputerPickedCard({
          image: require("assets/paper.png"),
          cardName: "Paper",
          color: colors.paper,
        });
        break;
      }

      default:
        break;
    }

    // console.log(handleWinner());
  }

  function handleWinner(): string {
    if (pickedCard.cardName === computerPickedCard.cardName) {
      return "Draw";
    }
    if (
      (pickedCard.cardName === "Rock" &&
        computerPickedCard.cardName === "Scissors") ||
      (pickedCard.cardName === "Paper" &&
        computerPickedCard.cardName === "Rock") ||
      (pickedCard.cardName === "Scissors" &&
        computerPickedCard.cardName === "Paper")
    ) {
      return "Player Win";
    } else {
      return "Comp";
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", marginTop: 24 }}>
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
          <TotalPoints points={points} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            handlePlayerPick(
              require("assets/scissors.png"),
              "Scissors",
              colors.scissors
            )
          }
        >
          <PlayerCard
            image={require("assets/scissors.png")}
            name={"Scissors"}
            color={colors.scissors}
          />
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            handlePlayerPick(require("assets/rock.png"), "Rock", colors.rock)
          }
        >
          <PlayerCard
            image={require("assets/rock.png")}
            name={"Rock"}
            color={colors.rock}
          />
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() =>
            handlePlayerPick(require("assets/paper.png"), "Paper", colors.paper)
          }
        >
          <PlayerCard
            image={require("assets/paper.png")}
            name={"Paper"}
            color={colors.paper}
          />
        </Pressable>
      </View>
      {isPickedCardHidden && isComputerPickedCardHidden ? (
        <></>
      ) : (
        <>
          <View style={{ position: "absolute", top: 60 }}>
            <PlayerCardPicked
              image={computerPickedCard.image}
              cardName={computerPickedCard.cardName}
              color={computerPickedCard.color}
            />
          </View>
          <View style={{ position: "absolute", bottom: 60 }}>
            <PlayerCardPicked
              image={pickedCard.image}
              cardName={pickedCard.cardName}
              color={pickedCard.color}
            />
          </View>
        </>
      )}

      {/* <Countdown countdown={5} /> */}
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
