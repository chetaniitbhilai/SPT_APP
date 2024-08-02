import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
import CompanyList from '../Screens/companyList';
import Task from '../Screens/task.js';
import VolunteerList from '../Screens/volunteerList';
import Profile from '../Screens/profile';
import Email from '../Screens/email';
import TaskVolunteer from '../Screens/taskVolunteer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [userData, setUserData] = useState({
    name: '',
    position: '',
    responsibility: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        if (!cookie) {
          throw new Error('No cookie found');
        }
        
        const res = await fetch('http://192.168.97.10:5000/api/auth/profile', {
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
        });
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
  
    fetchData();
  }, []);

  console.log(userData.position);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Company List"
        component={CompanyList}
        options={{
          tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="list" 
              size={focused ? 24 : 16} 
              color={focused ? "blue" : "gray"} 
              style={styles.icon}
            />
          ),
        }}
      />
      {userData.position === 'Coordinator' ? (
        <Tab.Screen
          name="Task"
          component={Task}
          options={{
            tabBarLabelStyle: {
              marginTop: -5,
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="tasks" 
                size={focused ? 24 : 16} 
                color={focused ? "blue" : "gray"} 
                style={styles.icon}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Task"
          component={TaskVolunteer}
          options={{
            tabBarLabelStyle: {
              marginTop: -5,
              fontSize: 12,
            },
            tabBarIcon: ({ focused }) => (
              <FontAwesome5 name="tasks" 
                size={focused ? 24 : 16} 
                color={focused ? "blue" : "gray"} 
                style={styles.icon}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Volunteer List"
        component={VolunteerList}
        options={{
          tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <FontAwesome6 name="people-group" 
              size={focused ? 24 : 16} 
              color={focused ? "blue" : "gray"} 
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Email"
        component={Email}
        options={{
          tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Fontisto name="email" 
              size={focused ? 24 : 16} 
              color={focused ? "blue" : "gray"} 
              style={styles.icon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" 
              size={focused ? 24 : 16} 
              color={focused ? "blue" : "gray"}
              style={styles.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginBottom: 10,
  },
});
