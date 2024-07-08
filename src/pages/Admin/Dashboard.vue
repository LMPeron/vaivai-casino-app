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
        <v-btn class="button" @click="getPastWeekDashboard()"> semana passada </v-btn>
      </v-col>
      <v-col class="button-col">
        <v-btn class="button" @click="showByRangeInput = !showByRangeInput"> período </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="pl-4 pt-8"
        style="
          background-color: rgba(0, 0, 0, 0.87);
          border-radius: 10px;
          text-align: -webkit-center;
        "
        v-if="showByRangeInput"
      >
        <v-date-input
          v-model="range"
          label="Selecionar período"
          max-width="368"
          multiple="range"
        ></v-date-input>
        <v-btn
          style="color: #000; background-color: white"
          class="button"
          @click="getRangeDashboard()"
        >
          Filtrar
        </v-btn>
      </v-col>
    </v-row>

    <span class="label">Cassino</span>
    <v-row class="pt-2 pb-4">
      <v-col cols="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Apostado </span>
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.action?.bet?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.action?.bet?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Prêmio </span>
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.action?.prize?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.action?.prize?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Líquido </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.action?.profit) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <span class="label">Carteira</span>
    <v-row class="pt-2">
      <v-col cols="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Entrada do JB </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.flow?.deposit?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.flow?.deposit?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Saída para JB </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.flow?.withdraw?.amount) }}
            </span>
            <span style="float: inline-end"> {{ report.flow?.withdraw?.quantity }} </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Entrada - Saída </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <span>
              {{ formatCurrencyBRL(report.flow?.profit) }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="card">
          <v-card-item>
            <v-card-title>
              <span> Carteira de clientes </span>
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <span>
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

export default {
  name: 'Admin',
  data() {
    return {
      userState: userStore(),
      adminService: new AdminService(),
      report: {},
      loading: false,
      range: null,
      showByRangeInput: false,
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  components: {
    VDateInput,
  },

  methods: {
    async getDashboard(startDate, endDate) {
      try {
        const response = await this.adminService.getDashboard(startDate, endDate);
        console.log(response);
        this.report = response.data?.report;
      } catch (error) {
        console.error(error);
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
      this.startDate = startDate;
      this.endDate = new Date();
      this.getDashboard(startDate, new Date()).finally(() => (this.loading = false));
    },
    async getYesterdayDashboard() {
      this.loading = true;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const startDate = new Date(yesterday.setHours(0, 0, 0, 0));
      const endDate = new Date(yesterday.setHours(23, 59, 59, 999));
      this.startDate = startDate;
      this.endDate = endDate;
      this.getDashboard(startDate, endDate).finally(() => (this.loading = false));
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
      this.startDate = startDate;
      this.endDate = endDate;
      this.getDashboard(startDate, endDate).finally(() => (this.loading = false));
    },
    async getPastWeekDashboard() {
      this.loading = true;
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 14);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - 7);
      endDate.setHours(23, 59, 59, 999);
      this.startDate = startDate;
      this.endDate = endDate;
      this.getDashboard(startDate, endDate).finally(() => (this.loading = false));
    },
    async getRangeDashboard() {
      this.loading = true;
      console.log(this.range);
      this.getDashboard(this.range[1], this.range[-1]).finally(() => (this.loading = false));
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
