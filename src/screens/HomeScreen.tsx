import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Guide from "@/components/Guide";
import GuideCover from "@/components/GuideCover";
import Swiper from "react-native-web-swiper";
import colors from "@/theme/Colors";
import { supabase } from "@/utils/supabase";

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

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation: { navigate } }) => {
  const [userImage, setUserImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');  
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) throw sessionError;
            
            const user = session?.user;
            
            if (user) {
                console.log('User ID:', user.id);

                // Fetch user details from the auth system
                const { data, error } = await supabase.auth.getUser();

                if (error) {
                    console.error('Error fetching user data:', error.message);
                } else {
                    setUsername(data.user?.user_metadata?.username || 'No username');
                    setEmail(data.user?.email || 'No email');
                    setUserImage(data.user?.user_metadata?.userImage || 'No userImage');
                    setScore(data.user?.user_metadata?.score || '0');
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchUserProfile();
}, []);  

  function goToPlayScreen() {
    navigate("playScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        Dive in and have fun playing!
      </Text>
      <View style={styles.header}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => navigate("profile")}>
            <Avatar.Image size={48} source={userImage ? {uri: userImage} : require("assets/profilePic.png")} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{username ? username : "Prima Gaul"}</Text>
            <Text style={styles.points}>{score ? score : "Prima Gaul"} points</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigate("leaderboard")}>
          <Image source={require("assets/juara.png")} style={styles.trophy} />
        </TouchableOpacity>
      </View>

      {/* Swiper for guides */}
      <Swiper
        loop
        timeout={3} // Autoplay every 3 seconds
        containerStyle={styles.swiper}
        controlsProps={{
          dotsTouchable: true,
          prevPos: "left",
          nextPos: "right",
          nextTitle: ">",
          nextTitleStyle: { color: colors.totalPoints, fontSize: 24, fontWeight: "bold" },
          prevTitle: "<",
          prevTitleStyle: { color: colors.totalPoints, fontSize: 24, fontWeight: "bold" },
        }}
      >
        {guides.map((guide, index) =>
          index === 0 ? (
            <GuideCover key={index} image={guide.image} title={guide.title} />
          ) : (
            <Guide key={index} image={guide.image} title={guide.title} content={guide.content} index={undefined} />
          )
        )}
      </Swiper>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.playButton}
          contentStyle={styles.playButtonContent}
          labelStyle={styles.buttonText}
          onPress={goToPlayScreen}
          icon={() => <Ionicons name="play" size={24} color={colors.totalPoints} />}
        >
          Start Game
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light background for better contrast
  },
  greetings: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
  hello: {
    color: colors.totalPoints,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 12,
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
  },
  points: {
    fontSize: 14,
    color: "gray",
  },
  trophy: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  swiper: {
    height: 400, // Adjust as needed
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  playButton: {
    width: width * 0.8, // 80% of the screen width for responsiveness
    borderRadius: 24,
    backgroundColor: "white",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  playButtonContent: {
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.totalPoints,
  },
});

export default HomeScreen;
