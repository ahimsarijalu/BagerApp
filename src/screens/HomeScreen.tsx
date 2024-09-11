import colors from "@/theme/Colors";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Guide from "@/components/Guide";
import GuideCover from "@/components/GuideCover";

const guides = [
  {
    image: require("assets/guide-cover.png"),
    title: "Cover",
  },
  {
    image: require("assets/guide-1.png"),
    title: "Quick Guide",
    content: [
      'Rock Beats Scissors: "The solid rock crushes the fragile scissors with its strength."',
      'Scissors Beat Paper: "Sharp scissors slice through the paper with ease, cutting it cleanly."',
      'Paper Beats Rock: "The paper wraps around the rock, completely covering and trapping it."',
    ],
    indicator: ["•", "•", "•"],
  },
  {
    image: require("assets/guide-2.png"),
    title: "How to Play (Steps):",
    content: [
      'Rock Beats Scissors: "The solid rock crushes the fragile scissors with its strength."',
      'Scissors Beat Paper: "Sharp scissors slice through the paper with ease, cutting it cleanly."',
      'Paper Beats Rock: "The paper wraps around the rock, completely covering and trapping it."',
    ],
    indicator: ["1.", "2.", "3."],
  },
  {
    image: require("assets/guide-3.png"),
    title: "Tips dan Trick (Optional):",
    content: [
      'Rock Beats Scissors: "The solid rock crushes the fragile scissors with its strength."',
      'Scissors Beat Paper: "Sharp scissors slice through the paper with ease, cutting it cleanly."',
      'Paper Beats Rock: "The paper wraps around the rock, completely covering and trapping it."',
    ],
    indicator: ["•", "•", "•"],
  },
];

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.header}>
        <View style={styles.profile}>
          <View>
            <Avatar.Image size={48} source={require("assets/profilePic.png")} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Prima Gaul</Text>
            <Text style={styles.points}>2890 points</Text>
          </View>
        </View>
        <View>
          <Image source={require("assets/juara.png")}></Image>
        </View>
      </View>
      <ScrollView horizontal={true}>
        {guides.map((guide, index) =>
          index === 0 ? (
            <GuideCover key={index} image={guide.image} title={guide.title} />
          ) : (
            <Guide
              key={index}
              image={guide.image}
              title={guide.title}
              content={guide.content}
              indicator={guide.indicator}
            />
          )
        )}
      </ScrollView>
      {/* <View>
        <Image source={require("assets/guide-cover.png")} />
        <Text>saasas</Text>
        <Text>Content</Text>
      </View> */}
      <View>
        <Button>
          <Ionicons />
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
});

export default HomeScreen;
