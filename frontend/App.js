import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
const Stack = createStackNavigator();

export const dbURI = 'http://localhost:3000/api/';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* Add other screens and navigation options as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
