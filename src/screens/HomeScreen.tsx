import colors from "@/theme/Colors";
import { supabase } from "@/utils/supabase";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Alert, ImageBackground, Modal, Keyboard } from "react-native";
import { Avatar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

import guide1 from '../../assets/guide-1.png';
import guide2 from '../../assets/guide-2.png';
import guide3 from '../../assets/guide-3.png';
import guide0 from '../../assets/guide-cover.png';

import playImgBtn from '../../assets/start.png';
import { StatusBar } from "expo-status-bar";
import PlayScreen from "./PlayScreen";
import FadeIn from "react-native-fade-in-image";
import ProfileScreen from "./ProfileScreen";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import GestureRecognizer from "react-native-swipe-gestures";

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [tapped, setTapped] = useState(false);
  const translateY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);
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

    const upp = Keyboard.addListener("keyboardDidShow", () => {
      setTapped(true);
    });
    const down = Keyboard.addListener("keyboardDidHide", () => {
      setTapped(false);
    });

    userActive();

    return () => {
      upp.remove();
      down.remove();
    };
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: !tapped
          ? withTiming(translateY.value + 0,{duration: 200})
          : withTiming(translateY.value - 160, {duration: 200}),
      },
    ],
  }));

  const userActive = async() => {
      try {
        setLoading(true)
        if (!email){
          let { data, error } = await supabase
          .from('users')
          .select("*")
          .like('email',"%"+route.params.email+"%");
          setUserData(data[0]);
          setEmail(data[0].email);
        } else {
          let { data, error } = await supabase
          .from('users')
          .select("*")
          .like('email',"%"+email+"%");
          setUserData(data[0]);
          setEmail(data[0].email);
          setModalVisible(!modalVisible);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
  }

  const flagProfileData = (data) => {
    return data;
  }

  return (
    <View style={{backgroundColor: "#EFFBFC"}}>
      <StatusBar></StatusBar>
      <ImageBackground style={{height:900 }} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRuPn9B4Qrbf3vlRs-EYTa5v5OGg2-jT0vWH12sidTLF8NnfYsX9exjxHZDT82D6G8qZ8&usqp=CAU"}}>

      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.profile}>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
      <View style={{flex:1, flexDirection:"column", margin: 20, top: 100, alignItems: "center"}}>
        <TouchableOpacity style={{padding: 10, borderRadius: 15}} onPress={() => {navigation.navigate('playScreen')}}>
                <FadeIn>
                  <Image source={playImgBtn}></Image>
                </FadeIn>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      <GestureRecognizer
        onSwipeDown={() => {
          setModalVisible(!modalVisible);
          userActive();
        }}
      >
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
          <Animated.View
            style={[{
              height: '60%',
              marginTop: "auto",
              backgroundColor:'blue'
            }, animatedStyles]}>
            <TouchableOpacity
              style={{zIndex: 1, left: 18, shadowOpacity:0.2, shadowOffset:{height:2}}}
              onPress={() => {
                setModalVisible(!modalVisible);
                userActive();
              }}>
              <Image style={{width:48,height:48}} source={require('../../assets/imgdown.png')}></Image>
            </TouchableOpacity>
            <ProfileScreen route={{params: {data: userData}}}></ProfileScreen>
          </Animated.View>
        </Modal>
      </GestureRecognizer>
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
    color: "white",
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
