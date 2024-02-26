import React from 'react';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import AppTabs from './screens/AppTabs';
import ConnectionsScreen from './screens/ConnectionsScreen';
import {GlobalProvider} from './GlobalContext';
const Stack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Feed':
      return 'Home';
    case 'Profile':
      return 'Profile';
    case 'Friends':
      return 'Friends';
    case 'Messages':
      return 'Messages';
    case 'Notifications':
      return 'Notifications';
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Connection" component={ConnectionsScreen} /> */}
          <Stack.Screen 
          name="AppTabs" 
          component={AppTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
          />
          {/* Add other screens and navigation options as needed */}
        </Stack.Navigator>
      </GlobalProvider>

    </NavigationContainer>
  );
};

export default App;
