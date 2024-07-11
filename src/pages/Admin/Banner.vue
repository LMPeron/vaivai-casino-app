<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <div class="flex mb-4">
      <v-row class="mb-6 mt-4">
        <v-col style="align-content: center">
          <span class="label">Banners</span>
        </v-col>
        <v-col class="button-col">
          <div>
            <v-btn
              style="
                margin-top: 0;
                float: inline-end;
                background-color: #4caf50;
                color: white;
                margin-left: 10px;
              "
              class="button"
              @click="savePriorityGames()"
            >
              Salvar
            </v-btn>
            <v-btn
              style="margin-top: 0; float: inline-end"
              class="button pl-2"
              @click="dialog = true"
            >
              Adicionar
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-card class="card">
        <draggable
          v-bind="dragOptions"
          class="dragArea flex flex-wrap w-full list-group pt-2 pr-4"
          :list="bannerList"
        >
          <div
            class="list-group-item bg-gray-300 rounded-md text-center"
            v-for="banner in bannerList"
            :key="banner.id"
          >
            <img style="width: 100%" :src="banner.url" alt="" />
          </div>
        </draggable>
      </v-card>
      <!-- <div style="text-align: end">
        <v-btn class="button" @click="savePriorityGames()">Salvar</v-btn>
      </div> -->
    </div>
  </div>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="Adicionar Banner">
      <v-card-text>
        <p>Adicione respectivamente as imagens</p>

        <p>Grande: {{ files.length >= 1 ? 'Sucesso' : '' }}</p>
        <p>Médio: {{ files.length >= 2 ? 'Sucesso' : '' }}</p>
        <p>Pequeno: {{ files.length >= 3 ? 'Sucesso' : '' }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" @click="exit()"></v-btn>
        <v-btn v-if="files.length < 3" text="Selecionar">
          <label style="cursor: pointer" for="file-upload" class="custom-file-upload">
            Selecionar
          </label>
          <input id="file-upload" type="file" accept=".jpg,.jpeg,.png" @change="onFileChange" />
        </v-btn>
        <v-btn v-else text="Salvar" @click="saveImages()"> </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      files: [],
      sizes: ['g', 'm', 'p'],
      loading: false,
      enabled: true,
      dragging: true,
      dialog: false,
      imageUrl: '',
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
        const response = await this.bannerService.getAllGSize();
        this.bannerList = response.data?.bannerList || [];
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao buscar banners');
      }
    },
    async savePriorityGames() {
      try {
        await this.bannerService.priority(this.bannerList);
        this.toast.success('Ordenação salva com sucesso');
      } catch (error) {
        this.toast.error('Erro ao salvar a ordenação');
        console.error(error);
      }
    },
    async saveImages() {
      try {
        let i = 0;
        for (const file of this.files) {
          await this.bannerService.upload(file, this.sizes[i]);
          i++;
        }
        this.toast.success('Banners salvos com sucesso');
        this.getBanners();
        this.exit();
      } catch (error) {
        this.toast.error('Erro ao salvar a ordenação');
        console.error(error);
      }
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.files.push(files[0]);
    },
    exit() {
      this.files = [];
      this.dialog = false;
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
input[type='file'] {
  display: none;
}
</style>
