import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

const App = () => {

  const state = useSelector((state) => state)
  const { movies } = state  
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  // isOpen is unused. Let's remove it
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()
  
  // This is unused too
  const closeModal = () => setOpen(false)
  
  // What this function is meant to?
  // If this will be used in the future, I think it's helpful to leave a comment
  // and explain the future usage of it
  const closeCard = () => {

  }

  const getSearchResults = (query) => {
    if (query !== '') {
      // I'd prefer
      // dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`))
      // (although this is just my personal preference)
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    // setOpen(true) is called in the next line regardless of !videoKey, so this line is probably redundant
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    // What if the Promise of this fetch API is rejected?
    // Isn't it necessary to implement error handling logic?
    const videoData = await fetch(URL)
      .then((response) => response.json())

      // videoData?.videos?.results?.length -> I'd prefer this
    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      // I take it that trailer must have key field. Otherwise, trailer?.key should be used as the condition
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      {/* Header.jsx doesn't seem to have searchParams and setSearchParams props.*/}
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          // There is already a scss file for this App.js (app.scss).
          // I'd set the style of this element with the scss to make things more consistent
          <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
