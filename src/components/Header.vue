<template>
  <v-row class="pl-4 pr-4" style="background-color: #ffffff">
    <v-col>
      <img width="100px" src="../assets/logo.png" alt="" />
    </v-col>
    <v-col style="align-content: center; text-align: end">
      <span style="color: black; padding-right: 10px"
        >R${{ userState.user.Wallet.balance.toFixed(2) }}</span
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
