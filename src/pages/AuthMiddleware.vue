<template></template>

<script>
import userStore from '@/stores/user';

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
        debugger;
        const token = this.$route.params.auth;
        if (!token) window.location.replace('https://pitstopbet.com/?page=cassino');
        this.userStore.setToken(token);
        await this.userStore.renewToken();
        this.$router.push('/');
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
