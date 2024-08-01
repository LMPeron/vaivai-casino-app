<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row style="justify-content: center">
      <v-col class="pl-0 pr-0">
        <v-card class="mb-4">
          <template v-slot:title>
            <span
              >RESUMO DE {{ formatDateDay(this.startDate) }} A {{ formatDateDay(this.startDate) }} -
              CONSULTADO: {{ formatDateDay(this.requestDate) }} às
              {{ formatTime(this.requestDate) }} de todos os LOGS de ADMIN</span
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
                      @click="getAllLogs()"
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
            :items="logList"
            :search="search"
            item-value="name"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@8"></v-skeleton-loader>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.User.username }}</td>
                <td class="table-value">{{ item.action }}</td>
                <td class="table-value">{{ formatDateTime(item.createdAt) }}</td>
              </tr>
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import LoggerService from '@/service/LoggerService';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { format } from 'date-fns';

export default {
  name: 'Player',
  directives: { mask },
  data() {
    return {
      loggerService: new LoggerService(),
      logList: [],
      search: '',
      loading: false,
      startDateInput: '',
      endDateInput: '',
      headers: [
        { title: 'Usuário', key: 'User.username', align: 'start', width: '150px' },
        { title: 'Ação', key: 'action', align: 'end', width: '100px' },
        { title: 'Data', key: 'createdAt', align: 'end', width: '100px' },
      ],
      startDate: new Date(),
      endDate: new Date(),
      requestDate: new Date(),
    };
  },
  components: {
    VDateInput,
  },
  methods: {
    async getAllLogs() {
      try {
        this.loading = true;
        this.startDate = this.convertDate(this.startDateInput);
        this.endDate = this.convertDate(this.endDateInput, false);
        this.requestDate = new Date();
        const response = await this.loggerService.getAll(this.startDate, this.endDate);
        this.logList = response.data?.logList;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
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
    this.loading = true;
    const today = new Date();
    this.startDateInput = this.formatDateDay(today);
    this.endDateInput = this.formatDateDay(today);
    this.getAllLogs();
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
