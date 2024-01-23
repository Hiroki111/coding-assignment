import { createSlice } from "@reduxjs/toolkit"

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: []
    },
    reducers: {
        // Just like starMovie in starredSlice.js, this addToWatchLater action may add
        // a movie that already exists. Is that an expected behavior?
        addToWatchLater: (state, action) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
        },

        removeFromWatchLater: (state, action) => {
            const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)
            // Again, just like unstarMovie in starredSlice,js,
            // it's probably necessary to call use the following line only if indexOfId is non-negative
            state.watchLaterMovies.splice(indexOfId, 1)
        },
        // typo (remveAllWatchLater -> removeAllWatchLater)
        remveAllWatchLater: (state) => {
            state.watchLaterMovies = []
        },
    },
})

export default watchLaterSlice
