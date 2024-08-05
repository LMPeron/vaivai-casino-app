<template>
  <div class="container">
    <HeaderAdmin v-if="!appState.running && !loading" @toggle-sidebar="toggleSidebar" />
    <div class="layout">
      <Sidebar
        v-if="!appState.running"
        :sidebarCategories="sidebarCategories"
        :isAdmin="true"
        :isOpen="isSidebarOpen"
      />
      <router-view></router-view>
    </div>
    <AuthApi />
  </div>
</template>

<script>
import HeaderAdmin from '@/components/Admin/Header.vue';
import Footer from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AuthApi from '@/components/api/AuthApi.vue';
import appStore from '@/stores/app';
import userStore from '@/stores/user';

export default {
  name: 'Main',
  data() {
    return {
      userState: userStore(),
      appState: appStore(),
      loading: false,
      isSidebarOpen: false,
      sidebarCategories: {
        Dashboard: [
          {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            value: 'dashboard',
          },
        ],
        Relatorio: [
          {
            title: 'Relatório',
            icon: 'mdi-database',
            value: 'report',
          },
        ],
      },
    };
  },
  components: {
    HeaderAdmin,
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

  created() {
    if (this.userState?._user?.role > 6) {
      this.sidebarCategories.Cassino = [
        {
          title: 'Cassino',
          icon: 'mdi-slot-machine',
          value: 'casino',
        },
      ];
      this.sidebarCategories.Provedores = [
        {
          title: 'Provedores',
          icon: 'mdi-domain',
          value: 'provider',
        },
      ];
      this.sidebarCategories.Categorias = [
        {
          title: 'Categorias',
          icon: 'mdi-arrange-bring-forward',
          value: 'category',
        },
      ];
      this.sidebarCategories.Banner = [
        {
          title: 'Banner',
          icon: 'mdi-image-area',
          value: 'banner',
        },
      ];
      this.sidebarCategories.Log = [
        {
          title: 'Log',
          icon: 'mdi-file-chart-outline',
          value: 'log',
        },
      ];
    }
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

.sidebar {
  height: auto;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 20px; /* ou o espaço desejado */
}
</style>
