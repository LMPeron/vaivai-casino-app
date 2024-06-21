<template>
  <v-row
    class="mr-0 ml-0 primary-bg"
    style="
      background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%);
      margin-left: 0px;
    "
  >
    <v-col style="margin-bottom: 0; margin: 0" cols="4" xs="1" sm="4" md="4" lg="8">
      <div class="d-flex">
        <v-btn
          style="align-self: center"
          class="d-none d-md-block"
          variant="text"
          icon
          @click="toggle()"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div class="d-flex align-center">
          <img class="pl-2" width="100px" src="../assets/logo.png" alt="" />
        </div>
      </div>
    </v-col>

    <v-col cols="8" md="4" lg="4" sm="4" sx="2" style="align-content: center; text-align: end">
      <div v-if="!isAuth" class="d-flex gap-3 justify-end">
        <!-- <RegisterModal />
        <LoginModal /> -->
      </div>
      <div v-else class="justify-end">
        <span
          class="pr-4"
          style="color: white; font-weight: 800; font-size: larger; align-content: center"
          >R$ {{ userState.user.Wallet.balance.toFixed(2) }}</span
        >
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="rgba(255, 49, 49, 0.2)" v-bind="props" class="mr-2">
              <v-icon color="#FF3131" left>mdi-account</v-icon>
              <span class="pl-2" style="display: block"> {{ userState.user.name }} </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import userStore from '@/stores/user';
import ENVIROMENT from '@/env';
// import LoginModal from './modal/Login.vue';
// import RegisterModal from './modal/Register.vue';
// import depositModal from './modal/Deposit.vue';

export default {
  components: {
    // LoginModal,
    // RegisterModal,
    // depositModal,
  },
  data() {
    return {
      userState: userStore(),
      windowWidth: window.innerWidth,
      isAuth: true,
      items: [
        { title: 'Carteira' },
        { title: 'Indicações' },
        { title: 'Dados da Conta' },
        { title: 'Alterar senha' },
        { title: 'Suporte' },
        { title: 'Sair' },
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
      console.log('Emitting toggle-sidebar' + this.isMobile);
      this.$emit('toggle-sidebar');
    },
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 960;
    },
  },
};
</script>

<style>
.option {
  cursor: pointer;
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
