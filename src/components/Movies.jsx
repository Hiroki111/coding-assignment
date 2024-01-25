import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from './Movie';
import { fetchNextMovies } from '../data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';
import '../styles/movies.scss';

const Movies = ({ viewTrailer }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { movies, page } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const fetchData = () => {
    if (searchQuery) {
      dispatch(fetchNextMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page + 1}`));
    } else {
      dispatch(fetchNextMovies(`${ENDPOINT_DISCOVER}&page=${page + 1}`));
    }
  };

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchData}
      hasMore={true} // TODO: use the correct condition
      style={{ overflow: 'hidden' }} // NOTE: InfiniteScroll has embedded styles
    >
      <div data-testid="movies" className="movie-grid">
        {movies.map((movie) => {
          return <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Movies;
