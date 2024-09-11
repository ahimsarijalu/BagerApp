import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ComputerCard from "@/components/ComputerCard";
import PlayerCard from "@/components/PlayerCard";
import TotalPoints from "@/components/TotalPoints";
import Health from "@/components/Health";
import Streak from "@/components/Streak";
import PointsIncrement from "@/components/PointsIncrement";
import colors from "@/theme/Colors";
import Countdown from "@/components/Countdown";
import { useNavigation } from "@react-navigation/native";

const PlayScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 70
      }}
    >
      <View style={{height: 40}}>
        <TouchableOpacity style={{right: 150, top:10, padding:10, backgroundColor: '#e54335', borderRadius:12}} onPress={() => navigation.goBack()}>
          <Text style={{color:"white", fontWeight:"bold"}}>Stop Game</Text>
        </TouchableOpacity>
      </View>
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
      <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            // this.closeButtonFunction()
          }}>
          <View
            style={[{
              height: '60%',
              marginTop: "auto",
              backgroundColor:'blue'
            }]}>
            <TouchableOpacity
              style={{zIndex: 1, left: 18}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image style={{width:48,height:48}} source={require('../../assets/img2.png')}></Image>
            </TouchableOpacity>
          </View>
        </Modal>
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
