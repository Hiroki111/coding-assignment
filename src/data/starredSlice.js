import { createSlice } from "@reduxjs/toolkit"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: []
    },
    reducers: {
        starMovie: (state, action) => {
            // I think that state.starredMovies may get duplicate elements if starMovie is dispatched with the same movie.
            // If so, is that an expected behavior here?
            state.starredMovies = [action.payload, ...state.starredMovies]
        },
        unstarMovie: (state, action) => {
            const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)
            // Array.splice()'s index counts a negative value from the end of the array.
            // So, I think this line should be called only if indexOfId is non-negative
            state.starredMovies.splice(indexOfId, 1)
        },
        clearAllStarred: (state) => {
            state.starredMovies = []
        },
    },
})

export default starredSlice
