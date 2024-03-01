import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView, Item} from 'react-native';
import PublicConnectionsScreen from './PublicConnectionsScreen';
import PrivateConnectionsScreen from './PrivateConnectionsScreen';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';

const ConnectionsScreen = () => {
  const {
    currentProfileID,
    setCurrentProfileID,
    currentProfileData,
    setCurrentProfileData,
    userData,
    UIColor,
    setUIColor,
  } = useGlobalContext();

  return (
    <ScrollView>
      {currentProfileID === userData.personalProfile ? <PrivateConnectionsScreen />: <PublicConnectionsScreen />}
    </ScrollView>
  );
};

export default ConnectionsScreen;
