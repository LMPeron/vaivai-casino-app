<template>
  <div v-if="!loading" style="background-color: rgb(28, 31, 34); width: 100%">
    <div v-if="!gameUrl && !loading">
      <Carousel />
      <!-- <Top /> -->
      <div v-for="(gameList, category) in gameCategories" :key="gameList.id">
        <GameList :gameList="gameList" :category="category" @open="openGame($event)" />
      </div>
    </div>
    <GameFrame v-else :gameUrl="gameUrl" @exit="exitGame()" />
  </div>
  <AuthApi />
</template>

<script>
import Header from '@/components/Header.vue';
import AuthApi from '@/components/api/AuthApi.vue';
import Carousel from '@/components/Carousel.vue';
import Top from '@/components/Top.vue';
import GameList from '@/components/GameList.vue';
import GameService from '@/service/GameService.js';
import ENVIROMENT from '@/env';
import SoftSwissService from '@/service/SoftSwissService';

export default {
  name: 'main-page',
  data() {
    return {
      loading: false,
      gameService: new GameService(),
      softswissService: new SoftSwissService(),
      gameCategories: [],
      gameUrl: '',
    };
  },
  components: {
    GameList,
    Header,
    AuthApi,
    Carousel,
    Top,
  },
  methods: {
    async getGameList() {
      try {
        const response = await this.gameService.getAllSorted();
        this.gameCategories = response.data?.categories;
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
        const response = await this.softswissService.open(gameId, isMobile ? 'mobile' : 'desktop', {
          deposit_url: ENVIROMENT.MAIN_APP_URL,
          return_url: ENVIROMENT.APP_URL,
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
