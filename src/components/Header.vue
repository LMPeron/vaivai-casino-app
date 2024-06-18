<template>
  <v-row
    class="pl-4 pr-4"
    style="background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%)"
  >
    <v-col>
      <img width="100px" src="../assets/logo.png" alt="" />
    </v-col>
    <v-col style="align-content: center; text-align: end">
      <span style="color: white; padding-right: 20px; font-weight: 800; font-size: larger"
        >R$ {{ userState.user.Wallet.balance.toFixed(2) }}</span
      >
      <v-btn @click="logout"> Sair </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import userStore from '@/stores/user';

export default {
  data() {
    return {
      userState: userStore(),
    };
  },
  methods: {
    logout() {
      window.location.replace('https://pitstopbet.com/?page=cassino');
    },
  },
};
</script>

<style></style>
