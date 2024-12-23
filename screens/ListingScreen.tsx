import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppDispatch } from '../hooks/hook';
import { addMovie } from '../hooks/movieSlice';

// Fetch movies function
const fetchMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=1b39ebbfd3976805c4a523a7aaca0d4e'
  );
  return response.data.results;
};

const ListingScreen = () => {
  const dispatch = useAppDispatch();

  // Use `useQuery` with the object syntax
  const { data, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching movies.</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movieItem}>
          <Text>{item.title}</Text>
          <Button title="Shortlist" onPress={() => dispatch(addMovie(item))} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ListingScreen;
