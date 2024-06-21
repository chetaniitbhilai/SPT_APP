import React,{useState,useEffect} from 'react'
import { Text, View,ScrollView,StyleSheet ,SafeAreaView } from 'react-native'
import { Avatar, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    position: '',
    responsibility: '',
    // contacts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        if (!cookie) {
          throw new Error('No cookie found');
        }
        
        const res = await fetch('http://192.168.1.103:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cookie': cookie, // Use the cookie directly if it's formatted correctly
          },
        });
  
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
  
        setUserData({
          name: data.name,
          position: data.position,
          responsibility: data.responsibility,
          // contacts: data.contacts,
        });
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
  
    fetchData();
  }, []);




  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView >
      <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri: 'https://randomuser.me/api/portraits/men/1.jpg',
        }}
        containerStyle={styles.avatar}
      />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.position}>{userData.position}</Text>
      <Text style={styles.position}>Student Placement Cell</Text>
      <Text style={styles.header}>Responsibilities</Text>
      <Text style={styles.responsibilities}>
        {userData.responsibility}
        </Text>
        <Text style={styles.responsibilitiesdecription}>
        Assit students in finding job oppurtunities.
      </Text>
      <Text style={styles.contact}>
        Contacts
      </Text>
      <Text style={styles.contactdecription}>
        You have 2 assigned Contacts.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="VIEW CONTACTS"
          buttonStyle={styles.viewContactsButton}
          containerStyle={styles.button}
        />
        <Button
          title="ASSIGN CONTACTS"
          buttonStyle={styles.assignContactsButton}
          containerStyle={styles.button}
        />
      </View>
      
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: ,
    paddingLeft:20,
    paddingTop:20,
    backgroundColor: '#f8f8f8',
  },
  responsibilitiesdecription:{
    fontSize:12,
    color:"gray"
  },
  contact:{
    marginTop:20,
    marginBottom:20,
    fontSize:20,
    fontWeight:'bold',
  },
  avatar: {
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  position: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  responsibilities: {
    fontSize: 16,
    marginBottom:3,
    // textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20,
    marginLeft:-10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  viewContactsButton: {
    backgroundColor: '#007bff',
  },
  assignContactsButton: {
    backgroundColor: '#6c757d',
  },
});