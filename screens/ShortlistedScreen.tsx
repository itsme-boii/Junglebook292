import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/hook';
import { removeMovie } from '../hooks/movieSlice';

const ShortlistedScreen = () => {
  const shortlisted = useAppSelector((state) => state.movies.shortlisted);
  const dispatch = useAppDispatch();

  if (shortlisted.length === 0) return <Text>No shortlisted movies.</Text>;

  return (
    <FlatList
      data={shortlisted}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movieItem}>
          <Text>{item.title}</Text>
          <Button title="Remove" onPress={() => dispatch(removeMovie(item.id))} />
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

export default ShortlistedScreen;
