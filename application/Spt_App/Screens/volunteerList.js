// import React, { useState, useEffect } from 'react';
// import { Text, View, ScrollView, StyleSheet, FlatList, Image, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const VolunteerList = () => {
//   const [department, setDepartment] = useState('');
//   const [volunteers, setVolunteers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const cookie = await AsyncStorage.getItem('cookie');
//         if (!cookie) {
//           throw new Error('No cookie found');
//         }

//         // Fetch user details
//         const userRes = await fetch('http://192.168.1.4:5000/api/auth/volunteer', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'cookie': cookie,
//           },
//         });

//         const userData = await userRes.json();
//         if (userData.error) {
//           throw new Error(userData.error);
//         }

//         // setDepartment(userData.department);

//         // // Fetch all users (assuming it's from your backend or local data)
//         // const allUsers = [
//         //   { name: "Mohit Thakre", post: "Volunteer (Intership Cell)", department: "CSE", imageUrl: require('../assets/user.png') },
//         //   { name: "Varun Rao", post: "Volunteer (DSAI Liasoning)", department: "CSE", imageUrl: require('../assets/user.png') },
//         //   { name: "Anil Kumar", post: "Volunteer (MT Liasoning )", department: "Engineering", imageUrl: require('../assets/user.png') },
//         //   { name: "Mohit Thakre", post: "Volunteer (Intership Cell)", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         //   { name: "Varun Rao", post: "Volunteer (DSAI Liasoning)", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         //   { name: "Anil Kumar", post: "Volunteer (MT Liasoning )", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         //   { name: "Mohit Thakre", post: "Volunteer (MT Liasoning )", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         //   { name: "Mohit Thakre", post: "Volunteer (MT Liasoning )", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         //   { name: "Mohit Thakre", post: "Volunteer (MT Liasoning )", department: "CSE Discipline", imageUrl: require('../assets/user.png') },
//         // ];

//         // // Filter users based on the logged-in user's department
//         // const filteredUsers = allUsers.filter(user => user.department === userData.department);
//         setVolunteers(userData.volunteers);
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ScrollView>
//       <View style={styles.icon}>
//         <View>
//           <Text style={styles.heading}>Student Placement Team</Text>
//         </View>
//         <FlatList
//           data={volunteers}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.itemContainer}>
//               <Image source={item.imageUrl} style={styles.image} />
//               <View style={styles.textContainer}>
//                 <Text style={styles.boldText}> {item.name}</Text>
//                 <Text style={styles.item}>{item.post}</Text>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default VolunteerList;

// const styles = StyleSheet.create({
//   icon: {
//     flex: 1,
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   textContainer: {
//     justifyContent: 'center',
//   },
//   boldText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   item: {
//     fontSize: 16,
//     color: '#888',
//   },
// });
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const IP_ADDRESS='192.168.97.10';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        if (!cookie) {
          throw new Error('No cookie found');
        }

        // Fetch user details and volunteers
        const response = await fetch(`http://${IP_ADDRESS}:5000/api/auth/volunteer`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cookie': cookie,
          },
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Assuming the backend sends an array of volunteers
        const updatedVolunteers = data.volunteers.map((volunteer) => {
          // Generate an avatar URL based on the volunteer's ID or name
          const avatarUrl = `https://avatars.dicebear.com/api/initials/john.png`;

          return { ...volunteer, profilePicUrl: avatarUrl };
        });

        setVolunteers(updatedVolunteers);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.icon}>
        <View>
          <Text style={styles.heading}>Student Placement Team</Text>
        </View>
        <FlatList
          data={volunteers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.profilePicUrl }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>{item.name}</Text>
                <Text style={styles.item}>{item.position}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default VolunteerList;

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  textContainer: {
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    color: '#888',
  },
});
