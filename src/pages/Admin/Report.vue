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
    </v-row>

    <v-row style="justify-content: center">
      <v-col cols="12">
        <v-row
          style="
            background-color: rgba(0, 0, 0, 0.87);
            border-radius: 10px;
            text-align: -webkit-center;
          "
        >
          <v-col class="pl-4 pt-8">
            <v-date-input
              v-model="range"
              label="Selecionar período"
              max-width="368"
              multiple="range"
            ></v-date-input>
          </v-col>

          <v-col style="align-content: center">
            <v-btn
              style="color: #000; background-color: white"
              class="button"
              @click="activateFilter()"
            >
              Filtrar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="pl-0 pr-0">
        <v-data-table-virtual
          no-data-text="Nenhum dado encontrado"
          :headers="headers"
          :items="report"
          item-value="name"
        ></v-data-table-virtual>
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
        if (startDate && endDate) this.range = [startDate, endDate];
        const response = await this.reportService.getByGames(this.range[1], this.range[-1]);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'game';
      } catch (error) {
        console.error(error);
      }
    },
    async getByProviders() {
      try {
        const response = await this.reportService.getByProviders(this.range[1], this.range[-1]);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'provider';
      } catch (error) {
        console.error(error);
      }
    },
    async getByPlayers() {
      try {
        const response = await this.reportService.getByPlayers(this.range[1], this.range[-1]);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'player';
      } catch (error) {
        console.error(error);
      }
    },
    activateFilter() {
      if (this.selectedFilter === 'game') {
        this.getByGames();
      } else if (this.selectedFilter === 'provider') {
        this.getByProviders();
      } else if (this.selectedFilter === 'player') {
        this.getByPlayers();
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
</style>
