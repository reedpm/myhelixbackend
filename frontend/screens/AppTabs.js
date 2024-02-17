import PropTypes from 'prop-types';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {
  HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline,
} from '../icons/index';

import {useGlobalContext} from '../GlobalContext';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const {UIColor} = useGlobalContext();

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
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <HomeOutline/>
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={ConnectionsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FriendsOutline/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <PlusOutline/>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <BellOutline/>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MailOutline/>
          ),
        }}
      />
    </Tab.Navigator>

  );
};


export default AppTabs;
