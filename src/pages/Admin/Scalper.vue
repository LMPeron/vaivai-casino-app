<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row style="justify-content: center">
      <v-col class="pl-0 pr-0">
        <v-card>
          <template v-slot:title>
            <span
              >RESUMO DE {{ formatDateDay(this.startDate) }} A {{ formatDateDay(this.startDate) }} -
              CONSULTADO: {{ formatDateDay(this.requestDate) }} às
              {{ formatTime(this.requestDate) }} de todos os CAMBISTAS</span
            >
          </template>

          <template v-slot:text>
            <v-row style="border-radius: 10px">
              <v-col class="pl-4 pt-8 d-flex">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-mask="'##/##/####'"
                      v-model="startDateInput"
                      label="Selecione período de início"
                      max-width="220"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      v-mask="'##/##/####'"
                      v-model="endDateInput"
                      label="Selecione período de fim"
                      max-width="220"
                    ></v-text-field>
                  </v-col>

                  <v-col style="align-content: center">
                    <v-btn
                      style="color: #000; background-color: white; align-self: center"
                      class="button"
                      @click="getByScalperPlayers()"
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
            <template v-slot:item="{ item }">
              <tr @click="$router.push(`/admin/report/player/${item.username}`)">
                <td>{{ item.role }}: {{ item.username }}</td>
                <td class="table-value">{{ item.phone }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">{{ item.balance }}</td>
                <td style="display: none">{{ item.document }}</td>
              </tr>
            </template>
          </v-data-table-virtual>
          <v-data-table-virtual
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReportService from '@/service/ReportService';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { format } from 'date-fns';
import { mask } from 'vue-the-mask';

export default {
  name: 'Scalper',
  directives: { mask },
  data() {
    return {
      reportService: new ReportService(),
      report: [],
      total: [],
      headers: [],
      headersTotal: [],
      search: '',
      loading: false,
      range: null,
      startDateInput: '',
      endDateInput: '',
      startDate: new Date(),
      endDate: new Date(),
      requestDate: new Date(),
    };
  },
  components: {
    VDateInput,
  },
  methods: {
    async getByScalperPlayers() {
      try {
        this.loading = true;
        this.startDate = this.convertDate(this.startDateInput);
        this.endDate = this.convertDate(this.endDateInput, false);
        this.requestDate = new Date();
        const response = await this.reportService.getByScalperPlayers(
          this.startDate,
          this.endDate,
          this.username
        );
        this.report = response.data?.report;
        this.total = response.data?.total;
        this.headers = response.data?.headers;
        this.headersTotal = response.data?.headersTotal;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    getRouteParams() {
      this.username = this.$route.params.username;
    },
    currency(value) {
      if (!value) return 'R$ 0,00';
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    },
    formatPhone(phone) {
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
    convertDate(date, start = true) {
      const [day, month, year] = date.split('/');
      const formatted = new Date(year, month - 1, day);
      return start
        ? new Date(formatted.setHours(0, 0, 0, 0))
        : new Date(formatted.setHours(23, 59, 59, 999));
    },
  },
  created() {
    this.getRouteParams();
    this.loading = true;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    this.startDateInput = this.formatDateDay(yesterday);
    this.endDateInput = this.formatDateDay(yesterday);
    this.getByScalperPlayers().finally(() => (this.loading = false));
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

tr {
  cursor: pointer;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
</style>
