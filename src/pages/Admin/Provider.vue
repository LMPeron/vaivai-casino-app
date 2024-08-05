<template>
  <div style="background-color: rgb(241, 241, 241); width: 100%; height: 100%" class="px-10 pt-4">
    <v-row style="justify-content: center">
      <v-col class="pl-0 pr-0">
        <v-card class="mb-4">
          <template v-slot:text>
            <v-row style="border-radius: 10px">
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
            :items="providerList"
            :search="search"
            item-value="name"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@8"></v-skeleton-loader>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td class="table-value">
                  <v-switch
                    @change="update(item.id)"
                    class="switch"
                    :color="item.active ? 'success' : ''"
                    v-model="item.active"
                    inset
                  ></v-switch>
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
import ProviderService from '@/service/ProviderService';

export default {
  name: 'Provider',

  data() {
    return {
      providerService: new ProviderService(),
      providerList: [],
      headers: [
        { title: 'Nome', key: 'name', align: 'start', width: '150px' },
        { title: 'Ativo', key: 'active', align: 'end', width: '100px' },
      ],
      search: '',
      loading: false,
    };
  },
  methods: {
    async getProviders() {
      try {
        this.loading = true;
        const response = await this.providerService.getAll();
        this.providerList = response.data?.providerList;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async update(providerId) {
      try {
        await this.providerService.update(providerId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getProviders();
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
  justify-items: end;
}

.v-input__details {
  display: none !important;
}
</style>
