import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { fetchMovies } from '../data/moviesSlice';
import '../styles/header.scss';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants';

const SEARCH_DEBOUNCE_RATE = 250;

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const { starredMovies } = useSelector((state) => state.starred);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchMovies = (query) => {
    window.scrollTo(0, 0);
    navigate('/');
    if (!query) {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    } else {
      setSearchParams(createSearchParams({ search: query }));
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchMoviesDebounced = useCallback(debounce(searchMovies, SEARCH_DEBOUNCE_RATE), []);

  const handleClickHome = () => {
    searchMovies('');
    setSearchTerm('');
  };

  const handleChangeSearchTerm = (e) => {
    searchMoviesDebounced(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleClickHome}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav" data-testid="nav-watch-later">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <span className="search-link">
          <input
            type="search"
            data-testid="search-movies"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </span>
      </div>
    </header>
  );
};

export default Header;
