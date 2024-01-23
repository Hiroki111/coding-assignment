import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {
    
    it('should set loading true while action is pending', () => {
        const action = {type: fetchMovies.pending};
        // This variable isn't used.
        // Also, since you're updating the initial state with this action,
        // perhaps it's more accurate to call it "state" rather than "initialState"
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        // The action variable's value shouldn't change by just being passed into moviesSlice.reducer.
        // If I'm not mistaken, this action is supposed to update the fetchStatus of the state.
        // So, shouldn't you test the state's fetchStatus rather than action here?
        expect(action).toEqual({type: fetchMovies.pending})
     })

    // Reducers return a state, not a payload, right?
    // 'should set payload when action is fulfilled' is probably more accurate in my opinion
    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: moviesMock
        };
        // This variable isn't used.
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        // Same here.
        // The current state's fetchStatus and movies are what need to be tested here
        expect(action.payload).toBeTruthy()
    })

    it('should set error when action is rejected', () => {
        const action = {type: fetchMovies.rejected};
        // This variable isn't used.
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        // Same here.
        // The current state's fetchStatus should be tested here
        expect(action).toEqual({type: fetchMovies.rejected})
     })

})