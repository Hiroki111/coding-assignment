import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test/utils';
import App from './App';
import { fetchMoviesResponseMock } from './test/movies.mocks';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve(fetchMoviesResponseMock),
    ok: true,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('renders watch later link', async () => {
  await act(async () => renderWithProviders(<App />));

  const linkElement = screen.getByTestId('nav-watch-later');
  expect(linkElement).toBeInTheDocument();
});

it('should render movies', async () => {
  renderWithProviders(<App />);

  await waitFor(() => {
    fetchMoviesResponseMock.results.forEach((movie) => expect(screen.getAllByText(movie.title)[0]).toBeInTheDocument());
  });
});

it('renders watch later component', async () => {
  renderWithProviders(<App />);

  const user = userEvent.setup();
  await user.click(screen.getByTestId('nav-watch-later'));
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument();
});

it('renders starred component', async () => {
  renderWithProviders(<App />);

  const user = userEvent.setup();
  await user.click(screen.getByTestId('nav-starred'));
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument();
  });
});
