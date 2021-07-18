import { ref } from 'vue';

import getJSON from '@/includes/helpers';

const getGenres = () => {
  const baseURL = 'https://api.themoviedb.org/3/';
  const genresURL = `${baseURL}genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`;

  const err = ref(null);
  const loading = ref(false);

  const genres = ref([]);

  const fetchGenres = async () => {
    err.value = null;
    loading.value = true;

    try {
      const data = await getJSON(genresURL);
      data.genres.forEach(genre => genres.value.push(genre));
      loading.value = false;
    } catch (error) {
      err.value = error.message;
      loading.value = false;
    }
  };

  return { fetchGenres, loading, err, genres };
};

export default getGenres;
