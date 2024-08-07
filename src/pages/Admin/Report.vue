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
      <v-col class="button-col" v-if="userState._user.role > 3">
        <v-btn class="button" @click="getByScalpers()"> Cambistas </v-btn>
      </v-col>
      <v-col class="button-col" v-if="userState._user.role > 6">
        <v-btn class="button" @click="getByManagers()"> Gerente </v-btn>
      </v-col>
    </v-row>

    <v-row style="justify-content: center">
      <v-col cols="12"> </v-col>

      <v-col class="pl-0 pr-0">
        <v-container class="mb-4">
          <div style="background-color: rgb(33 33 33)" class="pl-2 pt-4 pr-3">
            <span
              >RESUMO DE {{ formatDateDay(this.startDate) }} A {{ formatDateDay(this.endDate) }} -
              CONSULTADO: {{ formatDateDay(this.requestDate) }} às
              {{ formatTime(this.requestDate) }} de todos os {{ mappedFilter }}</span
            >
            <v-row style="border-radius: 10px">
              <v-col class="pl-4 pt-8 d-flex">
                <v-row>
                  <v-col>
                    <VueDatePicker
                      style="position: sticky"
                      :format="format"
                      v-model="startDate"
                    ></VueDatePicker>
                  </v-col>

                  <v-col>
                    <VueDatePicker
                      style="position: sticky"
                      :format="format"
                      v-model="endDate"
                    ></VueDatePicker>
                  </v-col>

                  <v-col style="align-content: center">
                    <v-btn
                      style="color: #000; background-color: white; align-self: center"
                      class="button"
                      @click="activateFilter()"
                    >
                      Filtrar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col style="align-content: center">
                <v-text-field
                  v-model="search"
                  label="Buscar"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

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
              <tr @click="$router.push(`/admin/report/player/${item.username}`)">
                <td>{{ item.role }}: {{ item.username }}</td>
                <td class="table-value">{{ formatPhone(item.phone) }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">{{ item.balance }}</td>
                <td style="display: none">{{ item.document }}</td>
              </tr>
            </template>
            <template v-else-if="selectedFilter === 'scalper'" v-slot:item="{ item }">
              <tr @click="$router.push(`/admin/report/scalper/${item.username}`)">
                <td style="width: 20%">{{ item.username }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
              </tr>
            </template>
            <template v-else-if="selectedFilter === 'manager'" v-slot:item="{ item }">
              <tr @click="$router.push(`/admin/report/manager/${item.name}`)">
                <td>{{ item.name }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
              </tr>
            </template>
          </v-data-table-virtual>
          <v-data-table-virtual
            v-if="!search"
            no-data-text="Nenhum dado encontrado"
            :loading="loading"
            :headers="headersTotal"
            :items="total"
            :search="search"
            item-value="name"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@1"></v-skeleton-loader>
            </template>
          </v-data-table-virtual>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReportService from '@/service/ReportService';
import { VDateInput } from 'vuetify/labs/VDateInput';
import userStore from '@/stores/user';
import { format } from 'date-fns';
import { mask } from 'vue-the-mask';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'Report',
  directives: { mask },
  data() {
    return {
      reportService: new ReportService(),
      userState: userStore(),
      report: [],
      total: [],
      headers: [],
      headersTotal: [],
      search: '',
      loading: false,
      range: null,
      showByRangeInput: false,
      startDate: new Date(),
      endDate: new Date(),
      requestDate: new Date(),
      selectedFilter: 'game',
    };
  },
  components: {
    VDateInput,
    VueDatePicker,
  },
  methods: {
    async getByGames() {
      try {
        this.loading = true;
        this.startDate = this.setHours(this.startDate);
        this.endDate = this.setHours(this.endDate, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByGames(this.startDate, this.endDate);
        this.report = response.data?.report;
        this.total = response.data?.total;
        this.headers = response.data?.headers;
        this.headersTotal = response.data?.headersTotal;
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
        this.startDate = this.setHours(this.startDate);
        this.endDate = this.setHours(this.endDate, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByProviders(this.startDate, this.endDate);
        this.report = response.data?.report;
        this.total = response.data?.total;
        this.headersTotal = response.data?.headersTotal;
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
        this.startDate = this.setHours(this.startDate);
        this.endDate = this.setHours(this.endDate, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByPlayers(this.startDate, this.endDate);
        this.report = response.data?.report;
        this.total = response.data?.total;
        this.headers = response.data?.headers;
        this.headersTotal = response.data?.headersTotal;
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
        this.startDate = this.setHours(this.startDate);
        this.endDate = this.setHours(this.endDate, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByScalpers(this.startDate, this.endDate);
        this.report = response.data?.report;
        this.total = response.data?.total;
        this.headers = response.data?.headers;
        this.headersTotal = response.data?.headersTotal;
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
        this.startDate = this.setHours(this.startDate);
        this.endDate = this.setHours(this.endDate, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByManagers(this.startDate, this.endDate);
        this.report = response.data?.report;
        this.headers = response.data?.headers;
        this.total = response.data?.total;
        this.headersTotal = response.data?.headersTotal;
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
      } else if (this.selectedFilter === 'manager') {
        this.getByManagers();
      }
    },
    formatPhone(phone) {
      if (!phone) return '';
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    },
    formatDateDay(date) {
      return format(date, 'dd/MM/yyyy');
    },
    formatTime(date) {
      return format(date, 'HH:mm:ss');
    },
    formatDateTime(date) {
      return format(date, 'dd/MM/yyyy HH:mm:ss');
    },
    format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getYesterdayGamesReport() {
      this.loading = true;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      this.startDate = yesterday;
      this.endDate = yesterday;
      this.getByGames().finally(() => (this.loading = false));
    },
    formatString() {
      let input = this.startDate.replace(/\D/g, '').slice(0, 8);
      if (input.length > 4) {
        this.startDate = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
      } else if (input.length > 2) {
        this.startDate = `${input.slice(0, 2)}/${input.slice(2)}`;
      } else {
        this.startDate = input;
      }
    },
    setHours(date, start = true) {
      return start ? new Date(date.setHours(0, 0, 0, 0)) : new Date(date.setHours(23, 59, 59, 999));
    },
  },
  computed: {
    mappedFilter() {
      if (this.selectedFilter === 'game') return 'JOGOS';
      if (this.selectedFilter === 'provider') return 'PROVEDORES';
      if (this.selectedFilter === 'player') return 'JOGADORES';
      if (this.selectedFilter === 'scalper') return 'CAMBISTAS';
      if (this.selectedFilter === 'manager') return 'GERENTES';
    },
  },
  created() {
    this.getYesterdayGamesReport();
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
  /* width: 20%; */
}

tr {
  cursor: pointer;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.hidden {
  display: none;
}
</style>
