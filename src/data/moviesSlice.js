import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const makeFetchRequest = async (apiUrl) => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('It failed to load movies');
  }
  return response.json();
};

export const fetchMovies = createAsyncThunk('fetch-movies', makeFetchRequest);

export const fetchNextMovies = createAsyncThunk('fetch-next-movies', async (apiUrl, { getState }) => {
  const { page } = getState().movies;
  const nextPageUrl = `${apiUrl}&page=${page + 1}`;
  return makeFetchRequest(nextPageUrl);
});

export const FETCH_STATUS_SUCCESS = 'success';
export const FETCH_STATUS_LOADING = 'loading';
export const FETCH_STATUS_ERROR = 'error';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    page: 0,
    totalPages: Number.MAX_SAFE_INTEGER,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.fetchStatus = FETCH_STATUS_SUCCESS;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = FETCH_STATUS_LOADING;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = FETCH_STATUS_ERROR;
      })
      .addCase(fetchNextMovies.fulfilled, (state, action) => {
        state.movies = state.movies.concat(action.payload.results);
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.fetchStatus = FETCH_STATUS_SUCCESS;
      })
      .addCase(fetchNextMovies.pending, (state) => {
        state.fetchStatus = FETCH_STATUS_LOADING;
      })
      .addCase(fetchNextMovies.rejected, (state) => {
        state.fetchStatus = FETCH_STATUS_ERROR;
      });
  },
});

export default moviesSlice;
