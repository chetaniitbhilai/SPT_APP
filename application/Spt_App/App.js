  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';

  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from './Screens/splash';
import Tabs from './components/tabs';
import VolunteerList from './Screens/volunteerList';
import Login from './Screens/login';

  const Stack = createNativeStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen 
           name="VolunteerList" 
           component={VolunteerList} 
           options={{
            headerShown: false,
          }}
           />

           <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />

          <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }


