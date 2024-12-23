import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  title: string;
}

interface MovieState {
  shortlisted: Movie[];
}

const initialState: MovieState = {
  shortlisted: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.shortlisted.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.shortlisted = state.shortlisted.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
