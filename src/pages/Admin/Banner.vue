<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <div class="flex mb-4">
      <span class="label">Banners</span>
      <v-card class="card">
        <draggable
          v-bind="dragOptions"
          class="dragArea flex flex-wrap w-full list-group"
          :list="bannerList"
        >
          <div
            class="list-group-item bg-gray-300 rounded-md text-center"
            v-for="banner in bannerList"
            :key="banner.id"
          >
            <img :src="banner.url" alt="" />
          </div>
        </draggable>
      </v-card>
      <!-- <div style="text-align: end">
        <v-btn class="button" @click="savePriorityGames()">Salvar</v-btn>
      </div> -->
    </div>
  </div>
</template>

<script>
import AdminService from '@/service/AdminService';
import BannerService from '@/service/BannerService';
import { VueDraggableNext } from 'vue-draggable-next';
import { useToast } from 'vue-toastification';

export default {
  name: 'Banner',
  data() {
    return {
      toast: useToast(),
      bannerService: new BannerService(),
      bannerList: [],
      loading: false,
      enabled: true,
      dragging: true,
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    };
  },
  components: {
    draggable: VueDraggableNext,
  },
  methods: {
    async getBanners() {
      try {
        const response = await this.bannerService.getAll();
        this.bannerList = response.data?.bannerList || [];
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao buscar banners');
      }
    },
    async savePriorityGames() {
      try {
        await this.adminService.savePriorityGames(this.priorityByCategory);
        this.toast.success('Ordenação salva com sucesso');
      } catch (error) {
        this.toast.error('Erro ao salvar a ordenação');
        console.error(error);
      }
    },
  },
  async mounted() {
    this.loading = true;
    this.getBanners().finally(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  margin: 0 !important;
  display: inline !important;
  flex: 0 !important;
  margin: 0.5em !important;
}
.list-group-item i {
  cursor: pointer;
}

.card {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
}

.card:hover {
  z-index: 2 !important;
  transform: none;
  transform-origin: center;
  transition: transform 0.6s ease-in-out;
}

.label {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
}

.button-col {
  text-align-last: center;
}

.button {
  width: 200px;
}

.list-group-item {
  flex: 0 1 calc(25% - 2em); /* Adjust the width as necessary */
  margin: 1em;
}
</style>
