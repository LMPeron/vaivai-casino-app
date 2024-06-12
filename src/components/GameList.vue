<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <v-row>
        <v-containter v-for="game in gameList" :key="game.id">
          <v-col cols="12">
            <v-card
              append-icon="mdi-open-in-new"
              class="py-4"
              color="surface-variant"
              rel="noopener noreferrer"
              rounded="lg"
              :subtitle="game.identifier"
              @click="$emit('open', game.id)"
              :title="game.title"
              variant="text"
            >
              <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
            </v-card>
          </v-col>
        </v-containter>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
