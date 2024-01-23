import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('Watch Later movies page', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
    // Perhaps you need to mock the fetch API so that this test case receives movie data. The following line fails.
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
    })
    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })
    // There is expect function used after clicking watchLaterLink. Is this line necessary?
    await userEvent.click(watchLaterLink)

    // If the following lines serve no purpose, let's remove them
    // const watchLaterink = screen.getByTestId('watch-later-div')
    // await waitFor(() => {
    //     expect(watchLaterink).toBeInTheDocument()
    // })    
    // await userEvent.click(watchLaterink)
})