<template>
  <div>
    <v-row
      class="mr-0 ml-0 primary-bg"
      style="
        background: linear-gradient(90.59deg, rgb(41, 89, 154) -2.73%, rgb(35, 43, 54) 73.29%);
        margin-left: 0px;
      "
    >
      <v-col style="margin-bottom: 0; margin: 0" cols="6">
        <div class="d-flex">
          <v-btn style="align-self: center" variant="text" icon @click="toggle()">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <div
            class="d-flex align-center"
            style="cursor: pointer"
            @click="redirect(ENVIROMENT.MAIN_APP_URL)"
          >
            <img
              class="pl-2"
              :width="isMobile ? '50px' : '100px '"
              src="../../assets/logo.png"
              alt=""
            />
          </div>
        </div>
      </v-col>

      <v-col cols="6" style="align-content: center; text-align: end">
        <div class="justify-end">
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
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="item.onClick"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userStore from '@/stores/user';
import ENVIROMENT from '@/env';

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
          onClick: () => window.location.replace(ENVIROMENT.MAIN_APP_URL),
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
