import { ref } from 'vue';

import getJSON from '@/includes/helpers';

const getTMDBData = () => {
  const baseURL = 'https://api.themoviedb.org/3/';
  const configURL = `${baseURL}configuration?api_key=${process.env.VUE_APP_API_KEY}`;

  const configData = ref(null);
  const baseImgURL = ref(null);
  const loading = ref(false);
  const err = ref(null);

  const movies = ref([]);

  const getConfig = async () => {
    err.value = null;
    loading.value = true;

    try {
      const data = await getJSON(configURL);

      baseImgURL.value = data.images.secure_base_url;
      configData.value = data.images;

      loading.value = false;
    } catch (error) {
      err.value = error.message;
      loading.value = false;
    }
  };

  const createResultObj = data => ({
    id: data.id,
    genres: data.genre_ids,
    title: data.original_title,
    img: `${baseImgURL.value}w342${data.poster_path}`,
    rating: data.vote_average ? Math.round(+data.vote_average * 10) : '00',

    date:
      data.release_date
        ?.split('-')
        .reverse()
        .join('.') ?? 'unknown date',
  });

  const getMovies = async (page = 1) => {
    err.value = null;
    loading.value = true;

    if (page === 1) movies.value = [];

    const url = `${baseURL}movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=${page}`;

    try {
      const data = await getJSON(url);
      data.results.forEach(movie => movies.value.push(createResultObj(movie)));
      loading.value = false;
    } catch (error) {
      err.value = error.message;
      loading.value = false;
    }
  };

  const getFiltered = async (page = 1, ...filters) => {
    err.value = null;
    loading.value = true;

    if (page === 1) movies.value = [];

    const genres = filters.join(',');

    const url = `${baseURL}discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genres}`;

    try {
      const data = await getJSON(url);
      data.results.forEach(movie => movies.value.push(createResultObj(movie)));
      loading.value = false;
    } catch (error) {
      err.value = error.message;
      loading.value = false;
    }
  };

  return { getConfig, getMovies, getFiltered, loading, err, movies };
};

export default getTMDBData;
