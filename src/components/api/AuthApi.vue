<template>
  <div />
</template>

<script>
import userStore from '@/stores/user';

export default {
  data: () => ({
    timeout: null,
    user: userStore(),
  }),
  methods: {
    async renewToken() {
      try {
        // this.$router.push({ path: '/maintenance' });
        if (this.user.token) await this.user.renewToken();
      } catch (error) {
        console.log(error);
        this.user.logout();
        window.location.replace('https://pitstopbet.com/?page=cassino');
      }
    },
  },
  mounted() {
    this.renewToken();
    setInterval(this.renewToken, 1000 * 60);
  },
};
</script>

<style></style>
