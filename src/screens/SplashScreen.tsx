import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import bagerText from "../img/Group 481670.png"; 
import bagerHands from "../img/image 25.png"; 

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={bagerText} style={{borderWidth: 0, marginLeft: 30}}></Image>
            <Image source={bagerHands} style={{borderWidth: 0, width: "auto", height: 150}}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#5bd1de",
        alignSelf: "stretch",
    }
})

export default SplashScreen;