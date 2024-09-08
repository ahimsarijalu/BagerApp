import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text} from "react-native";
import SaveChange from "../../"
import LogOut from "../../"

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.FotoProfile}>
                <View>
                    <Image source={require('assets/profilefoto.png')} style={{alignSelf: 'center'}}></Image>
                    <View>
                        <TouchableOpacity>
                            <Image source={require('assets/buttonfotoprofile.png')} style={{bottom: -15}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.kolominput}>
                <Text style={{fontWeight:"bold", marginBottom:8}}>Username</Text>
                <TextInput
                style={styles.input}
                onChangeText={setUsername}
                />

                <Text style={{fontWeight:"bold", marginBottom:8}}>Email</Text>
                <TextInput
                style={styles.input}
                onChangeText={setEmail}
                />

                <Text style={{fontWeight:"bold", marginBottom:8}}>Password</Text>
                <TextInput
                style={styles.input}
                onChangeText={setPassword}
                />

                <Text style={{fontWeight:"bold", marginBottom:8}}>Confirm Password</Text>
                <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                />

                <View>
                    <TouchableOpacity>
                        <Image source={require('assets/savechange.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.kolomlogout}>
                <TouchableOpacity style={{left: -95}}>
                    <Image source={require('assets/logout.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "stretch",
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#EFFBFC",
    },

    FotoProfile: {
        flex: 1,
        height: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        top: -60,
    },

    input: {
        width: 360,
        height: 50,
        borderRadius:10,
        padding: 3,
        backgroundColor:"white",
        marginBottom: 16,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        },

        kolominput: {
            top: -120,
        },

        kolomlogout: {
            top: -20,
        }
})

export default ProfileScreen;
