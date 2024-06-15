import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

export default function List() {
  const users = [
    { name: "Mohit Thakre", post: "Volunteer (Intership Cell)", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Varun Rao", post: "Volunteer (DSAI Liasoning)", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Anil Kumar", post: "Volunteer (MT Liasoning )", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Mohit Thakre", post: "Volunteer (Intership Cell)", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Varun Rao", post: "Volunteer (DSAI Liasoning)", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Anil Kumar", post: "Volunteer (MT Liasoning )", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
    { name: "Mohit Thakre", post: "Volunteer (MT Liasoning )", Discipline: "CSE Discipline", imageUrl: require('../assets/user.png') },
  
  ];

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.heading}>Student Placement Team</Text>
        </View>
      <FlatList 
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.imageUrl} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.boldText}> {item.name}</Text>
              <Text style={styles.item}>{item.post}</Text>
              <Text style={styles.item}>{item.Discipline}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading:{
    
    height: 50,
    backgroundColor:'#1FF2E1',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 6,
    

  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    padding: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
});
