import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlaySettings = () => {
    const navigation = useNavigation();
    const [popup, setPopup] = useState(true);

    useEffect(() => {
        if (popup) {
            navigation.navigate('playsetting');
        }
    })

    return (
        <View style={styles.container}>
            <View style={{top: 20, left: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/img2.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <TouchableOpacity>
                    <Text>Play</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexGrow: 1,
        flexDirection: "row",
        alignSelf: "stretch",
        // justifyContent: "center",
        backgroundColor: "#effbfc",
    }
})

export default PlaySettings;