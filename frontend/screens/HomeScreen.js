import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../styles';
import {customFonts} from '../CustomFonts';

const HomeScreen = () => {
  customFonts();
  const navigation = useNavigation();
  const handleSignup = async () => {
    navigation.navigate('Signup');
  };

  const handleLogin = async () => {
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginVertical: 300,
    marginHorizontal: 50,
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default HomeScreen;
