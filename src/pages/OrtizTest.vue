<template>
  <button v-if="!gameHTML" @click="launch()">test</button>
  <OrtizFrame v-else :html="gameHTML" />
  <AuthApi />
</template>

<script>
import OrtizService from '@/service/OrtizService.js';
import OrtizFrame from '@/components/OrtizFrame.vue';
import AuthApi from '@/components/api/AuthApi.vue';

export default {
  name: 'ortiz-test',
  data() {
    return {
      ortizService: new OrtizService(),
      loading: false,
      gameHTML: '',
    };
  },
  async mounted() {
    await this.launch();
  },
  methods: {
    async launch() {
      try {
        const response = await this.ortizService.launch();
        this.gameHTML = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    OrtizFrame,
    AuthApi,
  },
};
</script>
