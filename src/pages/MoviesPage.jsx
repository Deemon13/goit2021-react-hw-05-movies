import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from 'components/Loader';
import { MoviesList } from 'components/MoviesList';
import { SearchBar } from 'components/SearchBar';
import { getMovieByName } from 'services/get-movies';

import { MoreMoviesBtn } from './styledPages/HomePage.styled';
import { Title } from './styledPages/MoviesPage.styled';

export function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchDone, setsearchDone] = useState(false);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      async function getSearchedMovie() {
        setLoading(true);
        try {
          const movies = await getMovieByName(query, page);
          if (movies.results.length === 0) {
            alert(`There is no movie with query ${query}`);
            return;
          }
          setMovies(prevState => [...prevState, ...movies.results]);
          setsearchDone(true);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getSearchedMovie();
    }
  }, [query, page]);

  function handleSubmit(event) {
    event.preventDefault();
    const queryInput = event.currentTarget.elements.search.value;
    if (queryInput === '') {
      alert('Empty input!');
      return;
    }
    setSearchParams({ query: queryInput.trim() });
  }

  return (
    <main>
      <SearchBar onSubmitForm={handleSubmit} />
      {searchDone && <Title>Search results</Title>}
      {loading && <Loader />}

      {movies.length > 0 && <MoviesList items={movies} />}

      {searchDone && (
        <MoreMoviesBtn type="button" onClick={() => setPage(page => page + 1)}>
          More movies
        </MoreMoviesBtn>
      )}
    </main>
  );
}
