<template>
  <button
    class="btn btn--outline"
    :class="{ active: isActive }"
    ref="btnGenres"
    @click="selectGenre"
  >
    {{ genre.name }}
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MovieGenres',

  props: {
    genre: {
      type: Object,
      required: true,
    },
  },
  emits: ['selectGenre', 'deselectGenre'],

  setup(props, { emit }) {
    const btnGenres = ref(null);
    const isActive = ref(false);

    const selectGenre = () => {
      isActive.value = !isActive.value;

      if (isActive.value) {
        emit('selectGenre', props.genre.id);
        return;
      }

      emit('deselectGenre', props.genre.id);
      btnGenres.value.blur();
    };

    return { selectGenre, btnGenres, isActive };
  },
};
</script>
