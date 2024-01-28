import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';
import { fetchMoviesResponseMock } from './movies.mocks';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve(fetchMoviesResponseMock),
    ok: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should star a movie when its starred link is clicked', async () => {
  renderWithProviders(<App />);

  expect(screen.queryByTestId('star-fill')).not.toBeInTheDocument();
  expect(screen.queryByTestId('unstar-link')).not.toBeInTheDocument();

  const starMovieLink = await screen.findAllByTestId('starred-link');
  const firstStarMovieLink = starMovieLink[0];
  await userEvent.click(firstStarMovieLink);
  expect(screen.getByTestId('star-fill')).toBeInTheDocument();
  expect(screen.getByTestId('unstar-link')).toBeInTheDocument();
});

it('should save a movie to watch later list when its watch later link is clicked', async () => {
  renderWithProviders(<App />);

  expect(screen.queryByTestId('remove-watch-later')).not.toBeInTheDocument();

  const watchLaterLinks = await screen.findAllByTestId('watch-later');
  const firstWatchLaterLink = watchLaterLinks[0];
  await userEvent.click(firstWatchLaterLink);
  expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument();
});
