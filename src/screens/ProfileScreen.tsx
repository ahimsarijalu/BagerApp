import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/utils/supabase';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                
                if (sessionError) throw sessionError;
                
                const user = session?.user;
                
                if (user) {
                    console.log('User ID:', user.id);
                    
                    const { data, error } = await supabase
                        .from('users') // Ensure this matches your table name
                        .select('username, email')
                        .eq('id', user.id)
                        .single();

                    if (error) {
                        console.error('Error fetching user data:', error.message);
                    } else {
                        setUsername(data.username);
                        setEmail(data.email);
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // Navigate to the login screen or any other appropriate action
            navigation.navigate('login');
        } catch (error) {
            console.error('Logout error:', error.message);
            // Optionally show an error message to the user
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true);

        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match', 'Please make sure both passwords match.');
            setLoading(false);
            return;
        }

        try {
            // Assuming 'username' and 'password' can be updated
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) throw sessionError;
            
            const user = session?.user;
            
            if (user) {
                // Update username
                const { error: updateError } = await supabase
                    .from('users') // Ensure this matches your table name
                    .update({ username })
                    .eq('id', user.id);

                if (updateError) throw updateError;

                // Update password
                if (password) {
                    const { error: authError } = await supabase.auth.updateUser({ password });

                    if (authError) throw authError;
                }

                // Handle successful update
                // Optionally show a success message to the user
                Alert.alert('Profile updated', 'Your profile has been updated successfully.');
            }
        } catch (error) {
            console.error('Update error:', error.message);
            // Optionally show an error message to the user
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* Back Button */}
                <View style={styles.backButton}>
                    <TouchableOpacity>
                        <Image source={require('assets/backbuttonprofilescreen.png')} />
                    </TouchableOpacity>
                </View>

                {/* Profile Title */}
                <View style={styles.profileTitle}>
                    <Text style={styles.profileTitleText}>Profile</Text>
                </View>

                {/* Profile Picture */}
                <View style={styles.fotoProfile}>
                    <Image source={require('assets/profilefoto.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Image source={require('assets/buttonfotoprofile.png')} />
                    </TouchableOpacity>
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        editable={!loading} // Make sure fields are not editable while loading
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false} // Email field is read-only
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputWithIcon}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                            placeholder="Enter new password"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            <Ionicons
                                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.confirmPasswordContainer}>
                        <TextInput
                            style={styles.inputWithIcon}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!confirmPasswordVisible}
                            placeholder="Confirm new password"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        >
                            <Ionicons
                                name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSaveChanges}>
                        <Image source={require('assets/savechange.png')} style={styles.saveButton} />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <View style={styles.logoutButton}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image source={require('assets/logout.png')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFFBFC",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        marginTop: 45,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    profileTitle: {
        marginVertical: 20,
        alignItems: 'center',
    },
    profileTitleText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    fotoProfile: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoButton: {
        marginTop: -15,
    },
    inputContainer: {
        width: '90%',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 47,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputWithIcon: {
        flex: 1,
        height: 47,
        borderRadius: 10,
        padding: 3,
        backgroundColor: "white",
        marginBottom: 16,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
    },
    confirmPasswordContainer: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '35%',
        transform: [{ translateY: -12 }],
    },
    saveButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    logoutButton: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 50
    },
});

export default ProfileScreen;
