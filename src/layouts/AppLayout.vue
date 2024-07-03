<template>
  <div class="container">
    <Header v-if="!appState.running && !loading" @toggle-sidebar="toggleSidebar" />
    <div class="layout">
      <Sidebar
        v-if="!appState.running"
        :sidebarCategories="sidebarCategories"
        :isOpen="isSidebarOpen"
      />
      <router-view></router-view>
    </div>
    <Footer />
    <AuthApi />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AuthApi from '@/components/api/AuthApi.vue';
import appStore from '@/stores/app';

export default {
  name: 'Main',
  data() {
    return {
      appState: appStore(),
      loading: false,
      isSidebarOpen: false,
      sidebarCategories: {
        Favoritos: [
          {
            title: 'Favoritos',
            icon: 'mdi-star',
            value: 'favorites',
          },
        ],
        'Todos os jogos': [
          {
            title: 'Todos os jogos',
            icon: 'mdi-gamepad-square-outline',
            value: 'all',
          },
        ],
        Cassino: [
          {
            title: 'Slots',
            icon: 'mdi-slot-machine',
            value: 'slots',
          },
          { title: 'Casual', icon: 'mdi-bomb', value: 'casual' },
          { title: 'Card', icon: 'mdi-cards-playing-outline', value: 'card' },
          { title: 'Lottery', icon: 'mdi-chess-king', value: 'lottery' },
          {
            title: 'Roulette',
            icon: 'mdi-dice-5',
            value: 'roulette',
          },
          { title: 'Crash', icon: 'mdi-poker-chip', value: 'crash' },
          { title: 'Craps', icon: 'mdi-flash', value: 'craps' },
        ],
      },
    };
  },
  components: {
    Header,
    Sidebar,
    AuthApi,
    Footer,
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    isMobile() {
      return window.innerWidth <= 768;
    },
  },

  mounted() {
    if (!this.isMobile()) {
      this.isSidebarOpen = true;
    }
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.layout {
  display: flex;
  flex: 1;
}

.sidebar {
  height: auto;
}

.main-content {
  flex: 1;
  overflow: auto; /* Adiciona scroll se necessário */
  height: 100vh;
}

.footer {
  bottom: 0;
  background-color: rgb(33, 33, 33);
  position: absolute;
}
</style>
