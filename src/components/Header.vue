<template>
  <v-row
    class="mr-0 ml-0 primary-bg"
    style="
      background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%);
      margin-left: 0px;
    "
  >
    <v-col style="margin-bottom: 0; margin: 0" cols="4" xs="1" sm="4" md="4" lg="2">
      <div class="d-flex">
        <v-btn style="align-self: center" variant="text" icon @click="toggle()">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div
          class="d-flex align-center"
          style="cursor: pointer"
          @click="redirect('https://pitstopbet.com/?page=cassino')"
        >
          <img class="pl-2" :width="isMobile ? '50px' : '100px '" src="../assets/logo.png" alt="" />
        </div>
      </div>
    </v-col>

    <v-col v-if="showHeader" class="headerOptions" cols="4" lg="6">
      <span
        class="pl-4"
        style="cursor: pointer; font-size: medium"
        @click="$router.push('/game/all')"
        >CASSINOS</span
      >
      <span
        class="pl-4"
        style="cursor: pointer; font-size: medium"
        @click="redirect('https://pitstopbet.com/?page=cassino')"
        >LOTERIA</span
      >
      <span class="pl-4" style="cursor: pointer; font-size: medium">ESPORTES</span>
    </v-col>

    <v-col cols="8" md="8" lg="4" sm="8" sx="2" style="align-content: center; text-align: end">
      <div class="justify-end">
        <span
          class="pr-2"
          style="color: white; font-weight: 800; font-size: larger; align-content: center"
          >R$
          {{ showBalance ? userState.user.Wallet.balance.toFixed(2).replace('.', ',') : '****' }}

          <v-icon
            @click="handleShowBalance()"
            v-if="showBalance"
            style="cursor: pointer"
            class="mr-4"
            color="white"
            left
            >mdi-eye</v-icon
          >
          <v-icon
            @click="handleShowBalance()"
            v-else
            style="cursor: pointer"
            class="mr-4"
            color="white"
            left
            >mdi-eye-off</v-icon
          >
        </span>

        <span v-if="!isMobile" class="mr-4"> {{ userState.user.email }} </span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              style="border: 0; border-radius: 20px; padding: 0 !important"
              color="white"
              v-bind="props"
              class="mr-2"
            >
              <v-icon color="rgb(1, 123, 39)" left>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title @click="item.onClick">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import userStore from '@/stores/user';

export default {
  data() {
    return {
      userState: userStore(),
      windowWidth: window.innerWidth,
      showBalance: false,
      items: [
        {
          title: 'Painel',
          onClick: () => {
            this.$router.push('/admin');
          },
        },
        {
          title: 'Sair',
          onClick: () => window.location.replace('https://pitstopbet.com/?page=cassino'),
        },
      ],
    };
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    toggle() {
      this.$emit('toggle-sidebar');
    },
    handleShowBalance() {
      this.showBalance = !this.showBalance;
    },
    redirect(url) {
      window.location.replace(url);
    },
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 960;
    },
    showHeader() {
      return this.windowWidth >= 1280;
    },
  },
};
</script>

<style>
.option {
  cursor: pointer;
}

.headerOptions {
  align-content: center;
}
</style>

<!-- <template>
  <v-row
    class="pl-4 pr-4 mr-0 ml-0"
    style="background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%)"
  >
    {{ windowHeight }}
    <v-col cols="1" style="align-content: center; display: flex">
      <img width="80px" src="../assets/logo.png" alt="" />
    </v-col>
    <v-col style="align-self: center" v-if="!isMobile">
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
      windowWidth: window.innerWidth,
    };
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    redirectMain() {
      window.location.replace(ENVIROMENT.MAIN_APP_URL);
    },
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768;
    },
  },
};
</script>

<style>
.option {
  cursor: pointer;
}
</style> -->
