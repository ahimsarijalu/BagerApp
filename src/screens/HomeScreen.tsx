import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import orang from "../../assets/HomeOrang.png";
import medali from "../../assets/juara.png";
import home from "../../assets/HomeScreen.png";
import start from "../../assets/start.png";
import penjelasan1 from "../../assets/Penjelasan1.png";
import penjelasan2 from "../../assets/Penjelasan2.png";
import penjelasan3 from "../../assets/Penjelasan3.png";


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
         <ScrollView style={styles.forScrollView} horizontal={true}>
        <Image style={styles.forPenjelasan} source={home}></Image>
        <Image style={styles.forPenjelasan} source={penjelasan1}></Image>
        <Image style={styles.forPenjelasan} source={penjelasan2}></Image>
        <Image style={styles.forPenjelasan} source={penjelasan3}></Image>
        </ScrollView>  
      </View>

      <View style={styles.imageStart}>
      <Image source={start}></Image>
      </View>

    </View>

  )
}

const styles= StyleSheet.create({
  container:{
    marginTop: 50,
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
    height: 450,
    width: 300,
    marginTop:60,
    alignSelf:'stretch',
    marginLeft:20,
  },
  imageStart:{
    height: 100,
    width: 50,
    alignSelf:"center",
    marginTop: 15,
    left: -60,
  },
  forScrollView:{
    width: 370,
    padding: 15,
    marginLeft: -20,
  },
  forPenjelasan:{
    marginRight:15,
  }

})

export default HomeScreen;