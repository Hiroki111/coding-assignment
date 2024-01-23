import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

it('renders watch later link', () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

// this fails: Unable to find an element with the text: Through the Eyes of Forrest Gump. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
// You'd need to mock fetch API so that the test case receives mock movies
it('search for movies', async () => {
  renderWithProviders(<App />)
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })
})

it('renders watch later component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})


it('renders starred component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })  
})
