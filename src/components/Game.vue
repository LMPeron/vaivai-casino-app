<template>
  <v-card
    width="250px"
    height="130px"
    class="py-4"
    color="surface-variant"
    rel="noopener noreferrer"
    rounded="lg"
    variant="text"
    :image="`https://cdn.softswiss.net/i/s2/${game.Provider.reference}/${game.identifier2}.png`"
    @click="$emit('open', game.id)"
  >
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
