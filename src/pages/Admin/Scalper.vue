<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row style="justify-content: center">
      <v-col class="pl-0 pr-0">
        <v-card>
          <template v-slot:text>
            <v-row style="border-radius: 10px">
              <v-col class="pl-4 pt-8 d-flex">
                <v-row>
                  <v-col>
                    <v-date-input
                      v-model="range"
                      label="Selecionar período"
                      max-width="368"
                      multiple="range"
                    ></v-date-input>
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
              <tr @click="$router.push(`/admin/report/player/${item.name}`)">
                <td>{{ item.name }}</td>
                <td class="table-value">{{ item.betAmount }}</td>
                <td class="table-value">{{ item.prizeAmount }}</td>
                <td class="table-value">{{ item.profit }}</td>
                <td class="table-value">{{ item.betQuantity }}</td>
                <td class="table-value">{{ item.balance }}</td>
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

export default {
  name: 'Report',
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
    };
  },
  components: {
    VDateInput,
  },
  methods: {
    async getByScalperPlayers(startDate, endDate) {
      try {
        this.loading = true;
        if (startDate && endDate) this.range = [startDate, endDate];
        startDate = this.range[0];
        startDate = new Date(startDate.setHours(0, 0, 0, 0));
        endDate = this.range[this.range.length - 1];
        endDate = new Date(endDate.setHours(23, 59, 59, 999));
        const response = await this.reportService.getByScalperPlayers(
          startDate,
          endDate,
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
  },
  created() {
    this.getRouteParams();
    this.loading = true;
    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0, 0));
    this.startDate = startDate;
    this.endDate = new Date();
    this.getByScalperPlayers(startDate, new Date()).finally(() => (this.loading = false));
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
