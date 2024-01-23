import starredSlice from '../data/starredSlice'
import { moviesMock } from './movies.mocks'


// As I commented in starredSlice.js, unstarMovie might remove a movie incorrectly
// if the provided movie doesn't exist.
// I'd add a test case where unstarMovie uses a movie that doesn't exist
// and state.starredMovies still contains the same array of movies
describe('starredSlice test', () => {

    const state = { starredMovies: [] }

    it('should set an initial state', () => {
        const initialState = state
        const action = { type: '' }
        const result = starredSlice.reducer(initialState, action)
        expect(result).toEqual({ starredMovies: []})
      })    

      it('should add movie to starred', () => {
        const initialState = { ...state, starredMovies: [] }
        const action = starredSlice.actions.starMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[0])
      })

      it('should remove movie from starred', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.unstarMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        expect(result.starredMovies[0]).toBe(moviesMock[1])
      })

      it('should remove all movies', () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.clearAllStarred(state)
        const result = starredSlice.reducer(initialState, action)
        expect(Object.keys(result.starredMovies).length).toEqual(0)
      })
})