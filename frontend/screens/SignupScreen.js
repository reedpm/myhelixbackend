import React, {useState} from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Alert, Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../styles';
import {customFonts} from '../CustomFonts';
import { dbURI, useGlobalContext } from '../GlobalContext';


const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const {setUserData, setCurrentProfileID} = useGlobalContext();
  const navigation = useNavigation();
  customFonts();

  const handleSignup = async () => {
    try {
      console.log(email, password, displayName);
      const response = await fetch(dbURI + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          displayName: displayName,
        }),
      });
      console.log(response);
      if (!response.ok) {
        // Handle unsuccessful signup
        Alert.alert(
            'Signup Failed',
            'An account is already registered with this email.',
        );
        return;
      }

      const data = await response.json();
      console.log(data);

      setUserData({...data});
      setCurrentProfileID(data.personalProfile);

      navigation.navigate('PrivateSetupScreen');
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert(
          'Signup Failed',
          'An account is already registered with this email.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDisplayName}
        value={displayName}
        placeholder="Enter your name"
        keyboardType="default"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 300,

  },
  button: {
    backgroundImage: `url("../assets/gradient.png")`,
    alignItems: 'center',
    padding: 10,
    width: 130,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default SignupScreen;