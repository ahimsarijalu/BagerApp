import { supabase } from '@/utils/supabase';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, Alert} from "react-native";

const ProfileScreen = ({route}) => {    
    const [username, setUsername] = useState(route.params.data.name);
    const [email, setEmail] = useState(route.params.data.email);
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    
    // console.log(route.params.data.id);
    const updateAuth = async() => {
        try {
            let { data, error } = await supabase
            .auth.updateUser({
                email: email,
                password: password
            })
            if (data){
                updateUser();
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const updateUser = async() => {
        try {
            let { data, error } = await supabase
            .from('users')
            .update({ 'email': email, 'name': username})
            .eq('id',route.params.data.id)
            .select();
            if (data){
                Alert.alert("Data Terupdate!");
                // navigation.goBack();
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }

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
                value={username}
                onChangeText={(t) => setUsername(t)}
                />
                
                <Text style={{fontWeight:"bold", marginBottom:8}}>Email</Text>
                <TextInput
                style={styles.input}
                value={route.params.data.email}
                onChangeText={(t) => setEmail(t)}
                />

                {/* <View style={styles.passwordContainer}>
                    <Text style={{fontWeight:"bold", marginBottom:8}}>Password</Text>
                    <TextInput
                    secureTextEntry={!passwordVisible}
                    style={styles.input}
                    onChangeText={(t) => setPassword(t)}
                    />
                    <TouchableOpacity
                    onPress={() => {
                        setPasswordVisible(!passwordVisible);
                    }}
                    style={{alignSelf: "flex-end"}}
                    >
                    <Ionicons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="#888"
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <Text style={{fontWeight:"bold", marginBottom:8}}>Confirm Password</Text>
                    <TextInput
                    secureTextEntry={!passwordVisible}
                    style={styles.input}
                    onChangeText={(t) => setConfirmPassword(t)}
                    />
                    <TouchableOpacity
                    onPress={() => {
                        setPasswordVisible(!passwordVisible);
                    }}
                    style={{alignSelf: "flex-end"}}
                    >
                    <Ionicons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="#888"
                    />
                    </TouchableOpacity>
                </View> */}
                <View>
                    <TouchableOpacity style={{shadowOpacity:0.3, shadowOffset:{height:2}}} onPress={() => updateAuth()}>
                        <Image source={require('assets/savechange.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.kolomlogout}>
                <TouchableOpacity style={{left: -95}} onPress={() => {supabase.auth.signOut() && navigation.navigate('login')}}>
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
        backgroundColor: "#fff",
        marginTop: -90,
        borderRadius: 20,
        shadowOpacity: 0.2,
        marginBottom: -13.5
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
            bottom: 120,
        },

        kolomlogout: {
            top: -80,
        },
        passwordContainer: {
            marginBottom: 20
        },
})

export default ProfileScreen;
