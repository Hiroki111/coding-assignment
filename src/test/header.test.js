import React from 'react';
import debounce from 'lodash/debounce';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithProviders } from './utils';

const mockScrollTo = jest.fn();
const mockSetSearchParams = jest.fn();

jest.mock('lodash/debounce');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams({ search: 'test' }), mockSetSearchParams],
}));

describe('Header.jsx', () => {
  beforeEach(() => {
    Object.defineProperty(global.window, 'scrollTo', { value: mockScrollTo });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should scroll to the top and refresh the search params when home link is clicked', () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByTestId('home');

    fireEvent.click(homeLink);

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockSetSearchParams).not.toHaveBeenCalled();
    expect(location.pathname).toEqual('/');
  });

  it('should scroll to the top and set the search params when the search term is updated', async () => {
    debounce.mockImplementation((fn) => fn);
    renderWithProviders(<Header />);

    const searchInput = screen.getByTestId('search-movies');
    fireEvent.change(searchInput, { target: { value: 'new-search-term' } });

    await waitFor(() => expect(mockScrollTo).toHaveBeenCalledWith(0, 0));
    await waitFor(() =>
      expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams({ search: 'new-search-term' })),
    );
    await waitFor(() => expect(location.pathname).toEqual('/'));
  });
});
