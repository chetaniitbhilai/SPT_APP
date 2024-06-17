// src/Login.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/CCPS.png')} // replace with your local image path
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/CCPS.png')} // replace with your local image path
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
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
          />
          <View style={styles.loginButtonContainer}>

          <TouchableOpacity onPress={() => {}}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button title="Login" onPress={() => {
                navigation.navigate("Tabs");
            }}  style={styles.loginButton}/>
            
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#FFFFFF'
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
    width: 300, // Width of the login container
    height: 300, // Height of the login container
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
    marginLeft:-17
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
  forgotPassword: {
    marginTop: 10,
    marginRight: 30, // Add margin to separate from the Login button
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loginButtonContainer:{
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 20, // Adjust as needed
  },
  loginButton:{
    width: 200,
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  }
});
