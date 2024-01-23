import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('movies starred and saved to watch later', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    // This fails: Unable to find an element with the text: Through the Eyes of Forrest Gump. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
    // I can see that App component uses fetch API. Perhaps you need to mock it so that this test case receives movie data
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const starMovieLink = screen.getAllByTestId('starred-link')[0]
    await waitFor(() => {
        expect(starMovieLink).toBeInTheDocument()
    })
    await userEvent.click(starMovieLink)
    await waitFor(() => {
      expect(screen.getByTestId('star-fill')).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
    })

    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    await userEvent.click(watchLaterLink)
    await waitFor(() => {
      expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})