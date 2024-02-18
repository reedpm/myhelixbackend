import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import ProfileScreen from './ProfileScreen';
import PostsScreen from './PostsScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline} from '../icons/index';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
    const [isPublicMode, setIsPublicMode] = useState(true);

    return(
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: isPublicMode ? 'rgba(145, 56, 58, 1)': 'rgba(52, 68, 151, 1)',
            }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={PostsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <HomeOutline/>
                    )
                }}
                />
            <Tab.Screen 
                name="Friends" 
                component={ConnectionsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <FriendsOutline/>
                    )
                }}
                />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <PlusOutline/>
                    )
                }}
                />
            <Tab.Screen 
                name="Notifications" 
                component={EmptyScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <BellOutline/>
                    )
                }}
                />
            <Tab.Screen 
                name="Mail" 
                component={EmptyScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <MailOutline/>
                    )
                }}
                />
            </Tab.Navigator>

    );
};
export default AppTabs;