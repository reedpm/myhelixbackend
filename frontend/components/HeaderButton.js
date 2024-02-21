import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image  } from "react-native";
import { HeaderLeftBlue, HeaderRightRed } from '../icons/index';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR} from '../GlobalContext';

const HeaderButton = ( props ) => {
  const [newImage, setNewImage] = useState(null);

  const {
    setCurrentProfileID,
    currentProfileData,
    userData,
    setUIColor,
  } = useGlobalContext();

  const navigation = useNavigation();
  const handlePublicClick = () => {
    setCurrentProfileID(userData.publicProfiles[0]);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  const handlePrivateClick = () => {
    setCurrentProfileID(userData.personalProfile);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={handlePrivateClick}
        style= {{
          height: '100%'
        }}
        >
        <HeaderLeftBlue/>
      </TouchableOpacity>

      <Image
        style={styles.picture}
        source={{
          uri: newImage || 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      
      <TouchableOpacity
        onPress={handlePublicClick}
        style= {{
          height:'100%'
        }}
        >
        <HeaderRightRed/>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default HeaderButton;