<template>
  <GameList v-if="!gameUrl" :gameList="gameList" @open="openGame($event)" />
  <GameFrame v-else :gameUrl="gameUrl" />
</template>

<script>
import GameService from '@/service/GameService.js';
import userStore from '@/stores/user';
const VITE_APP_HOST_HTTP = import.meta.env.VITE_APP_HOST_HTTP;

export default {
  name: 'Main',
  data() {
    return {
      loading: false,
      gameService: new GameService(),
      gameList: [],
      loading: false,
      gameUrl: '',
      userStore: userStore(),
    };
  },
  methods: {
    async getGameList() {
      try {
        const response = await this.gameService.getAll();
        this.gameList = response.data?.gameList;
        console.log(this.gameList);
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      await this.getGameList();
    },
    async openGame(gameId) {
      try {
        const response = await this.gameService.open(gameId, 'desktop', {
          deposit_url: 'https://example.com/deposit',
          return_url: VITE_APP_HOST_HTTP,
        });
        this.gameUrl = response.data.game_url;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loading = true;
    this.getData().finally(() => (this.loading = false));
  },
};
</script>
