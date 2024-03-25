import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewPostScreen from './NewPostScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {
  HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline,
} from '../icons/index';

import { useGlobalContext } from '../GlobalContext';
import NotificationsScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { UIColor } = useGlobalContext();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: UIColor,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <HomeOutline />
          ),
        }}
      />
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FriendsOutline />
          ),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={NewPostScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <PlusOutline />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <BellOutline />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MailOutline />
          ),
        }}
      />
    </Tab.Navigator>

  );
};


export default AppTabs;
