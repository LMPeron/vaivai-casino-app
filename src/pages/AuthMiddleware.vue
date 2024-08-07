<template></template>

<script>
import userStore from '@/stores/user';
import ENVIROMENT from '@/env';
export default {
  name: 'AuthMiddleware',
  data() {
    return {
      userStore: userStore(),
    };
  },
  methods: {
    async getRouteParams() {
      try {
        const token = this.$route.params.auth;
        if (!token) window.location.replace('https://vaivaibet.com');
        this.userStore.setToken(token);
        await this.userStore.renewToken();
        this.$router.push('/game/all');
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRouteParams();
  },
};
</script>
