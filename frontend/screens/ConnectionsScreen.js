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

  // const changeCurrentProfileID = () => {
  //   setCurrentProfileID(
  //     currentProfileID === userData.personalProfile ?
  //     userData.publicProfiles[0] : userData.personalProfile,
  //   );
  //   setUIColor(UI_COLOR[currentProfileData.type]);
  // };

  return (
    <View>
      {currentProfileID === userData.personalProfile ? <PrivateConnectionsScreen /> : <PublicConnectionsScreen />}
    </View>
  );
};

export default ConnectionsScreen;
