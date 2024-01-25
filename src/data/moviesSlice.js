import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const makeFetchRequest = async (apiUrl) => {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json()
}
export const fetchMovies = createAsyncThunk('fetch-movies', makeFetchRequest)
export const fetchNextMovies = createAsyncThunk('fetch-next-movies', makeFetchRequest);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        page: 0,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.results
            state.page = action.payload.page
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        }).addCase(fetchNextMovies.fulfilled, (state, action) => {
            state.movies = state.movies.concat(action.payload.results)
            state.page = action.payload.page
            state.fetchStatus = 'success'
        }).addCase(fetchNextMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchNextMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
