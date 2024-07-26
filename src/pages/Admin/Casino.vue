<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-overlay class="align-center justify-center" v-model="loading">
      <div>
        <img class="pl-2" width="140px" src="../../assets/logo.png" alt="" />
      </div>
      <span style="color: black; text-align: center">Carregando Jogos...</span>
    </v-overlay>
    <div class="flex mb-4">
      <v-select
        style="color: rgba(0, 0, 0, 0.87)"
        label="Categoria"
        v-model="selectedCategory"
        :items="Object.keys(categoryList)"
      ></v-select>
      <span class="label">Destaques</span>
      <v-card class="card">
        <draggable
          v-bind="dragOptions"
          class="dragArea flex flex-wrap w-full list-group"
          :list="priorityGameList"
        >
          <div
            class="list-group-item bg-gray-300 rounded-md text-center"
            v-for="game in priorityByCategory"
            :key="game.id"
            @dblclick="priorityGameList.splice(priorityGameList.indexOf(game), 1)"
          >
            <img
              :src="
                game.Provider?.Platform?.reference === 'softswiss'
                  ? `https://cdn.softswiss.net/i/s2/${game.Provider?.reference}/${
                      game.identifier.split(':')[1]
                        ? game.identifier.split(':')[1]
                        : game.identifier
                    }.png`
                  : game.imgUrl
              "
              alt=""
            />
          </div>
        </draggable>
      </v-card>
      <div style="text-align: end">
        <v-btn class="button" @click="savePriorityGames()">Salvar</v-btn>
      </div>
    </div>
    <div>
      <span class="label">Jogos</span>
      <v-card class="card pt-2">
        <div
          class="list-group-item bg-gray-300 rounded-md text-center"
          v-for="game in categoryList[selectedCategory] || gameList"
          :key="game.id"
          @dblclick="priorityGameList.push(game)"
        >
          <img
            :src="
              game.Provider?.Platform?.reference === 'softswiss'
                ? `https://cdn.softswiss.net/i/s2/${game.Provider?.reference}/${
                    game.identifier.split(':')[1] ? game.identifier.split(':')[1] : game.identifier
                  }.png`
                : game.imgUrl
            "
            alt=""
          />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import GameService from '@/service/GameService';
import AdminService from '@/service/AdminService';
import { VueDraggableNext } from 'vue-draggable-next';
import { useToast } from 'vue-toastification';

export default {
  name: 'Casino',
  data() {
    return {
      toast: useToast(),
      gameService: new GameService(),
      adminService: new AdminService(),
      gameList: [],
      priorityGameList: [],
      loading: false,
      enabled: true,
      dragging: true,
      selectedCategory: '',
    };
  },
  components: {
    draggable: VueDraggableNext,
  },
  methods: {
    async getGames() {
      try {
        const response = await this.gameService.getAllPriorities();
        this.gameList = response.data?.gameList?.map((game) => ({
          ...game,
          id: game.id,
          name: game.title,
        }));
        this.priorityGameList = response.data?.priorityGameList?.map((game) => ({
          ...game,
          id: game.id,
          name: game.title,
        }));
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao buscar os jogos');
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
    this.getGames().finally(() => {
      this.loading = false;
      this.selectedCategory = Object.keys(this.categoryList)[0];
    });
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    categoryList() {
      return this.gameList.reduce((acc, game) => {
        if (!acc[game.category]) acc[game.category] = [];
        acc[game.category].push(game);
        return acc;
      }, {});
    },
    priorityByCategory() {
      return this.priorityGameList.filter((game) => game.category === this.selectedCategory);
    },
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

.dragArea {
  display: flex;
  flex-wrap: wrap;
}

.list-group-item {
  flex: 0 1 calc(25% - 2em); /* Adjust the width as necessary */
  margin: 1em;
}
</style>
