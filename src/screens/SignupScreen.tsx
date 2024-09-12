import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { supabase } from '@/utils/supabase';

const SignupScreen = ({ navigation: { navigate } }) => {
  const translateY = useSharedValue(0);
  const [tapped, setTapped] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { width, height } = useWindowDimensions();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: !tapped ? withTiming(translateY.value + 0) : withTiming(translateY.value - 160) }],
  }));

  useEffect(() => {
    const upp = Keyboard.addListener('keyboardDidShow', () => {
      setTapped(true);
    });
    const down = Keyboard.addListener('keyboardDidHide', () => {
      setTapped(false);
    });
    return () => {
      upp.remove();
      down.remove();
    };
  }, []);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          },
        },              
      });
      if (error) throw error;
      navigate('login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
        <Image style={styles.imageLogo} source={require('assets/img1.png')} />
        
        <Animated.View style={[styles.animatedContainer, { width: width * 0.9, height: height * 0.75 }, animatedStyles]}>
          <TouchableOpacity onPress={() => { navigate }}>
            <Image style={styles.goBackImage} source={require('assets/img2.png')} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Join the battle!</Text>
          <Text style={styles.subtitle}>Create your account now and dive into the classic game of strategy and luck.</Text>

          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              secureTextEntry={securePassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={styles.eyeIcon}>
              <Ionicons name='eye-outline' size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm Password"
              secureTextEntry={secureConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name='eye-outline' size={24} />
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5BD1DE',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 70,
  },
  imageLogo: {
    alignSelf: "center",
    top: -10,
  },
  animatedContainer: {
    backgroundColor: "white",
    padding: 50,
    alignSelf: "center",
    borderRadius: 28,
    marginBottom: 20,
  },
  goBackImage: {
    left: -20,
    top: -30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -15,
    marginLeft: -10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'thin',
    paddingTop: 5,
    marginLeft: -10,
    marginBottom: 30,
  },
  input: {
    height: 48,
    borderColor: '#F4F4F4',
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F4F4F4',
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputPassword: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    marginTop: 50,
    backgroundColor: '#44c9e0',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignupScreen;
