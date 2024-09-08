import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import orang from "../../assets/HomeOrang.png";
import medali from "../../assets/juara.png";
import home from "../../assets/HomeScreen.png";
import start from "../../assets/start.png";
const HomeScreen = () => {
  return(
    <View style={styles.container}>
      <View>
        <Text> Hallo! Selamat Bermain</Text>
        <View style={styles.barisSatu}>
        <Image source={orang}></Image>
        <View style={styles.barisSatuTengah}>
          <Text>Prima Gaul</Text>
          <Text>100 points</Text>
        </View>
        <Image source={medali}></Image>
        </View>
      </View>
      <View style={styles.imageHome}>
        <Image source={home}></Image>
      </View>
      <View style={styles.imageStart}>
      <Image source={start}></Image>
      </View>
    </View>

  )
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
    flexGrow: 1,
    alignSelf: "stretch",
    backgroundColor: "#Effbfc"
  },
  barisSatu:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 10,
  },
  barisSatuTengah:{
    flex:1,
    alignContent:'center',
  },
  imageHome:{
    height: 300,
    width: 300,
    marginTop:60,
    alignSelf:'stretch',
    marginLeft:20,
  },
  imageStart:{
    height: 100,
    width: 50,
    alignSelf:"center",
    marginTop: 130,
    left: -60,
  }

})

export default HomeScreen;