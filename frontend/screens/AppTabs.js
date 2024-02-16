import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import EmptyScreen from './EmptyScreen';
import ConnectionsScreen from './ConnectionsScreen';
import {HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline} from '../icons/index';
import {
  HomeOutline, FriendsOutline, PlusOutline, BellOutline, MailOutline,
} from '../icons/index';
import {UI_COLOR} from '../App';

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
                component={EmptyScreen}
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
const AppTabs = ({route}) => {
  const {personalProfile, publicProfile} = route.params;
  const [profileData, setProfileData] = useState({...null, type: 'PUBLIC'});
  const [currentProfileID, setCurrentProfileID] = useState(personalProfile);


  useEffect(() => {
    // Fetch profile data using the personalProfile route
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
            dbURI + `profile/getProfile/${currentProfileID}`);
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }

        const data = await response.json();

        // Update profileData
        setProfileData({...data.data});
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };

    fetchProfileData();
  }, [currentProfileID]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: UI_COLOR[profileData.type],
        },
      }}
    >
      <Tab.Screen
        name="Home"
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
        component={EmptyScreen}
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
        name="Mail"
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

AppTabs.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      personalProfile: PropTypes.string,
      publicProfile: PropTypes.string,
    }),
  }).isRequired,
};

export default AppTabs;
