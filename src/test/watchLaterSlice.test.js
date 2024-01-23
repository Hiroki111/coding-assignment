import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

// As I commented in watchLaterSlice.js, removeFromWatchLater might remove a movie incorrectly
// if the provided movie doesn't exist.
// I'd add a test case where removeFromWatchLater uses a movie that doesn't exist
// and state.watchLaterMovies still contains the same array of movies
describe('watchLaterSlice test', () => {

    const state = { watchLaterMovies: [] }

    it('should set initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result).toEqual({ watchLaterMovies: []})
      })    

      it('should add movie to watch later', () => {
        const initialState = { ...state, watchLaterMovies: [] }
        const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result.watchLaterMovies[0]).toBe(moviesMock[0])
      })

      it('should remove movie from watch later', () => {
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        expect(result.watchLaterMovies[0]).toBe(moviesMock[1])
      })

      it('should remove all movies', () => {
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.remveAllWatchLater(state)
        const result = watchLaterSlice.reducer(initialState, action)
        expect(Object.keys(result.watchLaterMovies).length).toEqual(0)
      })
})