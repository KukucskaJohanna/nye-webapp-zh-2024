import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  const { query = '', genre = [], orderBy = 'title', direction = 'ASC', offset = 0, limit = 12 } = params;

  try {
    const allMovies = await MovieService.getMovies();

    let filteredMovies = allMovies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(query.toLowerCase());
      const overviewMatch = movie.overview.toLowerCase().includes(query.toLowerCase());
      const queryMatch = titleMatch || overviewMatch;
      const genreMatch = genre.length === 0 || genre.some(g => movie.genres?.includes(g));
      return queryMatch && genreMatch;
    });

    filteredMovies.sort((a, b) => {
      if (orderBy === 'title') {
        return direction === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (orderBy === 'release_date') {
        return direction === 'ASC' ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime() : new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      } else if (orderBy === 'vote_average') {
        return direction === 'ASC' ? (a.vote_average || 0) - (b.vote_average || 0) : (b.vote_average || 0) - (a.vote_average || 0);
      }
      return 0;
    });

    const slicedMovies = filteredMovies.slice(offset, offset + limit);

    return {
      total: filteredMovies.length,
      movies: slicedMovies,
    };
  } catch (error) {
    return {
      total: 0,
      movies: [],
    };
  }}
