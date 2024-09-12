import colors from "@/theme/Colors";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Guide from "@/components/Guide";
import GuideCover from "@/components/GuideCover";

const guides = [
  {
    image: require("assets/guide-cover.png"),
    title: "Game Guide",
  },
  {
    image: require("assets/guide-1.png"),
    title: "Quick Guide",
    content: [
      'Rock Beats Scissors: "The solid rock crushes the fragile scissors with its strength."',
      'Scissors Beat Paper: "Sharp scissors slice through the paper with ease, cutting it cleanly."',
      'Paper Beats Rock: "The paper wraps around the rock, completely covering and trapping it."',
    ],
  },
  {
    image: require("assets/guide-2.png"),
    title: "How to Play (Steps):",
    content: [
      "Choose One (Rock, Scissors, or Paper): On the left, you’ll see hand icons representing your options.",
      "Wait for the Result: A clock or loading icon indicates you're waiting for your opponent's choice.",
      "See Who Wins: A victory icon, like a trophy or a winning hand, will show who came out on top!",
    ],
  },
  {
    image: require("assets/guide-3.png"),
    title: "Tips dan Trick (Optional):",
    content: [
      "Try to observe your opponent's patterns.",
      "Play quickly and anticipate their strategy!",
    ],
  },
];

const HomeScreen = ({ navigation: { navigate } }) => {


  return (
    <View>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.header}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => navigate('profile')}>
            <Avatar.Image size={48} source={require('assets/profilePic.png')} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Prima Gaul</Text>
            <Text style={styles.points}>2890 points</Text>
          </View>
        </View>
        <View>
          <Image source={require("assets/juara.png")}></Image>
        </View>
      </View>
      <ScrollView horizontal={true} style={{ minHeight: 400 }}>
        {guides.map((guide, index) =>
          index === 0 ? (
            <GuideCover key={index} image={guide.image} title={guide.title} />
          ) : index === 2 ? (
            <Guide
              key={index}
              image={guide.image}
              title={guide.title}
              content={guide.content}
              index={index}
            />
          ) : (
            <Guide
              key={index}
              image={guide.image}
              title={guide.title}
              content={guide.content}
            />
          )
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          style={styles.playButton}
          buttonColor="white"
          textColor={colors.totalPoints}
          icon={() => (
            <Ionicons name="play" size={36} color={colors.totalPoints} />
          )}
          onPress={() => navigate('playScreen')}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetings: {
    fontWeight: "700",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    marginTop: 64,
  },
  hello: {
    color: colors.totalPoints,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 36,
    marginBottom: 24,
  },
  profile: {
    flexDirection: "row",
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
  },
  points: {
    fontWeight: "400",
    fontSize: 14,
  },
  guide: {
    margin: 8,
  },
  buttonContainer: {
    marginTop: 12,
  },
  playButton: {
    marginHorizontal: 90,
    shadowColor: colors.totalPoints,
    shadowOpacity: 0.4,
    height: 250,
    borderRadius: 48,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 8,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default HomeScreen;
