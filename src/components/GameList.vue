<template>
  <v-container class="fill-height">
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <span class="category-label">
          {{ category }}
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
      <v-col v-if="!filtered" cols="12">
        <div>
          <v-btn @click="$router.push(`${category}`)" variant="tonal"
            ><v-icon style="font-size: smaller">mdi-plus</v-icon>
            <span class="pl-2" style="font-size: smaller">mais jogos</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Game from '@/components/Game.vue';

export default {
  data() {
    return {};
  },
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
    category: {
      type: String,
      default: () => '',
    },
    filtered: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    Game,
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
