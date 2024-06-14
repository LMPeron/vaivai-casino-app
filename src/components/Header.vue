<template>
  <v-row style="background-color: #ffffff">
    <v-col>
      <img cols="4" sm width="100px" src="../assets/logo.png" alt="" />
      <span style="color: black">{{ userState.user.Wallet.balance }}</span>
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
};
</script>

<style></style>
