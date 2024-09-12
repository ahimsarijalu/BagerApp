import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from '@/utils/supabase';
import * as ImagePicker from 'expo-image-picker'; // Import Image Picker

const ProfileScreen = ({ navigation: { navigate } }) => {
    const [userImage, setUserImage] = useState(null);
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

                    // Fetch user details from the auth system
                    const { data, error } = await supabase.auth.getUser();

                    if (error) {
                        console.error('Error fetching user data:', error.message);
                    } else {
                        setUsername(data.user?.user_metadata?.username || 'No username');
                        setEmail(data.user?.email || 'No email');
                        setUserImage(data.user?.user_metadata?.userImage || 'No userImage');
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

    // Handle image selection
    const handleImageSelection = async () => {
        // Request permission to access media library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'We need permission to access your photo library.');
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];
            await uploadImage(uri); // Proceed to upload the selected image
        } else {
            Alert.alert('Image selection canceled', 'You did not select any image.');
        }
    };

    // Handle image upload to Supabase storage
    const uploadImage = async (uri: string) => {
        try {
            setLoading(true);
            Alert.alert('Uploading', 'Your image is being uploaded, please wait.');

            const fileExt = uri.split('.').pop()?.toLowerCase(); // Get file extension in lowercase
            const fileName = `profile_image_${Date.now()}.${fileExt}`; // Generate file name with timestamp

            // Determine MIME type based on file extension
            const mimeType = fileExt === 'png' ? 'image/png' 
                            : fileExt === 'jpg' || fileExt === 'jpeg' ? 'image/jpeg'
                            : null;

            if (!mimeType) {
                Alert.alert('Error', 'Unsupported file type. Only JPEG, PNG, and JPG are allowed.');
                return;
            }

            const response = await fetch(uri);
            const blob = await response.blob(); // Convert URI to Blob

            // Upload the image to Supabase storage
            const { data, error } = await supabase.storage
                .from('profile-images')
                .upload(fileName, blob, {
                    headers: {
                        'Content-Type': mimeType, // Use dynamic MIME type
                    },
                });

            if (error) {
                Alert.alert('Upload error', `Could not upload image: ${error.message}`);
                return;
            }

            // Get the public URL for the uploaded image
            const { data: publicUrlData } = supabase.storage.from('profile-images').getPublicUrl(fileName);
            const publicUrl = publicUrlData?.publicUrl;

            if (!publicUrl) {
                Alert.alert('Error', 'Failed to retrieve the public URL for the image.');
                return;
            }

            // Get current session for the logged-in user
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            const user = session?.user;

            if (user) {
                // Update user metadata with new image URL
                const { error: updateError } = await supabase.auth.updateUser({
                    data: { userImage: publicUrl }
                });

                if (updateError) {
                    throw updateError;
                }

                setUserImage(publicUrl);
                Alert.alert('Success', 'Your profile image has been updated.');
            }
        } catch (error) {
            Alert.alert('Error', `Something went wrong: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            Alert.alert('Logout successful', 'You have been logged out successfully.');
            navigate('login');
        } catch (error) {
            Alert.alert('Logout error', `Logout error: ${error.message}`);
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true);

        if (password !== confirmPassword) {
            Alert.alert('Update error', 'Passwords do not match. Please try again.');
            setLoading(false);
            return;
        }

        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            const user = session?.user;
            if (user) {
                let updateData = { username };
                if (password) {
                    await supabase.auth.updateUser({ password });
                }

                const { error: updateError } = await supabase.auth.updateUser({
                    data: updateData,
                });

                if (updateError) throw updateError;

                Alert.alert('Profile updated', 'Your profile has been updated successfully.');
            }
        } catch (error) {
            Alert.alert('Update error', `Update error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={() => { navigate('home') }}>
                        <Image source={require('assets/backbuttonprofilescreen.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileTitle}>
                    <Text style={styles.profileTitleText}>Profile</Text>
                </View>

                {/* Profile Picture */}
                <View style={styles.fotoProfile}>
                    <Image source={userImage ? { uri: userImage } : require('assets/profilefoto.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.changePhotoButton} onPress={handleImageSelection}>
                        <Image source={require('assets/buttonfotoprofile.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        editable={!loading}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false}
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
                            <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={24} color="#888" />
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
                            <Ionicons name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"} size={24} color="#888" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSaveChanges}>
                        <Image source={require('assets/savechange.png')} style={styles.saveButton} />
                    </TouchableOpacity>
                </View>

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
        marginTop: -5,
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
