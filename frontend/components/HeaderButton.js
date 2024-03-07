import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, useWindowDimensions } from "react-native";
import { EllipseProfile, HeaderLeftBlue, HeaderRightRed } from '../icons/index';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR} from '../GlobalContext';
import leftHeader from "../assets/navbar/headerLeftBlue.svg";
import { ImageBackground } from 'react-native-web';

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

  const handleProfileClick = () => {
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  const windowWidth = useWindowDimensions().width;

  const leftBarSmallest = require("../assets/leftToggleSmallest.png"); 
  const rightBarSmallest = require("../assets/rightToggleSmallest.png");  
  const leftBarSmaller = require("../assets/leftToggleSmaller.png"); 
  const rightBarSmaller = require("../assets/rightToggleSmaller.png"); 
  const leftBar = (windowWidth >  1350) ? require("../assets/leftToggle.png") : (windowWidth <  730) ? leftBarSmallest: leftBarSmaller;
  const rightBar = (windowWidth >  1350) ? require("../assets/rightToggle.png") : (windowWidth <  730) ? rightBarSmallest: rightBarSmaller;  


  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0,0,0,1)'
      }}>
      <TouchableOpacity
        onPress={handlePrivateClick}
        style= {{
          // width: '50%',
          // resizeMode:"contain",
          // height: 20,
          justifyContent: 'flex-end'
        }}
        >
        {/* <HeaderLeftBlue/> */}
        {/* <img src="../assets/navbar/stretchedHeaderLeftBlue.svg" width="100%" resizeMode="contain" maxHeight="60"/> */}
        {/* <img src="../assets/leftToggleSmallest.png" resizeMode="contain"  height="60"/> */}
        <Image source= {leftBar} style={styles.toggleLeft}/>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={handleProfileClick}
        style= {{
          resizeMode:"stretch"
        }}
        >
        <Image
          style={styles.picture}
          source={{
            uri: newImage || 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePublicClick}
        style= {{
          // width: '50%',
          // resizeMode:"contain"
          justifyContent: 'flex-start'
        }}
        >
        {/* <HeaderRightRed/> */}
        {/* <img src="../assets/rightToggleSmallest.png" resizeMode="contain"  height="60"/> */}
        <Image source={rightBar} style={styles.toggleRight}/>

      </TouchableOpacity>
        

      {/* <EllipseProfile/> */}
    </View>
  )
};

const styles = StyleSheet.create({
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  toggleLeft: {
    height: 60,
    // width: auto
    resizeMode: 'contain',
  },
  toggleRight: {
    resizeMode: 'contain',
    height: 60,
    // width: 'auto'
  }
});

export default HeaderButton;