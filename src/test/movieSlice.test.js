import moviesSlice, {
  fetchMovies,
  fetchNextMovies,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_LOADING,
  FETCH_STATUS_ERROR,
} from '../data/moviesSlice';
import { fetchMoviesResponseMock } from './movies.mocks';

describe('MovieSlice test', () => {
  const initialState = {
    movies: [],
    fetchStatus: '',
    page: 0,
    totalPages: Number.MAX_SAFE_INTEGER,
  };

  describe('fetchMovies', () => {
    it('should set loading true while action is pending', () => {
      const action = { type: fetchMovies.pending };
      const state = moviesSlice.reducer(initialState, action);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_LOADING);
    });

    it('should set movies when action is fulfilled', () => {
      const action = {
        type: fetchMovies.fulfilled,
        payload: fetchMoviesResponseMock,
      };
      const initialMovies = [
        {
          id: '12345',
          overview: 'This is a mock movie',
          poster_path: '/abc.jpg',
          release_date: '2010-01-01',
          title: 'Mock movie',
        },
      ];
      const state = moviesSlice.reducer(
        {
          ...initialState,
          movies: initialMovies,
        },
        action,
      );

      // The initial movies are overwritten
      expect(state.movies).toEqual(fetchMoviesResponseMock.results);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_SUCCESS);
      expect(state.page).toEqual(fetchMoviesResponseMock.page);
      expect(state.totalPages).toEqual(fetchMoviesResponseMock.total_pages);
    });

    it('should set error when action is rejected', () => {
      const action = { type: fetchMovies.rejected };
      const state = moviesSlice.reducer(initialState, action);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_ERROR);
    });
  });

  describe('fetchNextMovies', () => {
    it('should set loading true while action is pending', () => {
      const action = { type: fetchNextMovies.pending };
      const state = moviesSlice.reducer(initialState, action);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_LOADING);
    });

    it('should add movies when action is fulfilled', () => {
      const action = {
        type: fetchNextMovies.fulfilled,
        payload: fetchMoviesResponseMock,
      };
      const initialMovies = [
        {
          id: '12345',
          overview: 'This is a mock movie',
          poster_path: '/abc.jpg',
          release_date: '2010-01-01',
          title: 'Mock movie',
        },
      ];
      const state = moviesSlice.reducer(
        {
          ...initialState,
          movies: initialMovies,
        },
        action,
      );

      // The initial movies are concatenated with new movies
      expect(state.movies).toEqual([...initialMovies, ...fetchMoviesResponseMock.results]);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_SUCCESS);
      expect(state.page).toEqual(fetchMoviesResponseMock.page);
      expect(state.totalPages).toEqual(fetchMoviesResponseMock.total_pages);
    });

    it('should set error when action is rejected', () => {
      const action = { type: fetchNextMovies.rejected };
      const state = moviesSlice.reducer(initialState, action);
      expect(state.fetchStatus).toEqual(FETCH_STATUS_ERROR);
    });
  });
});
