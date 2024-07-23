<template>
  <v-app>
    <v-container class="fill-height" fluid align="center" justify="center">
      <v-card class="mx-auto" max-width="500" elevation="3">
        <v-card-title class="headline">Estamos em Manutenção</v-card-title>
        <v-card-text>
          <p>Estamos trabalhando para melhorar o nosso site. Por favor, volte mais tarde.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="refreshPage"> Tentar Novamente </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'MaintenancePage',
  methods: {
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
}
</style>
