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
        <v-card>
          <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Search"
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
        endDate = this.range[this.range.length - 1];
        if (startDate === endDate) endDate = new Date();
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
        this.loading;
        const response = await this.reportService.getByProviders(
          this.range[0],
          this.range[this.range.length - 1]
        );
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
        const response = await this.reportService.getByPlayers(this.range[0], this.range[-1]);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.selectedFilter = 'player';
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
