<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" width="900">
      <v-row>
        <v-containter v-for="game in gameList" :key="game.id">
          <v-col cols="12">
            <Game :game="game" @open="$emit('open', $event)" />
          </v-col>
        </v-containter>
      </v-row>
    </v-responsive>
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
