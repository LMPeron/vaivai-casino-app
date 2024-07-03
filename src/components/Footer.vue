<template>
  <v-footer style="background-color: rgb(70, 158, 98)" class="text-center d-flex flex-column">
    <v-row style="width: 80%; justify-content: center" no-gutters class="mt-4 mb-4">
      <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="mb-2 mt-2">
        <img style="width: 150px" src="../assets/logo3.png" alt="" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="mb-2 mt-2">
        <img style="width: 150px" src="../assets/pix-logo.png" alt="" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="mb-2 mt-2">
        <img style="width: 150px" src="../assets/gaming-labs.png" alt="" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="mb-2 mt-2">
        <img style="width: 150px" src="../assets/gc-logo.png" alt="" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="2" class="mb-2 mt-2">
        <img style="width: 150px" src="../assets/18.png" alt="" />
      </v-col>
    </v-row>

    <div class="pt-4 link" @click="redirect('https://vaivaibet.com/?page=termos')">
      Somos um portal de entretenimento online que oferece uma experiência única em apostas online,
      conheça nossos termos de uso.
    </div>

    <div class="pt-4 link" @click="redirect('https://vaivaibet.com/?page=privacidade')">
      Este site armazena dados criptografados leia nossa política de privacidade.
    </div>

    <div class="pt-4 link" @click="redirect('https://vaivaibet.com/?page=jogoresponsavel')">
      Jogar pode ser viciante, por favor jogue com responsabilidade.
    </div>

    <v-row style="width: 80%" no-gutters class="mt-4 mb-4">
      <v-col cols="12" class="mb-2">
        <img style="width: 200px" src="../assets/logo.png" alt="" />
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>VaiVaiBet</strong></div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    redirect(url) {
      window.location.replace(url);
    },
  },
};
</script>

<style scoped>
.link {
  text-decoration: underline;
  font-size: small;
  cursor: pointer;
}
</style>
