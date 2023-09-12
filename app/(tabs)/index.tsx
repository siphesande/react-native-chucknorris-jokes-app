import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    setJoke('')
  }, []);

  const fetchRandomJoke = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuck Norris Random Joke</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Get Random Joke" onPress={fetchRandomJoke} />
      <Text style={styles.joke}>{joke}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  joke: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
