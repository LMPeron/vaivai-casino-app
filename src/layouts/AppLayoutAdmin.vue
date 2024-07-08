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

export default {
  name: 'Main',
  data() {
    return {
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
        Dashboard: [
          {
            title: 'Dashboard',
            icon: 'mdi-view-dashboard',
            value: 'dashboard',
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
