import colors from "@/theme/Colors";
import { supabase } from "@/utils/supabase";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

import guide1 from '../../assets/guide-1.png';
import guide2 from '../../assets/guide-2.png';
import guide3 from '../../assets/guide-3.png';
import guide0 from '../../assets/guide-cover.png';

import playImgBtn from '../../assets/start.png';
import { StatusBar } from "expo-status-bar";
import PlayScreen from "./PlayScreen";

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const guideScreens = [
    guide0,
    guide1,
    guide2,
    guide3,
  ];

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    userActive();
  }, [])

  const userActive = async() => {
      try {
        setLoading(true)

        let { data, error } = await supabase
        .from('users')
        .select("*")
        .like('email',"%"+route.params.email+"%");
        setUserData(data[0]);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
  }

  return (
    <View style={{backgroundColor: "#EFFBFC"}}>
      <StatusBar></StatusBar>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.profile}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('profile', {data: userData})}>
            <Avatar.Image size={40} source={require("assets/profilePic.png")} />
          </TouchableOpacity>
        </View>
        <View style={[styles.profileInfo, { flex: 3 }]}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.points}>2890 points</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image source={require("assets/juara.png")}></Image>
        </View>
      </View>
      <View style={{flex: 1, marginVertical: 20, alignItems: "center"}}>
        <Carousel
                width={450}
                height={457}
                autoPlay={true}
                autoPlayInterval={3000}
                data={[...new Array(4).keys()]}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <Image style={{width: 342, height: 457}} source={guideScreens[index]}></Image>
                      </View>
                )}
            />
      </View>
      <View style={{flex:0, flexDirection:"column", margin: 20, top: 430, alignItems: "center"}}>
        <TouchableOpacity style={{padding: 10, borderRadius: 15}} onPress={() => {navigation.navigate('playScreen')}}>
                <Image source={playImgBtn}></Image>
        </TouchableOpacity>
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
    marginBottom: 12
  },
  hello: {
    color: colors.totalPoints,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  profileInfo: {
    marginLeft: 10,
    padding: 10
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    width: 200,
  },
  points: {
    fontWeight: "400",
    fontSize: 12,
  },
});

export default HomeScreen;
