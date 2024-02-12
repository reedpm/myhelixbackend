import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import AppTabs from './screens/AppTabs';
const Stack = createStackNavigator();

export const dbURI = 'http://localhost:3000/api/';
export const UI_COLOR = {
  PERSONAL: '#344497',
  PUBLIC: '#9D7F95',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        {/* Add other screens and navigation options as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
