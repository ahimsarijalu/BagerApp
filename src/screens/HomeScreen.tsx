import colors from "@/theme/Colors";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>
        <Text style={styles.hello}>Hello there! </Text>
        <Text>Dive in and have fun playing!</Text>
      </Text>
      <View style={styles.name}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image source={require("assets/HomeOrang.png")}></Image>
          <View style={{ alignContent: "center", marginLeft: 16 }}>
            <Text>Prima Gaul</Text>
            <Text>2890 points</Text>
          </View>
        </View>
        <Image source={require("assets/juara.png")}></Image>
      </View>

      {/* <View style={styles.imageHome}>
        <ScrollView style={styles.forScrollView} horizontal={true}>
          <Image
            style={styles.forPenjelasan}
            source={require("assets/HomeScreen.png")}
          ></Image>
          <Image
            style={styles.forPenjelasan}
            source={require("assets/Penjelasan1.png")}
          ></Image>
          <Image
            style={styles.forPenjelasan}
            source={require("assets/Penjelasan2.png")}
          ></Image>
          <Image
            style={styles.forPenjelasan}
            source={require("assets/Penjelasan3.png")}
          ></Image>
        </ScrollView>
      </View>

      <View style={styles.imageStart}>
        <Image source={require("assets/HomeScreen.png")}></Image>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexGrow: 1,
    // alignSelf: "stretch",
    backgroundColor: "#Effbfc",
  },
  greetings: {
    fontWeight: "700",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 8,
  },
  hello: {
    color: colors.totalPoints,
  },
  name: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 36,
    marginVertical: 16,
  },
  imageHome: {
    height: 450,
    width: 300,
    marginTop: 60,
    alignSelf: "stretch",
    marginLeft: 20,
  },
  imageStart: {
    height: 100,
    width: 50,
    alignSelf: "center",
    marginTop: 15,
    left: -60,
  },
  forScrollView: {
    width: 370,
    padding: 15,
    marginLeft: -20,
  },
  forPenjelasan: {
    marginRight: 15,
  },
});

export default HomeScreen;
