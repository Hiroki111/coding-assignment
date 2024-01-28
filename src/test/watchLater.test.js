import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './utils';
import App from '../App';

beforeEach(() => {
  Object.defineProperty(global.window, 'scrollTo', { value: jest.fn() });
});

afterEach(() => {
  jest.clearAllMocks();
});

it('should render watch later links', async () => {
  renderWithProviders(<App />);

  const watchLaterLinks = await screen.findAllByTestId('watch-later');
  const firstWatchLaterLink = watchLaterLinks[0];
  await waitFor(() => {
    expect(firstWatchLaterLink).toBeInTheDocument();
  });
});
