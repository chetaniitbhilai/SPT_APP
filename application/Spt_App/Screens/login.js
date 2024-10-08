import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const IP_ADDRESS='192.168.97.10';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`http://${IP_ADDRESS}:5000/api/auth/login`, { //put your laptop ip address
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      console.log(res);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const cookie = res.headers.get('set-cookie'); // Ensure header name is correct
      if (cookie) {
        // Storing cookie in AsyncStorage
        const stringifiedCookie = JSON.stringify(cookie);
        console.log(stringifiedCookie);

        await AsyncStorage.setItem('cookie', stringifiedCookie);
        await AsyncStorage.setItem("userId", data._id);
        await AsyncStorage.setItem('email', data.email);

        const emailrece = await AsyncStorage.getItem("email");
        console.log(emailrece);

        ToastAndroid.showWithGravity(
          `This email is ${emailrece} `,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        navigation.navigate("Tabs");
      }

    } catch (error) {
      setError(error.message);
      console.log("Error during login:", error.message);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/CCPS.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/CCPS.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
              <Button title="Login" onPress={handleLogin} color="#1A9CE5" />
            </View>
          </View>
        </View>
        <View style={styles.triangleContainer}>
          <View style={[styles.triangle, styles.topLeftTriangle]} />
          <View style={[styles.triangle, styles.topRightTriangle]} />
          <View style={[styles.triangle, styles.bottomLeftTriangle]} />
          <View style={[styles.triangle, styles.bottomRightTriangle]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -85,
  },
  image: {
    width: 300,
    height: 300,
    marginHorizontal: 10,
  },
  loginContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    width: 330,
    height: 300,
    padding: 20,
    backgroundColor: '#F0F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -17
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  forgotPasswordContainer: {
    marginRight: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  loginButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#1A9CE5',
  },
  topLeftTriangle: {
    top: 0,
    left: 0,
    transform: [{ rotate: '180deg' }],
    marginLeft: -80,
  },
  topRightTriangle: {
    top: 0,
    right: 0,
    transform: [{ rotate: '180deg' }],
    marginRight: -80
  },
  bottomLeftTriangle: {
    bottom: 0,
    left: 0,
    marginLeft: -80,
  },
  bottomRightTriangle: {
    bottom: 0,
    right: 0,
    marginRight: -80
  },
});
