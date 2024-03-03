import React from 'react';
import {Image} from 'react-native'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import NewPostScreen from './NewPostScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {
  HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline,
} from '../icons/index';

import {useGlobalContext} from '../GlobalContext';
import HeaderButton from '../components/HeaderButton';
import NotificationsScreen from './NotificationScreen';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const {UIColor} = useGlobalContext();

  const homeOutline = require("../assets/navbar/homeOutline.svg");
  const homeFilled = require("../assets/navbar/homeFilled.svg");
  const friendsOutline = require("../assets/navbar/friendsOutline.svg");
  const friendsFilled = require("../assets/navbar/friendsFilled.svg");
  const plusOutline = require("../assets/navbar/plusOutline.svg");
  const plusFilled = require("../assets/navbar/plusFilled.svg");
  const bellOutline = require("../assets/navbar/bellOutline.svg");
  const bellFilled = require("../assets/navbar/bellFilled.svg");
  const mailOutline = require("../assets/navbar/mailOutline.svg");
  const mailFilled = require("../assets/navbar/mailFilled.svg");

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
          tabBarIcon: ({ focused }) => (
            // <HomeOutline/>
            <Image source={focused ? homeFilled : homeOutline } />
          ),
          header: () => <HeaderButton/>
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? friendsFilled : friendsOutline } />
          ),
          header: () => <HeaderButton/>
        }}
      />
      <Tab.Screen
        name="New Post"
        component={NewPostScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? plusFilled : plusOutline } />
          ),
          header: () => <HeaderButton/>
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? bellFilled : bellOutline } />
          ),
          header: () => <HeaderButton/>
        }}
      />
      <Tab.Screen
        name="Messages"
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? mailFilled : mailOutline } />
          ),
          header: (props) => <HeaderButton/>
        }}
      />
    </Tab.Navigator>

  );
};


export default AppTabs;
