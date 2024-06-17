import React from 'react'
import { Text, View,ScrollView,StyleSheet ,SafeAreaView } from 'react-native'
import { Avatar, Button } from 'react-native-elements';


const Profile = () => {
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
      <Text style={styles.name}>Parth Sarwade</Text>
      <Text style={styles.position}>Placement Coordinator(UG)</Text>
      <Text style={styles.position}>Student Placement Cell</Text>
      <Text style={styles.header}>Responsibilities</Text>
      <Text style={styles.responsibilities}>
        Manage Student data
        </Text>
      <Text style={styles.responsibilitiesdecription}>
        Assit students in finding job oppurtunities.
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