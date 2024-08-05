<template>
  <v-container class="fill-height">
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <span v-if="providerList && providerList.length > 0" class="category-label">
          Provedores
        </span>
      </v-col>
      <v-col
        class="px-1 r-height"
        v-for="provider in providerList"
        :key="provider.id"
        cols="6"
        xs="6"
        sm="6"
        md="4"
        lg="2"
      >
        <Provider :provider="provider" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Provider from '@/components/Provider.vue';

export default {
  data() {
    return {};
  },
  props: {
    providerList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Provider,
  },
};
</script>

<style>
.category-label {
  text-transform: capitalize;
  font-weight: 700;
  font-size: x-large;
}
</style>
