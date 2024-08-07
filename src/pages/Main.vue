<template>
  <div style="background-color: rgb(28, 31, 34); width: 100%">
    <v-overlay class="align-center justify-center" v-model="loading">
      <div>
        <img class="pl-2" :width="isMobile ? '80px' : '140px '" src="../assets/logo.png" alt="" />
      </div>
    </v-overlay>
    <div v-if="!appState.running">
      <Carousel :bannerList="bannerList" />
      <v-container>
        <v-row class="mb-4">
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
      </v-container>

      <!-- <Top v-if="showAll" :gameList="topGameList" @open="openGame($event)" />
      <Bingo v-if="showAll" :gameList="bingoGameList" @open="openGame($event)" /> -->
      <div v-for="(gameList, category) in gameCategories" :key="gameList.id">
        <GameList
          :gameList="gameList"
          :category="category"
          :filtered="filtered"
          @open="openGame($event)"
        />
      </div>
      <!-- <ProviderList v-if="showAll" :providerList="providerList" /> -->
    </div>
    <div v-else>
      <SoftswissFrame v-if="softswissGameUrl" :gameUrl="softswissGameUrl" @exit="exitGame()" />
      <OrtizFrame v-else-if="ortizGameHTML" :html="ortizGameHTML" @exit="exitGame()" />
    </div>
    <div v-if="!appState.running" class="mb-4" style="text-align: center">
      <v-btn v-if="!fullList" :loading="loading" variant="tonal" @click="getMoreGames()"
        ><v-icon style="font-size: smaller">mdi-plus</v-icon>
        <span class="pl-2" style="font-size: smaller">mais jogos</span>
      </v-btn>
    </div>
  </div>

  <AuthApi />
</template>

<script>
import AuthApi from '@/components/api/AuthApi.vue';
import Carousel from '@/components/Carousel.vue';
import Top from '@/components/Top.vue';
import Bingo from '@/components/Bingo.vue';
import GameList from '@/components/GameList.vue';
import ProviderList from '@/components/ProviderList.vue';
import OrtizFrame from '@/components/OrtizFrame.vue';
import SoftswissFrame from '@/components/SoftswissFrame.vue';
import SoftSwissService from '@/service/SoftSwissService';
import OrtizService from '@/service/OrtizService.js';
import ConfigService from '@/service/ConfigService.js';
import BannerService from '@/service/BannerService.js';
import GameService from '@/service/GameService.js';
import appStore from '@/stores/app';
import userStore from '@/stores/user';
import bannerStore from '@/stores/banner';
import { useToast } from 'vue-toastification';
import { useScroll } from '@vueuse/core';

export default {
  name: 'main-page',
  data() {
    return {
      appState: appStore(),
      userState: userStore(),
      bannerState: bannerStore(),
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
      providerList: [],
      softswissGameUrl: '',
      ortizGameHTML: '',
      selectedCategory: '',
      selectedProvider: '',
      search: '',
      searching: false,
    };
  },
  components: {
    GameList,
    ProviderList,
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
      // await this.getTopGameList();
      // await this.getBingoGameList();
      await this.getProviders();
    },
    async getGameList() {
      try {
        this.firstLoad = false;
        let response;
        if (this.selectedCategory && this.selectedCategory !== 'all') {
          response = await this.gameService.getAllSortedByCategory(this.selectedCategory, this.row);
          if (Object.keys(response.data?.categories).length === 0) this.fullList = true;
          this.filtered = true;
        } else if (this.selectedCategory === 'all') {
          response = await this.gameService.getAllSorted();
          this.filtered = false;
          this.fullList = true;
        } else if (this.selectedProvider) {
          response = await this.gameService.getAllSortedByProvider(this.selectedProvider, this.row);
          if (Object.keys(response.data?.categories).length === 0) this.fullList = true;
          this.filtered = true;
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
        if (this.bannerState.list.length > 0) {
          this.bannerList = this.bannerState.list;
          return;
        }
        const response = await this.bannerService.getAll();
        this.bannerList = response.data?.bannerList;
        this.bannerState.setList(this.bannerList);
      } catch (error) {
        console.log(error);
      }
    },
    async openGame(game) {
      if (!this.userState._token) {
        this.toast.error('Você precisa estar logado para jogar');
        return;
      }
      if (this.userState._user.Wallet.balance === 0) {
        this.toast.error('Saldo insuficiente para jogar. Por favor, faça um depósito.');
        return;
      }
      this.appState.setRunning(true);
      if (game.Game.Provider?.Platform?.reference === 'softswiss')
        await this.openSoftswissGame(game.Game.id);
      else if (game.Game.Provider?.Platform?.reference === 'ortiz')
        await this.openOrtizGame(game.Game.id);
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
    async getProviders() {
      try {
        const response = await this.gameService.getProviders();
        this.providerList = response.data?.providerList;
      } catch (error) {
        console.log(error);
      }
    },
    async getMoreGames() {
      this.loading = true;
      this.getGameList().finally(() => {
        this.loading = false;
      });
    },
    exitGame() {
      this.softswissGameUrl = '';
      this.ortizGameHTML = '';
      this.userState.renewToken();
      this.appState.setRunning(false);
    },
    getRouteParams() {
      if (this.$route.params.category) this.selectedCategory = this.$route.params.category;
      else if (this.$route.params.provider) this.selectedProvider = this.$route.params.provider;
    },
  },
  computed: {
    runningGame() {
      return this.softswissGameUrl || this.ortizGameHTML;
    },
    showAll() {
      return (
        (this.selectedCategory === '' || this.selectedCategory === 'all') &&
        this.selectedProvider === '' &&
        !this.searching
      );
    },
    scrolledBottom() {
      return this.scrolling.arrivedState.bottom;
    },
    loggedIn() {
      return this.userState._token;
    },
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.firstLoad = true;
      this.row = 0;
      this.getRouteParams();
      this.getGameList().finally(() => {
        this.loading = false;
      });
    },
    // scrolledBottom: {
    //   handler() {
    //     const y = this.scrolling.y;
    //     if (this.scrolling.arrivedState.bottom && !this.firstLoad && !this.fullList) {
    //       this.getGameList().then(() => {
    //         this.scrolling.y = y;
    //       });
    //     }
    //   },
    // },
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
