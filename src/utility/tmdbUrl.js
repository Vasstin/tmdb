import axios from 'axios';

const tmdbUrl = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

export default tmdbUrl;