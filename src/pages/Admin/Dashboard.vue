<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row class="mb-4">
      <v-col cols="12">
        <span style="color: rgba(0, 0, 0, 0.87); font-weight: 500">Visão Geral</span>
        <span style="color: rgba(0, 0, 0, 0.87); font-weight: 400; display: block; font-size: small"
          >{{ formatDate(startDate) }} - {{ formatDate(endDate) }}</span
        >
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getTodayDashboard()"> Hoje </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getYesterdayDashboard()"> Ontem </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getLastWeekDashboard()"> Última semana </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="getLastMonthDashboard()"> Último mês </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="showByRangeInput = !showByRangeInput"> período </v-btn>
      </v-col>

      <v-col
        cols="12"
        class="pl-4 pt-8"
        v-if="showByRangeInput"
        style="
          background-color: rgba(0, 0, 0, 0.87);
          border-radius: 10px;
          text-align: -webkit-center;
        "
      >
        <v-row>
          <v-col>
            <v-text-field
              v-mask="'##/##/####'"
              v-model="startDateInput"
              label="Selecione período de início"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-mask="'##/##/####'"
              v-model="endDateInput"
              label="Selecione período de fim"
            ></v-text-field>
          </v-col>

          <v-col style="align-content: center">
            <v-btn
              style="color: #000; background-color: white; align-self: center"
              class="button"
              @click="getDashboard()"
            >
              Filtrar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- 
      <v-col



      >
        <v-date-input
          v-model="range"
          label="Selecionar período"
          max-width="368"
          multiple="range"
        ></v-date-input>
        <v-btn style="color: #000; background-color: white" class="button" @click="getDashboard()">
          Filtrar
        </v-btn>
      </v-col> -->
    </v-row>

    <span class="label">Cassino</span>
    <v-row class="pt-2 pb-4">
      <v-col cols="12" md="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Apostado </span>
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.action?.bet?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.action?.bet?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Prêmio </span>
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <div v-else>
              <span>
                {{ formatCurrencyBRL(report.action?.prize?.amount) }}
              </span>
              <span style="float: inline-end"> {{ report.action?.prize?.quantity }} </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Líquido </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.action?.profit) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <span v-if="userState._user.role > 6" class="label">Esportes</span>
    <v-row v-if="userState._user.role > 6" class="pt-2 pb-4">
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Apostado </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.sport?.apostado) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Prêmio </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.sport?.premio) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Pendente </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.sport?.pendente) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Líquido </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.sport?.pendente) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <span class="label">Carteira</span>
    <v-row class="pt-2">
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Entrada do JB </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.flow?.deposit?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.flow?.deposit?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Saída para JB </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.flow?.withdraw?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.flow?.withdraw?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Entrada - Saída </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.flow?.profit) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Carteira atual </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <span v-else>
              {{ formatCurrencyBRL(report.flow?.totalBalance) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userStore from '@/stores/user';
import AdminService from '@/service/AdminService';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { mask } from 'vue-the-mask';
import { format } from 'date-fns';

export default {
  name: 'Dashboard',
  directives: { mask },
  data() {
    return {
      userState: userStore(),
      adminService: new AdminService(),
      report: {},
      loading: false,
      range: null,
      showByRangeInput: false,
      startDateInput: '',
      endDateInput: '',
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  components: {
    VDateInput,
  },
  methods: {
    async getDashboard() {
      try {
        this.loading = true;
        this.startDate = this.convertDate(this.startDateInput);
        this.endDate = this.convertDate(this.endDateInput, false);
        const response = await this.adminService.getDashboard(this.startDate, this.endDate);
        this.report = response.data?.report;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    formatCurrencyBRL(value) {
      if (!value) return 'R$ 0,00';
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getTodayDashboard() {
      this.loading = true;
      const today = new Date();
      const startDate = new Date(today.setHours(0, 0, 0, 0));
      this.startDateInput = this.formatDateDay(startDate);
      this.endDateInput = this.formatDateDay(today);
      this.getDashboard().finally(() => (this.loading = false));
    },
    async getYesterdayDashboard() {
      this.loading = true;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const startDate = new Date(yesterday.setHours(0, 0, 0, 0));
      const endDate = new Date(yesterday.setHours(23, 59, 59, 999));
      this.startDateInput = this.formatDateDay(startDate);
      this.endDateInput = this.formatDateDay(endDate);
      this.getDashboard().finally(() => (this.loading = false));
    },
    async getLastWeekDashboard() {
      this.loading = true;
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
      this.startDateInput = this.formatDateDay(startDate);
      this.endDateInput = this.formatDateDay(endDate);
      this.getDashboard().finally(() => (this.loading = false));
    },
    async getLastMonthDashboard() {
      this.loading = true;
      const today = new Date();
      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);
      endDate.setHours(23, 59, 59, 999);
      this.startDateInput = this.formatDateDay(startDate);
      this.endDateInput = this.formatDateDay(endDate);
      this.getDashboard().finally(() => (this.loading = false));
    },
    convertDate(date, start = true) {
      const [day, month, year] = date.split('/');
      const formatted = new Date(year, month - 1, day);
      return start
        ? new Date(formatted.setHours(0, 0, 0, 0))
        : new Date(formatted.setHours(23, 59, 59, 999));
    },
    formatDateDay(date) {
      return format(date, 'dd/MM/yyyy');
    },
  },
  created() {
    this.getTodayDashboard();
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
