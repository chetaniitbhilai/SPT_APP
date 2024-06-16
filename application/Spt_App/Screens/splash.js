import React, { useEffect } from 'react';
import {View,Text, SafeAreaView, StyleSheet,Image} from 'react-native';


const Splash = ({navigation}) => {
    useEffect(() => {
        // Simulate loading process or any other initialization logic
        setTimeout(() => {
          // Navigate to the main screen or any other screen after the splash screen
        //   navigation.replace('Welcome');
        navigation.navigate('Tabs');
        }, 1000); // Adjust the duration as needed
      }, []);
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.background} />
        <Image source={require('../assets/CCPS.png')} style={styles.logo} />
    </SafeAreaView>
  )
}

export default Splash

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1A9CE5', 
      },
      logo: {
        width: 300, 
        height: 250,
        resizeMode: 'contain',
      },
    
})