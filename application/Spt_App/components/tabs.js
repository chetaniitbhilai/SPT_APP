import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, AntDesign, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, Feather } from "@expo/vector-icons";
import CompanyList from '../Screens/companyList';
import Task from '../Screens/task';
import VolunteerList from '../Screens/volunteerList';
import Notification from '../Screens/notification';
import Profile from '../Screens/profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
            size={focused?24:16} 
            color={focused?"blue":"gray"} 
            style={styles.icon}
            />
          ),
        }}
      />
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
            size={focused?24:16} 
            color={focused?"blue":"gray"} 
            style={styles.icon}
            />
          ),
        }}
      />
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
            size={focused?24:16} 
            color={focused?"blue":"gray"} 
            style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Feather name="bell" 
            size={focused?24:16} 
            color={focused?"blue":"gray"} 
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
            size={focused?24:16} 
            color={focused?"blue":"gray"}
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
  icon:{
    marginBottom:"10px",
  }
});
