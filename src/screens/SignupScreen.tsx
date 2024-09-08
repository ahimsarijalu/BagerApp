import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import bagerHands from "../img/image 25.png"; 
import bagerLogin from "../img/bagerlogin.png"; 


const SignupScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.bager}>
          <Image source={bagerHands} style={{borderWidth: 0, width: "auto"}}></Image>
          <Image source={bagerLogin} style={{borderWidth: 0}}></Image>
        </View>
        <View style={styles.login}></View>
    </View>
)
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: "#5bd1de",
      alignSelf: "stretch",
  },
  bager: {
    height: "60%",
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f8fa',
  }
})

export default SignupScreen;
