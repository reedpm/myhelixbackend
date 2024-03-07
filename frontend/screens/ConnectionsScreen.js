import React from 'react';
import {ScrollView} from 'react-native';
import PublicConnectionsScreen from './PublicConnectionsScreen';
import PrivateConnectionsScreen from './PrivateConnectionsScreen';
import {useGlobalContext} from '../GlobalContext';

const ConnectionsScreen = () => {
  const {
    currentProfileID,
    userData,
  } = useGlobalContext();

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
