import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  Text
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR} from '../GlobalContext';
import ProfileButton from './ProfileButton';

const HeaderButtons = () => {
  const {
    setCurrentProfileID,
    currentProfileData,
    userData,
    setUIColor,
  } = useGlobalContext();

  const navigation = useNavigation();

  //navigates to public profile page and sets variable 'editing' to false
  //so you are in view mode not edit mode
  const handlePublicClick = () => {
    setCurrentProfileID(userData.publicProfiles[0]);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'ConnectionsStack', params: {
        screen: 'Profile', params: {
          editing: false,
        }
      }
    });
  };

  //navigates to private profile page and sets variable 'editing' to false
  //so you are in view mode not edit mode
  const handlePrivateClick = () => {
    setCurrentProfileID(userData.personalProfile);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'ConnectionsStack', params: {
        screen: 'Profile', params: {
          editing: false,
        }
      }
    });
  };

  const windowWidth = useWindowDimensions().width;

  const leftBarSmallest = require('../assets/leftToggleSmallest.png');
  const rightBarSmallest = require('../assets/rightToggleSmallest.png');
  const leftBarSmaller = require('../assets/leftToggleSmaller.png');
  const rightBarSmaller = require('../assets/rightToggleSmaller.png');
  const leftBar = (windowWidth > 1350) ?
  require('../assets/leftToggle.png') : (windowWidth < 730) ?
  leftBarSmallest: leftBarSmaller;
  const rightBar = (windowWidth > 1350) ?
  require('../assets/rightToggle.png') : (windowWidth < 730) ?
  rightBarSmallest: rightBarSmaller;
  
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={handlePrivateClick}>
        <Image source= {leftBar} style={styles.toggleLeft}/>
      </TouchableOpacity>

      <ProfileButton/>

      <TouchableOpacity onPress={handlePublicClick}>
        <Image source={rightBar} style={styles.toggleRight}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  toggleLeft: {
    height: 60,
  },
  toggleRight: {
    height: 60,
  },
});

export default HeaderButtons;