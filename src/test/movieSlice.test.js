import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moviesSlice, {
  fetchMovies,
  fetchNextMovies,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_LOADING,
  FETCH_STATUS_ERROR,
} from '../data/moviesSlice';
import { fetchMoviesResponseMock } from './movies.mocks';

describe('MovieSlice', () => {
  const initialState = {
    movies: [],
    fetchStatus: '',
    page: 0,
    totalPages: Number.MAX_SAFE_INTEGER,
  };
  const mockStore = configureStore([thunk]);
  const MOCK_API_URL = 'https://example.com/movies';

  describe('Actions', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('fetchMovies', () => {
      it('should dispatch fetchMovies.fulfilled with correct payload on successful fetch', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve(fetchMoviesResponseMock),
          ok: true,
        });
        const store = mockStore({ movies: initialState });

        await store.dispatch(fetchMovies(MOCK_API_URL));

        const actions = store.getActions();

        expect(actions[0].type).toEqual(fetchMovies.pending.type);
        expect(actions[1].type).toEqual(fetchMovies.fulfilled.type);
        expect(actions[1].payload).toEqual(fetchMoviesResponseMock);
        expect(fetch).toHaveBeenCalledWith(MOCK_API_URL);
      });

      it('should dispatch fetchMovies.rejected with correct payload on failed fetch', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve({}),
          ok: false,
        });

        const store = mockStore({ movies: initialState });

        await store.dispatch(fetchMovies(MOCK_API_URL));

        const actions = store.getActions();

        expect(actions[0].type).toEqual(fetchMovies.pending.type);
        expect(actions[1].type).toEqual(fetchMovies.rejected.type);
        expect(actions[1].error.message).toEqual('It failed to load movies');
        expect(fetch).toHaveBeenCalledWith(MOCK_API_URL);
      });
    });

    describe('fetchNextMovies', () => {
      it('should dispatch fetchNextMovies.fulfilled with correct payload on successful fetch', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve(fetchMoviesResponseMock),
          ok: true,
        });

        const store = mockStore({ movies: initialState });

        await store.dispatch(fetchNextMovies(MOCK_API_URL));

        const actions = store.getActions();

        expect(actions[0].type).toEqual(fetchNextMovies.pending.type);
        expect(actions[1].type).toEqual(fetchNextMovies.fulfilled.type);
        expect(actions[1].payload).toEqual(fetchMoviesResponseMock);
        expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}&page=1`);
      });

      it('should dispatch fetchNextMovies.rejected with correct payload on failed fetch', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve({}),
          ok: false,
        });

        const store = mockStore({ movies: initialState });

        await store.dispatch(fetchNextMovies(MOCK_API_URL));

        const actions = store.getActions();

        expect(actions[0].type).toEqual(fetchNextMovies.pending.type);
        expect(actions[1].type).toEqual(fetchNextMovies.rejected.type);
        expect(actions[1].error.message).toEqual('It failed to load movies');
        expect(fetch).toHaveBeenCalledWith(`${MOCK_API_URL}&page=1`);
      });
    });
  });
  describe('Reducer', () => {
    describe('fetchMovies', () => {
      it('should set loading status true while action is pending', () => {
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
      it('should set loading status true while action is pending', () => {
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
});
