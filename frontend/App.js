import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import AppTabs from './screens/AppTabs';
import ConnectionsScreen from './screens/ConnectionsScreen';
import PostPreviewScreen from './screens/PostPreviewScreen';
import {GlobalProvider} from './GlobalContext';
import NewPostScreen from './screens/NewPostScreen';
import FeedScreen from './screens/FeedScreen';
import PrivateSetupScreen from './screens/PrivateSetupScreen';
import PublicSetupScreen from './screens/PublicSetupScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';
import NewCommentScreen from './screens/NewCommentScreen';


const Stack = createStackNavigator();


/**
 * Get the header title based on the current navigation route.
 *
 * @param {object} route - The route object from React Navigation.
 * @return {string} The header title corresponding to the current route.
 */
function getHeaderTitle(route) {
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
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="PrivateSetupScreen"
            component={PrivateSetupScreen}
          />
          <Stack.Screen
            name="PublicSetupScreen"
            component={PublicSetupScreen}
          />
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={({route}) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
          <Stack.Screen
            name="Connection"
            component={ConnectionsScreen}
          />
          <Stack.Screen
            name="NewPost"
            component={NewPostScreen}
          />
          <Stack.Screen
            name="PostPreview"
            component={PostPreviewScreen}
          />
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
          />
          <Stack.Screen
            name="NewComment"
            component={NewCommentScreen}
          />
          {/* Add other screens and navigation options as needed */}
        </Stack.Navigator>
      </GlobalProvider>

    </NavigationContainer>
  );
};

export default App;
