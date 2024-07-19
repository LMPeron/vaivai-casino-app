<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row class="mb-4">
      <v-col cols="12">
        <span style="color: rgba(0, 0, 0, 0.87); font-weight: 500">Relatórios</span>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getByGames()"> Jogos </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getByProviders()"> Provedores </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getByPlayers()"> Jogadores </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getByScalpers()"> Cambistas </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getByManagers()"> Gerente </v-btn>
      </v-col>
    </v-row>

    <v-row style="justify-content: center">
      <v-col cols="12"> </v-col>

      <v-col class="pl-0 pr-0">
        <v-card>
          <template v-slot:text>
            <v-row style="border-radius: 10px">
              <v-col class="pl-4 pt-8">
                <v-date-input
                  v-model="range"
                  label="Selecionar período"
                  max-width="368"
                  multiple="range"
                ></v-date-input>
              </v-col>

              <v-col style="align-content: center; float: inline-end">
                <v-btn
                  style="color: #000; background-color: white"
                  class="button"
                  @click="activateFilter()"
                >
                  Filtrar
                </v-btn>
              </v-col>
            </v-row>
            <v-text-field
              v-model="search"
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </template>
          <v-data-table-virtual
            no-data-text="Nenhum dado encontrado"
            :loading="loading"
            :headers="headers"
            :items="report"
            :search="search"
            item-value="name"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@8"></v-skeleton-loader>
            </template>
            <template v-if="selectedFilter === 'player'" v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">{{ item.balance }}</td>
                <td class="table-value">
                  <v-btn
                    @click="$router.push(`/admin/report/player/${item.name}`)"
                    style="background-color: white; color: black"
                    >Detalhes</v-btn
                  >
                </td>
              </tr>
            </template>
            <template v-else-if="selectedFilter === 'scalper'" v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">
                  <v-btn
                    @click="$router.push(`/admin/report/scalper/${item.name}`)"
                    style="background-color: white; color: black"
                    >Detalhes</v-btn
                  >
                </td>
              </tr>
            </template>
            <template v-else-if="selectedFilter === 'manager'" v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">
                  <v-btn
                    @click="$router.push(`/admin/report/manager/${item.name}`)"
                    style="background-color: white; color: black"
                    >Detalhes</v-btn
                  >
                </td>
              </tr>
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReportService from '@/service/ReportService';
import { VDateInput } from 'vuetify/labs/VDateInput';

export default {
  name: 'Report',
  data() {
    return {
      reportService: new ReportService(),
      report: [],
      headers: [],
      search: '',
      loading: false,
      range: null,
      showByRangeInput: false,
      selectedFilter: 'game',
    };
  },
  components: {
    VDateInput,
  },
  methods: {
    async getByGames(startDate, endDate) {
      try {
        this.loading = true;
        if (startDate && endDate) this.range = [startDate, endDate];
        startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByGames(startDate, endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'game';
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getByProviders() {
      try {
        this.loading = true;
        let startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        let endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByProviders(startDate, endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'provider';
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getByPlayers() {
      try {
        this.loading = true;
        let startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        let endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByPlayers(startDate, endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'player';
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getByScalpers() {
      try {
        this.loading = true;
        let startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        let endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByScalpers(startDate, endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'scalper';
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getByManagers() {
      try {
        this.loading = true;
        let startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        let endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByManagers(startDate, endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'manager';
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    activateFilter() {
      if (this.selectedFilter === 'game') {
        this.getByGames();
      } else if (this.selectedFilter === 'provider') {
        this.getByProviders();
      } else if (this.selectedFilter === 'player') {
        this.getByPlayers();
      } else if (this.selectedFilter === 'scalper') {
        this.getByScalpers();
      }
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getTodayGamesReport() {
      this.loading = true;
      const today = new Date();
      const startDate = new Date(today.setHours(0, 0, 0, 0));
      this.startDate = startDate;
      this.endDate = new Date();
      this.getByGames(startDate, new Date()).finally(() => (this.loading = false));
    },
  },
  created() {
    this.getTodayGamesReport();
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
</style>
