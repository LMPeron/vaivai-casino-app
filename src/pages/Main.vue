<template>
  <GameList :gameList="gameList" />
</template>

<script>
import GameService from '@/service/GameService.js';
export default {
  name: 'Main',
  data() {
    return {
      gameService: new GameService(),
      gameList: [],
      loading: false,
    };
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
  },

  created() {
    this.loading = true;
    this.getData().finally(() => (this.loading = false));
  },
};
</script>
