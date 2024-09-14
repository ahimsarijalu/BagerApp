import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { supabase } from "@/utils/supabase";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const LeaderboardScreen = ({ navigation: { navigate } }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = async () => {
    let { data: scores, error } = await supabase
      .from("score")
      .select("image, username, score")
      .order("score", { ascending: false })
      .limit(10);

    if (error) {
      console.error(error);
      return;
    }

    console.log(scores);
    setLeaderboard(scores);
  };

  const top3Leaderboard =
    leaderboard.length >= 3
      ? [leaderboard[1], leaderboard[0], leaderboard[2]]
      : [];
  const remainingLeaderboard = leaderboard.slice(3, 10);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigate("home")}>
          <Image source={require("assets/backbuttonprofilescreen.png")} />          
        </TouchableOpacity>
      </View> 

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Top 3 Leaderboard */}
        <View style={styles.top3Container}>
          {top3Leaderboard.map((player, index) => {
            const podiumHeight = index === 1 ? 220 : index === 0 ? 180 : 140;
            const rankColor =
              index === 1 ? "gold" : index === 0 ? "silver" : "#CD7F32";

            return (
              <LinearGradient
                key={index}
                colors={["#5BD1DE", "#5BD1DE", "white"]}
                locations={[0, 0.7, 1]}
                style={[styles.top3ContainerUpper, { height: podiumHeight }]}
              >
                <View style={{ alignItems: "center", position: "absolute", top: -90 }}>
                  <MaterialCommunityIcons
                    name="crown"
                    size={30}
                    color={rankColor}
                    style={{ marginBottom: 5 }}
                  />
                  <Image
                    source={{ uri: player.image }}
                    style={[styles.topAvatar, { borderColor: rankColor }]}
                  />
                  <Text style={styles.topName}>{player.username}</Text>
                  <Text style={styles.topPoints}>{player.score} Points</Text>
                </View>

                <Text style={[styles.topRank, { top: podiumHeight / 2 - 16 }]}>
                  {index === 1 ? 1 : index === 0 ? 2 : 3}
                </Text>
              </LinearGradient>
            );
          })}
        </View>

        {/* Remaining Leaderboard */}
        {remainingLeaderboard.map((player, index) => (
          <View key={index + 3} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 4}</Text>
            </View>
            <Image source={{ uri: player.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{player.username}</Text>
              <Text style={styles.points}>{player.score} Points</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFBFC",
    paddingHorizontal: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  top3Container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 250,
    marginTop: 50,
  },
  top3ContainerUpper: {
    width: "28%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "flex-end",
    paddingBottom: 20,
    alignItems: "center",
    position: "relative",
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginBottom: 5,
  },
  topName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 3,
  },
  topPoints: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 50,
  },
  topRank: {
    fontSize: 50,
    fontWeight: "bold",
    position: "absolute",
    color: "white",
    marginTop: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,    
  },
  rankContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  points: {
    fontSize: 14,
    color: "#888",
  },
  backButton: {
    marginTop: 45,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});

export default LeaderboardScreen;
