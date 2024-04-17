import React, {useState} from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Alert, Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dbURI} from '../App';
import {colors, fonts} from '../styles';
import {customFonts} from '../CustomFonts';


const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  customFonts();

  const handleSignup = async () => {
    try {
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

      if (!response.ok) {
        // Handle unsuccessful signup
        Alert.alert(
            'Signup Failed',
            'An account is already registered with this email.',
        );
        return;
      }

      const data = await response.json();

      setUserData({...data});
      setCurrentProfileID(data.personalProfile);

      // Navigate to the Profile screen upon successful signup
      navigation.navigate('AppTabs', {
        screen: 'Profile',
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDisplayName}
        value={displayName}
        placeholder="John Doe"
        keyboardType="default"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="example@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder=""
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 8,
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
    padding: 10,
    borderRadius: 10,
    width: 300, 
    height: auto,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default SignupScreen;
