<template>
  <div class="container">
    <Header v-if="!gameUrl && !loading" @toggle-sidebar="toggleSidebar" />
    <div class="layout">
      <Sidebar
        class="d-none d-md-block"
        :sidebarCategories="sidebarCategories"
        :isOpen="isSidebarOpen"
      />
      <router-view></router-view>
    </div>

    <AuthApi />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AuthApi from '@/components/api/AuthApi.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Main',
  data() {
    return {
      loading: false,

      isSidebarOpen: false,
      sidebarCategories: {
        Cassino: [
          {
            title: 'Favoritos',
            icon: 'mdi-star',
            value: 'favorites',
          },
          {
            title: 'Todos os jogos',
            icon: 'mdi-gamepad-square-outline',
            value: 'all',
          },
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
        // Esportes: [
        //   { id: 3, title: 'Zelda', icon: 'mdi-sword-cross' },
        //   {
        //     id: 4,
        //     title: 'Tomb Raider',
        //     icon: 'mdi-hat-fedora',
        //   },
        // ],
      },
    };
  },
  components: {
    Footer,
    Header,
    Sidebar,
    AuthApi,
  },
  methods: {
    toggleSidebar() {
      console.log('Sidebar toggle event received' + this.isSidebarOpen);
      this.isSidebarOpen = !this.isSidebarOpen;
    },
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
