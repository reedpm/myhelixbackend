import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import AppTabs from './screens/AppTabs';
import ConnectionsScreen from './screens/ConnectionsScreen';
import {GlobalProvider} from './GlobalContext';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Connection" component={ConnectionsScreen} />
          <Stack.Screen name="AppTabs" component={AppTabs} />
          {/* Add other screens and navigation options as needed */}
        </Stack.Navigator>
      </GlobalProvider>

    </NavigationContainer>
  );
};

export default App;
