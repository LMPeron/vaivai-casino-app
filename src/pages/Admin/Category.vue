<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-overlay class="align-center justify-center" v-model="loading">
      <div>
        <img class="pl-2" width="140px" src="../../assets/logo.png" alt="" />
      </div>
    </v-overlay>

    <v-row class="mt-4 mb-4" style="justify-content: end">
      <v-btn
        style="
          margin-top: 0;
          float: inline-end;
          background-color: rgb(41, 89, 154);
          color: white;
          margin-left: 10px;
        "
        @click="createCategoryDialog = true"
        class="button"
        :loading="loading"
      >
        adicionar categoria
      </v-btn>

      <v-btn
        style="
          margin-top: 0;
          float: inline-end;
          background-color: #4caf50;
          color: white;
          margin-left: 10px;
        "
        class="button"
        :loading="loading"
        @click="saveOrder(category)"
      >
        Salvar ordenação
      </v-btn>
    </v-row>
    <v-row style="justify-content: center">
      <v-col class="pl-0 pr-0">
        <v-card class="card pl-4 pr-4">
          <draggable
            v-bind="dragOptions"
            class="flex flex-wrap w-full list-group"
            :list="categoryList"
          >
            <div
              class="list-group-item bg-gray-300 rounded-md text-center pb-4"
              v-for="category in categoryList"
              :key="category.id"
            >
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-title :class="{ disabled: !category.active }"
                    >{{ category.name }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row class="pb-4 pt-4 mb-4" style="place-content: flex-end">
                      <v-col class="pt-0">
                        <v-text-field
                          v-model="category.name"
                          :counter="10"
                          label="Nome"
                          hide-details
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="pt-0">
                        <v-switch
                          class="switch"
                          :color="category.active ? 'success' : ''"
                          v-model="category.active"
                          inset
                        ></v-switch>
                      </v-col>
                      <v-btn
                        style="
                          margin-top: 0;
                          float: inline-end;
                          background-color: #c14141;
                          color: white;
                          margin-left: 10px;
                        "
                        class="button"
                        @click="
                          categoryIdDelete = category.id;
                          deleteCategoryDialog = true;
                        "
                        :loading="loading"
                      >
                        Remover
                      </v-btn>
                      <v-btn
                        style="
                          margin-top: 0;
                          float: inline-end;
                          background-color: rgb(41, 89, 154);
                          color: white;
                          margin-left: 10px;
                        "
                        class="button"
                        @click="
                          addGamesDialog = true;
                          categoryIdAddGame = category.id;
                        "
                        :loading="loading"
                      >
                        Adicionar jogos
                      </v-btn>

                      <v-btn
                        style="
                          margin-top: 0;
                          float: inline-end;
                          background-color: #4caf50;
                          color: white;
                          margin-left: 10px;
                        "
                        class="button"
                        :loading="loading"
                        @click="save(category)"
                      >
                        Salvar
                      </v-btn>
                    </v-row>

                    <draggable
                      v-bind="dragOptions"
                      :class="{ disabled: !category.active }"
                      class="dragArea flex flex-wrap w-full list-group"
                      :list="category.Games"
                    >
                      <div
                        class="list-group-item bg-gray-300 rounded-md text-center"
                        v-for="game in category.Games"
                        :key="game.id"
                      >
                        <span>
                          {{ game.Game?.title }}
                        </span>
                        <img
                          :class="{ disabled: !game.Game?.active }"
                          :src="
                            game.Game?.Provider?.Platform?.reference === 'softswiss'
                              ? `https://cdn.softswiss.net/i/s4/${game.Game?.Provider?.reference}/${
                                  game.Game?.identifier.split(':')[1]
                                    ? game.Game?.identifier.split(':')[1]
                                    : game.Game?.identifier
                                }.png`
                              : game.Game?.imgUrl
                          "
                          alt=""
                        />
                        <v-switch
                          class="switch"
                          :color="game.Game?.active ? 'success' : ''"
                          v-model="game.Game.active"
                        ></v-switch>
                      </div>
                    </draggable>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-dialog v-model="createCategoryDialog" max-width="500">
    <v-card title="Nova Categoria">
      <v-card-text>
        <v-text-field v-model="newCategoryName" label="Nome" hide-details required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" :loading="loading" @click="exit()"></v-btn>
        <v-btn text="Salvar" :loading="loading" @click="create()"> </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="deleteCategoryDialog" max-width="500">
    <v-card title="Nova Categoria">
      <v-card-text> Realmente deseja deletar a categoria? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" :loading="loading" @click="deleteCategoryDialog = false"></v-btn>
        <v-btn text="Deletar" :loading="loading" @click="del()"> </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="addGamesDialog" min-width="1000">
    <v-card title="Adicionar Jogos">
      <v-card-text>
        <v-row class="pb-4 pt-4 mb-4" style="place-content: flex-end">
          <v-col class="pt-0" cols="9">
            <v-text-field v-model="searchText" label="Buscar" hide-details required></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              style="background-color: rgb(41, 89, 154)"
              text="Buscar"
              :loading="loadingSearch"
              :disabled="loadingSearch"
              @click="search()"
            ></v-btn>
          </v-col>
        </v-row>

        <v-btn-toggle
          style="display: contents"
          v-model="addingGameList"
          background-color="primary"
          dark
          multiple
        >
          <v-btn v-for="game in gameOptions" :key="game.id" :value="game">
            <div class="list-group-item bg-gray-300 rounded-md text-center">
              <span style="display: block">
                {{ game.title }}
              </span>
              <img
                :class="{ disabled: !game.active }"
                :src="
                  game.Provider?.Platform?.reference === 'softswiss'
                    ? `https://cdn.softswiss.net/i/s4/${game.Provider?.reference}/${
                        game.identifier.split(':')[1]
                          ? game.identifier.split(':')[1]
                          : game.identifier
                      }.png`
                    : game.imgUrl
                "
                alt=""
              />
            </div>
          </v-btn>
        </v-btn-toggle>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Cancelar"
          :loading="loading"
          :disabled="loading"
          @click="deleteCategoryDialog = false"
        ></v-btn>
        <v-btn text="Adicionar" :loading="loading" :disabled="loading" @click="addGames()"> </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import CategoryService from '@/service/CategoryService';
import GameService from '@/service/GameService';
import { useToast } from 'vue-toastification';

export default {
  name: 'Category',

  data() {
    return {
      toast: useToast(),
      categoryService: new CategoryService(),
      gameService: new GameService(),
      categoryList: [],
      addingGameList: [],
      loading: false,
      loadingSearch: false,
      createCategoryDialog: false,
      deleteCategoryDialog: false,
      addGamesDialog: false,
      newCategoryName: '',
      categoryIdDelete: '',
      categoryIdAddGame: '',
      gameOptions: [],
      searchText: '',
    };
  },
  methods: {
    async getCategories() {
      try {
        this.loading = true;
        const response = await this.categoryService.getAll();
        this.categoryList = response.data?.categoryList;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async save(category) {
      try {
        this.loading = true;
        await this.categoryService.update(category);
        this.toast.success('Categorias salvas com sucesso');
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao salvar categorias');
      } finally {
        this.loading = false;
      }
    },
    async del() {
      try {
        this.loading = true;
        await this.categoryService.delete(this.categoryIdDelete);
        await this.getCategories();
        this.toast.success('Categoria deletada com sucesso');
        this.deleteCategoryDialog = false;
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao deletar categoria');
      } finally {
        this.loading = false;
      }
    },
    async create() {
      try {
        this.loading = true;
        await this.categoryService.create(this.newCategoryName);
        await this.getCategories();
        this.toast.success('Categoria criada com sucesso');
        this.exit();
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao criar categoria');
      } finally {
        this.loading = false;
      }
    },
    async saveOrder() {
      try {
        this.loading = true;
        const categories = this.categoryList.map((category) => category.id);
        await this.categoryService.saveOrder(categories);
        this.toast.success('Ordem salva com sucesso');
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao salvar ordem');
      } finally {
        this.loading = false;
      }
    },
    async search() {
      try {
        this.loadingSearch = true;
        const response = await this.gameService.search(this.searchText);
        this.gameOptions = response.data?.gameList;
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao buscar jogos');
      } finally {
        this.loadingSearch = false;
      }
    },
    addGames() {
      this.addingGameList.forEach((game) => {
        this.categoryList.forEach((category) => {
          if (category.id === this.categoryIdAddGame) {
            category.Games.push({ Game: game });
          }
        });
      });
      this.addGamesDialog = false;
    },
    exit() {
      this.createCategoryDialog = false;
      this.newCategoryName = '';
    },
  },
  created() {
    this.getCategories();
  },
  components: {
    draggable: VueDraggableNext,
  },
};
</script>

<style scoped>
.card {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
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

.table-value {
  text-align: end;
}

.switch {
  align-items: flex-start;
  opacity: 2;
}

.v-input__details {
  display: none !important;
}

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

.disabled {
  opacity: 0.4;
}
</style>
