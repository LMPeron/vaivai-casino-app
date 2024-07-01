<template>
  <div class="mb-4">
    <v-card
      style="margin-bottom: 0"
      class="card"
      color="surface-variant"
      rel="noopener noreferrer"
      variant="text"
      @click="$emit('open', game)"
    >
      <img
        style="width: 100%; height: 100%; border-radius: 5px"
        :src="
          game.Provider?.Platform?.reference === 'softswiss'
            ? `https://cdn.softswiss.net/i/s2/${game.Provider?.reference}/${game.identifier2}.png`
            : game.imgUrl
        "
        alt=""
      />
    </v-card>
    <span style="color: rgb(182, 182, 198); font-size: small">{{ game.title }}</span>
    <span
      class="favorite-btn pr-2"
      @click="handleFavorite(game.id)"
      :class="{ favorited: favorited }"
    >
      <v-icon v-if="favorited" small>mdi-star</v-icon>
      <v-icon v-else small>mdi-star-outline</v-icon>
    </span>
  </div>
</template>

<script>
import GameService from '@/service/GameService.js';
export default {
  data() {
    return {
      gameService: new GameService(),
    };
  },
  methods: {
    async handleFavorite(gameId) {
      try {
        if (!this.favorited) {
          await this.gameService.favorite(gameId);
          this.game.Favorited.push({});
        } else {
          await this.gameService.unfavorite(gameId);
          this.game.Favorited = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    favorited() {
      return this.game.Favorited.length > 0;
    },
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
.favorite-btn {
  float: inline-end;
  font-size: x-small;
  font-weight: bolder;
  cursor: pointer;
}

.favorited {
  color: rgb(213, 216, 8);
}

.card {
  background-color: transparent;
  filter: drop-shadow(1px 1px 3px rgb(46, 46, 46)) !important;
}

@media screen and (min-width: 960px) {
  .card:hover {
    z-index: 2 !important;
    transform: scale(1.2);
    transform-origin: center;
    transition: transform 0.6s ease-in-out;
  }
}
</style>
