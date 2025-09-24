export const API = 'https://api.themoviedb.org/3';
export const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
};
export const img = (path, size='w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '';
