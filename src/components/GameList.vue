<template>
  <v-container class="fill-height">
    <v-row no-gutters>
      <v-col
        class="px-1 r-height"
        v-for="game in gameList"
        :key="game.id"
        cols="6"
        xs="6"
        sm="6"
        md="4"
        lg="2"
      >
        <Game :game="game" @open="$emit('open', $event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.r-height {
}
</style>
