<template>
  <div style="background-color: rgb(28, 31, 34); width: 100%">
    <div v-if="!appState.running">
      <Carousel :bannerList="bannerList" />

      <v-row class="mb-4 pl-4 pr-4">
        <v-col>
          <v-text-field
            v-model="search"
            label="Pesquisar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
          ></v-text-field>
        </v-col>
        <v-col style="align-content: center">
          <v-btn
            style="float: inline-start; background-color: rgb(1, 123, 39); color: white"
            class="button"
            :loading="loading"
            @click="getBySearch()"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>

      <Top v-if="showAll" :gameList="topGameList" @open="openGame($event)" />
      <Bingo v-if="showAll" :gameList="bingoGameList" @open="openGame($event)" />
      <div v-for="(gameList, category) in gameCategories" :key="gameList.id">
        <GameList
          :gameList="gameList"
          :category="category"
          :filtered="filtered"
          @open="openGame($event)"
        />
      </div>
    </div>
    <div v-else>
      <SoftswissFrame v-if="softswissGameUrl" :gameUrl="softswissGameUrl" @exit="exitGame()" />
      <OrtizFrame v-else-if="ortizGameHTML" :html="ortizGameHTML" @exit="exitGame()" />
    </div>
    <div v-if="!appState.running" class="mb-4" style="text-align: center">
      <v-btn v-if="!fullList" variant="tonal" @click="getGameList()"
        ><v-icon style="font-size: smaller">mdi-plus</v-icon>
        <span class="pl-2" style="font-size: smaller">mais jogos</span>
      </v-btn>
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
import BannerService from '@/service/BannerService.js';
import GameService from '@/service/GameService.js';
import ENVIROMENT from '@/env';
import OrtizFrame from '@/components/OrtizFrame.vue';
import SoftswissFrame from '@/components/SoftswissFrame.vue';
import appStore from '@/stores/app';
import userStore from '@/stores/user';
import { useToast } from 'vue-toastification';
import { useScroll } from '@vueuse/core';

export default {
  name: 'main-page',
  data() {
    return {
      appState: appStore(),
      userState: userStore(),
      scrolling: useScroll(window),
      toast: useToast(),
      row: 0,
      loading: false,
      firstLoad: true,
      filtered: false,
      fullList: false,
      gameService: new GameService(),
      softswissService: new SoftSwissService(),
      ortizService: new OrtizService(),
      configService: new ConfigService(),
      bannerService: new BannerService(),
      gameCategories: [],
      topGameList: [],
      bingoGameList: [],
      bannerList: [],
      softswissGameUrl: '',
      ortizGameHTML: '',
      selectedCategory: '',
      search: '',
      searching: false,
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
        this.loading = true;
        this.firstLoad = false;
        let response;
        if (this.selectedCategory && this.selectedCategory !== 'all') {
          response = await this.gameService.getAllSortedByCategory(this.selectedCategory, this.row);
          if (Object.keys(response.data?.categories).length === 0) this.fullList = true;
          this.filtered = true;
        } else {
          response = await this.gameService.getAllSorted();
          this.filtered = false;
        }
        if (this.row > 0)
          this.gameCategories[this.selectedCategory] = [
            ...this.gameCategories[this.selectedCategory],
            ...response.data?.categories[this.selectedCategory],
          ];
        else this.gameCategories = response.data?.categories;
        this.row = response.data?.row;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getBySearch() {
      try {
        this.loading = true;
        const response = await this.gameService.search(this.search);
        this.gameCategories = response.data?.categories;
        this.searching = true;
        this.fullList = true;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
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
        const response = await this.bannerService.getAll();
        this.bannerList = response.data?.bannerList;
      } catch (error) {
        console.log(error);
      }
    },
    async openGame(game) {
      if (this.userState._user.Wallet.balance === 0) {
        this.toast.error('Saldo insuficiente para jogar. Por favor, faça um depósito.');
        return;
      }
      this.appState.setRunning(true);
      if (game.Provider?.Platform?.reference === 'softswiss') await this.openSoftswissGame(game.id);
      else if (game.Provider?.Platform?.reference === 'ortiz') await this.openOrtizGame(game.id);
    },
    async openSoftswissGame(gameId) {
      try {
        this.loading = true;
        const isMobile = window.innerWidth <= 768;
        const response = await this.softswissService.open(gameId, isMobile ? 'mobile' : 'desktop', {
          deposit_url: 'https://vaivaibet.com/?page=cassino',
          return_url: 'https://vaivaibet.app/game/all',
        });
        this.softswissGameUrl = response.data.game_url;
      } catch (error) {
        this.appState.setRunning(false);
        this.toast.error('Não foi possível abrir o jogo. Tente novamente mais tarde');
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
        this.toast.error('Não foi possível abrir o jogo. Tente novamente mais tarde');
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
      return (this.selectedCategory === '' || this.selectedCategory === 'all') && !this.searching;
    },
    scrolledBottom() {
      return this.scrolling.arrivedState.bottom;
    },
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.firstLoad = true;
      this.row = 0;
      this.getRouteParams();
      this.getGameList();
    },
    scrolledBottom: {
      handler() {
        const y = this.scrolling.y;
        if (this.scrolling.arrivedState.bottom && !this.firstLoad && !this.fullList) {
          this.getGameList().then(() => {
            this.scrolling.y = y;
          });
        }
      },
    },
  },
  created() {
    this.loading = true;
    this.getRouteParams();
    this.appState.setRunning(false);
    this.getData().finally(() => {
      this.loading = false;
    });
  },
};
</script>
