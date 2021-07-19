<template>
  <div class="movie">
    <img :src="movie.img" :alt="`${movie.title} image`" class="movie__img" />

    <div class="movie__rating">{{ movie.rating }}<span>%</span></div>

    <div class="movie__info">
      <h4 class="heading-4">{{ movie.title }}</h4>
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
