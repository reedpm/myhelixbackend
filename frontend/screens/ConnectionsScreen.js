import React from 'react';
import {ScrollView} from 'react-native';
import PublicConnectionsScreen from './PublicConnectionsScreen';
import PrivateConnectionsScreen from './PrivateConnectionsScreen';
import {useGlobalContext} from '../GlobalContext';
import {useFocusEffect} from '@react-navigation/native';

const ConnectionsScreen = () => {
  const {
    currentProfileID,
    userData,
    setCurrentScreen
  } = useGlobalContext();

    // //this is to pass back to the Tab navigator which screen within the Connections Stack is currently focused
    useFocusEffect(() => {
      setCurrentScreen("ConnectionsScreen");
    }, []);

  return (
    <ScrollView>
      {
        currentProfileID === userData.personalProfile ?
          <PrivateConnectionsScreen /> :
          <PublicConnectionsScreen />
      }
    </ScrollView>
  );
};

export default ConnectionsScreen;
