import React, { useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { env } from 'expo-env';

import { Text, View } from '../../components/Themed';


export default function TabTwoScreen() {
  const [query, setQuery] = useState('');
  const [searchedJoke, setSearchedJoke] = useState('');

  const handleSearch = async () => {
    const apiUrl = env.API_CHUCKNORRIS;
    try {
      const response = await fetch(`${apiUrl}/jokes/search?query=${query}`);
      const data = await response.json();
      const joke = data.result[0]?.value;
      setSearchedJoke(joke || 'No joke found');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setQuery('');
    setSearchedJoke('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Chucknorris Jokes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={styles.input}
        placeholder="Enter a search query"
        onChangeText={setQuery}
        value={query}
      />
      <Button title="Search" onPress={handleSearch} />
      <Text style={styles.searchedJoke}>{searchedJoke}</Text>
      {!searchedJoke? null: 
       <Button title="Delete" onPress={handleDelete} />
      }
      
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchedJoke: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});