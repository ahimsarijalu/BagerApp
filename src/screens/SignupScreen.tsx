import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import Ionicons from '@expo/vector-icons/Ionicons';


const SignupScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={{alignSelf:"center", top:-10}} source={img1}></Image>
      <View style={{backgroundColor:"white", padding:50, width:400, marginLeft:-20, borderTopRightRadius:15, borderTopLeftRadius:15, height:642}}>
        <Image style={{ left:-20, top:-30}} source={img2}></Image>
        {/* <Image style={{ top: -15, height:76, width:342}} source={img3}></Image> */}
        <Text style={{fontSize:22, fontWeight:'bold', marginTop:-15, marginLeft:-10}}>Join the battle!</Text>
        <Text style={{fontSize:18, fontWeight:'thin', paddingTop:5, marginLeft:-10, marginBottom:30}}>Create your account now and dive into the classic game of strategy and luck. </Text>


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
        <TouchableOpacity
          onPress={() => setSecurePassword(!securePassword)}
          style={styles.eyeIcon}>
            
          
          <Ionicons name='eye-outline' size={24}/>
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
        <TouchableOpacity
          onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
          style={styles.eyeIcon}>
          
          <Ionicons name='eye-outline' size={24}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.loginText}>
        Already Have an Account? <Text style={styles.loginLink}>Login Now</Text>
        </Text>
      </TouchableOpacity>

      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5BD1DE',
    // padding: 20,
    paddingLeft:20,
    marginBottom:-0,
    paddingTop: 70,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C2FF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#00C2FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: '#F4F4F4',
    backgroundColor:'#F4F4F4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F4F4F4',
    backgroundColor:'#F4F4F4',
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
    marginTop: 70,
    backgroundColor: '#00C2FF',
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
  loginText: {
    textAlign: 'center',
    color: '#7D7D7D',
  },
  loginLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  
});

export default SignupScreen;
