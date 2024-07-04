<template>
  <div style="background-color: rgb(28, 31, 34); width: 100%">
    <div v-if="!runningGame">
      <Carousel v-if="!loading" :bannerList="bannerList" />
      <Top v-if="showAll" :gameList="topGameList" @open="openGame($event)" />
      <Bingo v-if="showAll" :gameList="bingoGameList" @open="openGame($event)" />
      <div v-for="(gameList, category) in gameCategories" :key="gameList.id">
        <GameList :gameList="gameList" :category="category" @open="openGame($event)" />
      </div>
    </div>
    <div v-else>
      <SoftswissFrame v-if="softswissGameUrl" :gameUrl="softswissGameUrl" @exit="exitGame()" />
      <OrtizFrame v-else-if="ortizGameHTML" :html="ortizGameHTML" @exit="exitGame()" />
    </div>
  </div>
  <AuthApi />
</template>

<script>
import SoftSwissService from '@/service/SoftSwissService';
import OrtizService from '@/service/OrtizService.js';
import AuthApi from '@/components/api/AuthApi.vue';
import Carousel from '@/components/Carousel.vue';
import Top from '@/components/Top.vue';
import Bingo from '@/components/Bingo.vue';
import GameList from '@/components/GameList.vue';
import ConfigService from '@/service/ConfigService.js';
import GameService from '@/service/GameService.js';
import ENVIROMENT from '@/env';
import OrtizFrame from '@/components/OrtizFrame.vue';
import SoftswissFrame from '@/components/SoftswissFrame.vue';
import appStore from '@/stores/app';
import userStore from '@/stores/user';

export default {
  name: 'main-page',
  data() {
    return {
      appState: appStore(),
      userState: userStore(),
      loading: false,
      gameService: new GameService(),
      softswissService: new SoftSwissService(),
      ortizService: new OrtizService(),
      configService: new ConfigService(),
      gameCategories: [],
      topGameList: [],
      bingoGameList: [],
      bannerList: [],
      softswissGameUrl: '',
      ortizGameHTML: '',
      selectedCategory: '',
    };
  },
  components: {
    GameList,
    AuthApi,
    Carousel,
    Top,
    Bingo,
    OrtizFrame,
    SoftswissFrame,
  },
  methods: {
    async getData() {
      await this.getBanners();
      await this.getGameList();
      await this.getTopGameList();
      await this.getBingoGameList();
    },
    async getGameList() {
      try {
        let response;
        if (this.selectedCategory && this.selectedCategory !== 'all')
          response = await this.gameService.getAllSortedByCategory(this.selectedCategory);
        else response = await this.gameService.getAllSorted();
        this.gameCategories = response.data?.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async getTopGameList() {
      try {
        const response = await this.gameService.getTop();
        this.topGameList = response.data?.gameList;
      } catch (error) {
        console.log(error);
      }
    },
    async getBingoGameList() {
      try {
        const response = await this.gameService.getBingo();
        this.bingoGameList = response.data?.gameList;
      } catch (error) {
        console.log(error);
      }
    },
    async getBanners() {
      try {
        const response = await this.configService.getBanners();
        this.bannerList = response.data?.bannerList;
      } catch (error) {
        console.log(error);
      }
    },
    async openGame(game) {
      this.appState.setRunning(true);
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
        this.appState.setRunning(false);
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async openOrtizGame(gameId) {
      try {
        this.loading = true;
        const response = await this.ortizService.launch(gameId);
        this.ortizGameHTML = response.data;
      } catch (error) {
        this.appState.setRunning(false);
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    exitGame() {
      this.softswissGameUrl = '';
      this.ortizGameHTML = '';
      this.userState.renewToken();
      this.appState.setRunning(false);
    },
    getRouteParams() {
      this.selectedCategory = this.$route.params.category;
    },
  },
  computed: {
    runningGame() {
      return this.softswissGameUrl || this.ortizGameHTML;
    },
    showAll() {
      return this.selectedCategory === '' || this.selectedCategory === 'all';
    },
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.getRouteParams();
      this.getGameList().finally(() => (this.loading = false));
    },
  },
  created() {
    this.loading = true;
    this.getRouteParams();
    this.appState.setRunning(false);
    this.getData().finally(() => (this.loading = false));
  },
};
</script>
