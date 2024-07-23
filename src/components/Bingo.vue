<template>
  <v-container class="fill-height">
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <span class="category-label">
          Ortiz Gaming
          <!-- <img style="width: 22px; padding-left: 5px;" src="../assets/brasil.png"> </img>  -->
        </span>
      </v-col>
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
.category-label {
  text-transform: capitalize;
  font-weight: 700;
  font-size: x-large;
}
</style>
