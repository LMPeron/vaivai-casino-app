<template>
  <div class="footer-content pa-3">
    <v-row class="py-3" style="justify-content: center">
      <!-- Primeira coluna: Logo e ícones sociais -->
      <v-col cols="2">
        <div class="d-flex flex-column align-center">
          <img class="mb-3" width="20px" src="../assets/logoIcon.png" alt="" />
          <img v-if="!isMobile" class="pl-2" width="150px" src="../assets/logo.png" alt="" />
          <div class="d-flex justify-content-between mt-3">
            <v-btn icon>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>

      <!-- Segunda coluna: Aposte -->
      <v-col cols="2">
        <h3>Aposte</h3>
        <ul>
          <li>Apostas esportivas</li>
          <li>Esportes ao vivo</li>
          <li>Jogos slots</li>
          <li>Cassino ao vivo</li>
        </ul>
      </v-col>

      <!-- Terceira coluna: Comunidade -->
      <v-col cols="2">
        <h3>Comunidade</h3>
        <ul>
          <li>Blog</li>
          <li>Central de ajuda</li>
          <li>Aplicativo móvel</li>
        </ul>
      </v-col>

      <!-- Quarta coluna: Regras e Pagamentos -->
      <v-col cols="2">
        <h3>Regras</h3>
        <ul>
          <li>Termos de uso</li>
          <li>Termos de apostas</li>
          <li>Política AML</li>
          <li>Política de Privacidade</li>
          <li>Jogo responsável</li>
        </ul>
      </v-col>
      <v-col cols="2">
        <h3>Pagamento</h3>
        <v-flex>
          <v-btn icon>
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-bank-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-paypal</v-icon>
          </v-btn>
        </v-flex>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer-content {
  background-color: rgb(33, 33, 33);
  color: #ffffff;
  width: 100%;
}

h3 {
  font-size: 1rem; /* Tamanho menor para os títulos */
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  font-size: 0.85rem; /* Tamanho menor para os itens da lista */
  line-height: 1.5; /* Espaçamento de linha adequado para legibilidade */
}

.v-btn {
  min-width: 40px; /* Ajuste para os botões serem menores */
}
</style>
