<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-carousel
        hide-delimiter-background
        show-arrows="hover"
        continuous
        cycle
        style="height: 100%; width: 100%;"
      >
        <v-carousel-item
          lazy-src="../assets/banner-1.jpg"
          src="../assets/banner-1.jpg"
          position="top"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
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
    category: {
      typee: String,
      default: () => '',
    },
  },
};
</script>

<style></style>
