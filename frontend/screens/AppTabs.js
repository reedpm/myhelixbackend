import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import NewPostScreen from './NewPostScreen';
import ConnectionsScreen from './ConnectionsScreen';
import NotificationsScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import NewProfileScreen from './NewProfileScreen';
import MessagesScreen from './MessagesScreen';
import FeedScreen from './FeedScreen';

import {useGlobalContext} from '../GlobalContext';
import HeaderButton from '../components/HeaderButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ConnectionsStack= () => {
  return(
    <Stack.Navigator initialRouteName="ConnectionsPage" 
        screenOptions={{
          headerShown: false
        }}
      >
      <Stack.Screen name="ConnectionsPage" component={ConnectionsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="NewProfile" component={NewProfileScreen} />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const {UIColor, currentScreen } = useGlobalContext();

  const homeOutline = require('../assets/navbar/homeOutline.png');
  const homeFilled = require('../assets/navbar/homeFilled.png');
  const friendsOutline = require('../assets/navbar/friendsOutline.png');
  const friendsFilled = require('../assets/navbar/friendsFilled.png');
  const plusOutline = require('../assets/navbar/plusOutline.png');
  const plusFilled = require('../assets/navbar/plusFilled.png');
  const bellOutline = require('../assets/navbar/bellOutline.png');
  const bellFilled = require('../assets/navbar/bellFilled.png');
  const mailOutline = require('../assets/navbar/mailOutline.png');
  const mailFilled = require('../assets/navbar/mailFilled.png');
  
  return (
       <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: UIColor,
          },
          header: () => <HeaderButton/>,
          unmountOnBlur: true,
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image source={focused ? homeFilled : homeOutline } />
            ),
          }}
        />
        <Tab.Screen
          name="ConnectionsStack"
          component={ConnectionsStack}
          listeners={
            ({navigation}) => ({
              tabPress: (event) => {
                event.preventDefault();
                navigation.navigate('ConnectionsStack', {
                    screen: "ConnectionsPage",
                });
                }
            })
          }
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image source={focused && currentScreen == "ConnectionsScreen" ? friendsFilled : friendsOutline } />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="New Post"
          component={NewPostScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image source={focused ? plusFilled : plusOutline } />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image source={focused ? bellFilled : bellOutline } />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image source={focused ? mailFilled : mailOutline } />
            ),
          }}
        />
      </Tab.Navigator>

  );
};


export default AppTabs;
