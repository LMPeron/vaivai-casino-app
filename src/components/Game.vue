<template>
  <v-card
    style
    class="card"
    color="surface-variant"
    rel="noopener noreferrer"
    variant="text"
    @click="$emit('open', game.id)"
  >
    <img
      style="width: 100%; height: 100%; border-radius: 5px"
      :src="`https://cdn.softswiss.net/i/s2/${game.Provider.reference}/${game.identifier2}.png`"
      alt=""
    />
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.card {
  filter: drop-shadow(2px 4px 20px black) !important;
}

.card:hover {
  z-index: 2 !important;
  transform: scale(1.2);
  transform-origin: center;
  transition: transform 0.6s ease-in-out;
}
</style>
