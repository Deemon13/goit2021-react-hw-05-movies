import PropTypes from 'prop-types';

import {
  Container,
  ContainerMovie,
  Poster,
  ContainerMovieDetails,
  Title,
  Text,
  TitleOverview,
  TitleGenres,
} from './MovieCard.styled';

import NoImage from '../../images/NoImageAvailable.png';

export function MovieCard({ movie }) {
  return (
    <Container>
      <ContainerMovie>
        <Poster
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `${NoImage}`
          }
          alt={movie.title ? `Poster of ${movie.title}` : `Poster`}
        />
        <ContainerMovieDetails>
          <Title>{movie.title}</Title>
          <Text>User score: {movie.vote_average * 10 + '%'}</Text>
          <TitleOverview>Overview</TitleOverview>
          <Text>{movie.overview}</Text>
          <TitleGenres>Genres</TitleGenres>
          <Text>{movie.genres.map(genre => genre.name).join(' ')}</Text>
        </ContainerMovieDetails>
      </ContainerMovie>
    </Container>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};
