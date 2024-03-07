import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewPostScreen from './NewPostScreen';
import ConnectionsScreen from './ConnectionsScreen';
import NotificationsScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import MessagesScreen from './MessagesScreen';

import {useGlobalContext} from '../GlobalContext';
import HeaderButton from '../components/HeaderButton';


const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const {UIColor} = useGlobalContext();

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
        // headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image source={focused ? homeFilled : homeOutline } />
          ),
          header: () => <HeaderButton/>,
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image source={focused ? friendsFilled : friendsOutline } />
          ),
          header: () => <HeaderButton/>,
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
          header: () => <HeaderButton/>,
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
          header: () => <HeaderButton/>,
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
          header: () => <HeaderButton/>,
        }}
      />
    </Tab.Navigator>

  );
};


export default AppTabs;
