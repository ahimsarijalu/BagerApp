import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ComputerCard from "@/components/ComputerCard";
import PlayerCard from "@/components/PlayerCard";
import TotalPoints from "@/components/TotalPoints";
import Health from "@/components/Health";
import Streak from "@/components/Streak";
import PointsIncrement from "@/components/PointsIncrement";
import colors from "@/theme/Colors";
import PlayerCardPicked from "@/components/PlayerCardPicked";
import PickedCardType from "@/types/PickedCard";
import { supabase } from "@/utils/supabase";
import TurnResult from "@/components/TurnResult";

const choices = [
  {},
  {
    image: require("assets/scissors.png"),
    cardName: "Scissors",
    color: colors.scissors,
  },
  {
    image: require("assets/rock.png"),
    cardName: "Rock",
    color: colors.rock,
  },
  {
    image: require("assets/paper.png"),
    cardName: "Paper",
    color: colors.paper,
  },
];

const PlayScreen = ({ navigation: { navigate } }) => {
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  const [result, setResult] = useState("");
  const [isResultShown, setIsResultShown] = useState(false);

  const [incrementPoint, setIncrementPoint] = useState(0);
  const [isIncrementPointShown, setIsIncrementPointShown] = useState(false);

  const [computer, setComputer] = useState(0);
  const [player, setPlayer] = useState(0);

  const [pickedCard, setPickedCard] = useState<PickedCardType>(null);
  const [isPickedCardHidden, setIsPickedCardHidden] = useState(true);
  const [computerPickedCard, setComputerPickedCard] =
    useState<PickedCardType>(null);
  const [isComputerPickedCardHidden, setIsComputerPickedCardHidden] =
    useState(true);

  function handlePlayerPick(playerPicked: number) {
    setPlayer(playerPicked);
    const computer = Math.floor(Math.random() * 3) + 1;
    setComputer(computer);
  }

  useEffect(() => {
    if (player !== 0 && computer !== 0) {
      setPickedCard({
        image: choices[player].image,
        cardName: choices[player].cardName,
        color: choices[player].color,
      });

      setComputerPickedCard({
        image: choices[computer].image,
        cardName: choices[computer].cardName,
        color: choices[computer].color,
      });

      setIsPickedCardHidden(false);
      setIsComputerPickedCardHidden(false);
    }
  }, [player, computer]);

  useEffect(() => {
    if (pickedCard && computerPickedCard) {
      setResult(handleWinner());
      setIsResultShown(true);
      setTimeout(() => {
        resetChoices();
        setIsIncrementPointShown(false);
      }, 1500);
    }
  }, [pickedCard, computerPickedCard]);

  useEffect(() => {
    if (lives <= 0) {
      setResult("Game Over\n" + points + " Points");
      updateScoreToDatabase();
      setTimeout(() => {
        navigate("home");
      }, 2000);
    }
  }, [lives]);

  async function updateScoreToDatabase() {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("score")
      .update({ score: points })
      .eq('user_id', user.data.user.id)
      .select();

    if (error) {
      throw error;
    }
  }

  function handleWinner(): string {
    if (computer == player) {
      setStreak(0);
      return "Draw";
    }
    if (
      (player === 2 && computer === 1) ||
      (player === 3 && computer === 2) ||
      (player === 1 && computer === 3)
    ) {
      setIsIncrementPointShown(true);
      setStreak((s) => s + 1);
      let increment = 10 * streak;
      if (streak >= 3) {
        setPoints((p) => p + increment);
      } else {
        setPoints((p) => p + 10);
        streak > 0 ? setIncrementPoint(increment) : setIncrementPoint(10);
      }
      return "Player Win";
    } else {
      setIsIncrementPointShown(false);
      setLives((l) => l - 1);
      setStreak(0);
      return "Comp Win";
    }
  }

  function resetChoices() {
    setPlayer(0);
    setComputer(0);
    setIsResultShown(false);
    setIsPickedCardHidden(true);
    setIsComputerPickedCardHidden(true);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
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
          {Array.from({ length: lives }).map((_, index) => (
            <Health key={index} iconName={"heart"} />
          ))}
          {Array.from({ length: 3 - lives }).map((_, index) => (
            <Health key={index} iconName={"heart-outline"} />
          ))}
        </View>
        {streak >= 3 ? (
          <View style={styles.indicator}>
            <Streak streaks={streak} />
          </View>
        ) : (
          <></>
        )}

        <View style={[styles.indicator, styles.points]}>
          {isIncrementPointShown ? (
            <PointsIncrement points={incrementPoint} />
          ) : (
            <></>
          )}
          <TotalPoints points={points} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", marginBottom: 24 }}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            handlePlayerPick(1);
          }}
        >
          <PlayerCard
            image={require("assets/scissors.png")}
            name={"Scissors"}
            color={colors.scissors}
          />
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            handlePlayerPick(2);
          }}
        >
          <PlayerCard
            image={require("assets/rock.png")}
            name={"Rock"}
            color={colors.rock}
          />
        </Pressable>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            handlePlayerPick(3);
          }}
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
      {isResultShown ? <TurnResult result={result} /> : <></>}
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
    justifyContent: "flex-start",
    marginLeft: 16,
  },
  points: {
    alignItems: "flex-end",
    marginRight: 24,
  },
});
