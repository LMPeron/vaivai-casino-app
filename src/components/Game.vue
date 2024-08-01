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
      <div
        v-if="errorImage"
        style="
          width: 251px;
          height: 135px;
          border-radius: 5px;
          background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%);
          align-content: center;
          text-align-last: center;
        "
      >
        <span style="color: white; font-size: x-large; font-weight: 700"> {{ game.title }} </span>
      </div>
      <img
        v-else
        style="width: 100%; height: 100%; border-radius: 5px"
        :src="
          game.Provider?.Platform?.reference === 'softswiss'
            ? `https://cdn.softswiss.net/i/s2/${game.Provider?.reference}/${
                game.identifier.split(':')[1] ? game.identifier.split(':')[1] : game.identifier
              }.png`
            : game.imgUrl
        "
        alt=""
        @error="onError"
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
import userStore from '@/stores/user';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      toast: useToast(),
      userState: userStore(),
      gameService: new GameService(),
      errorImage: false,
    };
  },
  methods: {
    async handleFavorite(gameId) {
      try {
        if (!this.userState._token) {
          this.toast.error('Você precisa estar logado para favoritar um jogo');
          return;
        }
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
    onError() {
      this.errorImage = true;
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
