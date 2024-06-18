<template>
  <Header v-if="!gameUrl && !loading" />

  
  <div v-if="!loading" style="background-color: rgb(28, 31, 34)">
    <div v-if="!gameUrl && !loading">
      <v-row no-gutters>
        <v-col cols="12">
          <v-carousel
            hide-delimiter-background
            show-arrows="hover"
            style="height: 100%; width: 100%"
          >
            <v-carousel-item src="../assets/banner-1.jpg" cover position="top"></v-carousel-item>
            <v-carousel-item src="../assets/banner-2.jpg" cover position="top"></v-carousel-item>
            <v-carousel-item src="../assets/banner-3.jpg" cover position="top"></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      

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
import GameList from '@/components/GameList.vue';
import GameService from '@/service/GameService.js';
import userStore from '@/stores/user';
import ENVIROMENT from '@/env';

export default {
  name: 'Main',
  data() {
    return {
      loading: false,
      gameService: new GameService(),
      gameCategories: [],
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
        const response = await this.gameService.open(gameId, isMobile ? 'mobile' : 'desktop', {
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
