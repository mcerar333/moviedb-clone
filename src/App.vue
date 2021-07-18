<template>
  <h1 class="heading-1">Popular Movies</h1>

  <aside class="sidebar">
    <details class="sidebar__details">
      <summary class="sidebar__summary">
        <h2 class="heading-2">Filters</h2>
        <svg>
          <use href="/img/sprite.svg#icon-chevron-right"></use>
        </svg>
      </summary>

      <div class="sidebar__genres">
        <h4 class="heading-4 mb-sm">Genres</h4>

        <div v-if="errGenre" class="genres">
          <p class="error--genres">{{ errGenre }}</p>
        </div>

        <div v-else class="genres">
          <movie-genres
            v-for="genre in genres"
            :key="genre.id"
            :genre="genre"
            @selectGenre="selectGenre"
            @deselectGenre="deselectGenre"
          />
        </div>
      </div>
    </details>

    <button
      class="btn"
      :class="{ 'btn--disabled': btnDisabled }"
      :disabled="btnDisabled"
      @click="search"
    >
      Search
    </button>
  </aside>

  <section v-if="err" class="movies">
    <p class="error--movies">{{ err }}</p>
  </section>

  <section v-else class="movies">
    <movie-info v-for="movie in movies" :key="movie.id" :movie="movie" />

    <button
      v-if="movies.length"
      class="btn btn--load movies__load-more"
      ref="btnLoad"
      @click="fetchMore"
    >
      Load More
    </button>
  </section>
</template>

<script>
import { ref } from 'vue';
import { loadStart, loadEnd } from '@/includes/progressbar';

import MovieGenres from '@/components/MovieGenres.vue';
import MovieInfo from '@/components/MovieInfo.vue';
import getTMDBData from '@/hooks/getTMDBData';
import getGenres from '@/hooks/getGenres';

export default {
  name: 'App',
  components: { MovieGenres, MovieInfo },

  setup() {
    const page = ref(1);
    const btnLoad = ref(null);
    const filters = ref(false);
    const btnDisabled = ref(true);
    const selectedGenres = ref([]);

    const { err, movies, getConfig, getMovies, getFiltered } = getTMDBData();
    const { err: errGenre, genres, fetchGenres } = getGenres();

    (async () => {
      loadStart();
      await Promise.all([getConfig(), fetchGenres()]);
      await getMovies(page.value);
      loadEnd();
    })();

    const selectGenre = genre => {
      selectedGenres.value.push(genre);
      btnDisabled.value = false;
    };

    const deselectGenre = genre => {
      const index = selectedGenres.value.findIndex(gen => gen === genre);
      selectedGenres.value.splice(index, 1);
      btnDisabled.value = false;
    };

    const search = async () => {
      loadStart();
      btnDisabled.value = true;

      if (!selectedGenres.value.length) {
        filters.value = false;
        page.value = 1;
        await getMovies(1);
        loadEnd();
        return;
      }

      filters.value = true;
      page.value = 1;
      await getFiltered(1, ...selectedGenres.value);
      loadEnd();
    };

    const fetchMore = async () => {
      loadStart();
      page.value += 1;
      btnLoad.value.blur();

      if (!filters.value) {
        await getMovies(page.value);
        loadEnd();
        return;
      }

      await getFiltered(page.value, ...selectedGenres.value);
      loadEnd();
    };

    return {
      err,
      errGenre,
      genres,
      movies,
      btnLoad,
      btnDisabled,
      search,
      fetchMore,
      selectGenre,
      deselectGenre,
    };
  },
};
</script>
