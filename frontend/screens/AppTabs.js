import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import ProfileScreen from './ProfileScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {
  HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline, HeaderRightRed,
} from '../icons/index';

import {useGlobalContext} from '../GlobalContext';
import HeaderButton from '../components/HeaderButton';
import { HeaderLeftBlue } from '../icons';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const {UIColor} = useGlobalContext();

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
        component={EmptyScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <HomeOutline/>
          ),
          header: () => <HeaderButton/>
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
          header: () => <HeaderButton/>
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
          header: () => <HeaderButton/>
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
          header: () => <HeaderButton/>
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
          header: (props) => <HeaderButton/>
        }}
      />
    </Tab.Navigator>

  );
};


export default AppTabs;
