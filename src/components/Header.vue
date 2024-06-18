<template>
  <v-row
    class="pl-4 pr-4 mr-0 ml-0"
    style="background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%)"
  >
    <v-col cols="1" style="align-content: center; display: flex">
      <img width="80px" src="../assets/logo.png" alt="" />
    </v-col>
    <v-col style="align-self: center">
      <span class="pr-2 option"> CASSINOS </span>
      <span class="pr-2 option" @click="redirectMain()"> LOTERIA </span>
      <span class="pr-2 option"> AO VIVO </span>
    </v-col>
    <v-col style="align-content: center; text-align: end">
      <span style="display: block"> {{ userState.user.name }} </span>
      <span style="color: white; font-weight: 800; font-size: larger"
        >R$ {{ userState.user.Wallet.balance.toFixed(2) }}</span
      >
    </v-col>
  </v-row>
</template>

<script>
import userStore from '@/stores/user';
import ENVIROMENT from '@/env';

export default {
  data() {
    return {
      userState: userStore(),
    };
  },
  methods: {
    redirectMain() {
      window.location.replace(ENVIROMENT.MAIN_APP_URL);
    },
  },
};
</script>

<style>
.option {
  cursor: pointer;
}
</style>
