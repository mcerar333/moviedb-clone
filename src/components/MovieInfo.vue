<template>
  <div class="movie">
    <img :src="movie.img" :alt="`${movie.title} image`" class="movie__img" />

    <div class="movie__rating">{{ movie.rating }}<span>%</span></div>

    <div class="movie__info">
      <h3 class="heading-3">{{ movie.title }}</h3>
      <p class="movie__date">{{ movie.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieInfo',

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>
