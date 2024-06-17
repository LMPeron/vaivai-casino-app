<template>
  <Header v-if="!gameUrl && !loading" />
  <div v-if="!loading" style="background-color: white">
    <GameList v-if="!gameUrl" :gameList="gameList" @open="openGame($event)" />
    <GameFrame v-else :gameUrl="gameUrl" @exit="exitGame()" />
  </div>
  <AuthApi />
</template>

<script>
import Header from '@/components/Header.vue';
import AuthApi from '@/components/api/AuthApi.vue';
import GameList from '@/components/GameList.vue';
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
  components: {
    GameList,
    Header,
    AuthApi,
  },
  methods: {
    async getGameList() {
      try {
        const response = await this.gameService.getAll();
        this.gameList = response.data?.gameList;
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      await this.getGameList();
    },

    async openGame(gameId) {
      try {
        this.loading = true;
        const isMobile = window.innerWidth <= 768;
        const response = await this.gameService.open(gameId, isMobile ? 'mobile' : 'desktop', {
          deposit_url: 'https://example.com/deposit',
          return_url: VITE_APP_HOST_HTTP,
        });
        this.gameUrl = response.data.game_url;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    exitGame() {
      this.gameUrl = '';
    },
  },
  created() {
    this.loading = true;
    this.getData().finally(() => (this.loading = false));
  },
};
</script>
