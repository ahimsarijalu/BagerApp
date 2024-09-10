import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from "react-native";
import { Header, Input} from 'react-native-elements';
import { Title } from 'react-native-paper';
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  


    return (
        <View style={styles.container}>
            {/* Back Button, Title Profile, Foto Profile dan Change Foto Profile */}
            <View style={styles.BackButton}>
                <TouchableOpacity>
                    <Image source={require('assets/backbuttonprofilescreen.png')}></Image>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{fontWeight: 'bold', fontSize: 18, bottom: -10}}>Profile</Text>
            </View>

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
                <View style={styles.passwordContainer}>
                <TextInput
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                ></TextInput>
                <TouchableOpacity
                style={{bottom:-12, left:-35}}
                onPress={() => {
                setPasswordVisible(!passwordVisible);
                }}
                >
                <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#888"
                />
                </TouchableOpacity>
                </View>

                <Text style={{fontWeight:"bold", marginBottom:8}}>Confirm Password</Text>
                <View style={styles.confirmPasswordContainer}>
                <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                ></TextInput>
                <TouchableOpacity
                style={{bottom:-12, left:-35}}
                onPress={() => {
                setConfirmPasswordVisible(!confirmPasswordVisible);
                }}
                >
                <Ionicons
                name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#888"
                />
                </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <Image source={require('assets/savechange.png')} style={{left: 85, bottom: -18}}></Image>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EFFBFC",
    },

    BackButton: {
        top: 45,
        right: 165,
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
        width: 340,
        height: 47,
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
            bottom: 70,
            left: 13,
        },

        kolomlogout: {
            justifyContent: 'flex-start',
            padding: 30,
        },

        passwordContainer: {
            flexDirection: "row",
          },

        confirmPasswordContainer: {
            flexDirection: "row",
          },
})

export default ProfileScreen;