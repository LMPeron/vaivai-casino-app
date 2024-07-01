<template>
  <div v-if="!loading" style="background-color: rgb(28, 31, 34); width: 100%">
    <div v-if="!runningGame">
      <Carousel />
      <!-- <Top /> -->
      <div v-for="(gameList, category) in gameCategories" :key="gameList.id">
        <GameList :gameList="gameList" :category="category" @open="openGame($event)" />
      </div>
    </div>

    <div v-else>
      <GameFrame v-if="softswissGameUrl" :gameUrl="softswissGameUrl" @exit="exitGame()" />
      <GameFrame v-else-if="ortizGameHTML" :gameUrl="gameUrl" @exit="exitGame()" />
    </div>
  </div>
  <AuthApi />
</template>

<script>
import SoftSwissService from '@/service/SoftSwissService';
import OrtizService from '@/service/OrtizService.js';
import AuthApi from '@/components/api/AuthApi.vue';
import Carousel from '@/components/Carousel.vue';
// import Top from '@/components/Top.vue';
import GameList from '@/components/GameList.vue';
import GameService from '@/service/GameService.js';
import ENVIROMENT from '@/env';

export default {
  name: 'main-page',
  data() {
    return {
      loading: false,
      gameService: new GameService(),
      softswissService: new SoftSwissService(),
      ortizService: new OrtizService(),
      gameCategories: [],
      softswissGameUrl: '',
      ortizGameHTML: '',
    };
  },
  components: {
    GameList,
    AuthApi,
    Carousel,
    // Top,
  },
  methods: {
    async getData() {
      await this.getGameList();
    },
    async getGameList() {
      try {
        const response = await this.gameService.getAllSorted();
        this.gameCategories = response.data?.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async openGame(game) {
      if (game.Provider?.Platform?.reference === 'softswiss') await this.openSoftswissGame(game.id);
      else if (game.Provider?.Platform?.reference === 'ortiz') await this.openOrtizGame(game.id);
    },
    async openSoftswissGame(gameId) {
      try {
        this.loading = true;
        const isMobile = window.innerWidth <= 768;
        const response = await this.softswissService.open(gameId, isMobile ? 'mobile' : 'desktop', {
          deposit_url: ENVIROMENT.MAIN_APP_URL,
          return_url: ENVIROMENT.APP_URL,
        });
        this.softswissGameUrl = response.data.game_url;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async openOrtizGame(gameId) {
      try {
        this.loading = true;
        const response = await this.ortizService.launch(gameId);
        this.gameHTML = response.data;
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
  computed: {
    runningGame() {
      return this.gameUrl || this.gameHTML;
    },
  },
  created() {
    this.loading = true;
    this.getData().finally(() => (this.loading = false));
  },
};
</script>
