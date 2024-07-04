<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-carousel
        hide-delimiter-background
        show-arrows="hover"
        continuous
        cycle
        style="height: 100%; width: 100%"
      >
        <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner01g.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner01m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner01p.jpg`"
          position="top"
        ></v-carousel-item>

        <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner02g.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner02m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner01g.jpg`"
          src="`../assets/banner/banner02p.jpg`"
          position="top"
        ></v-carousel-item>

        <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner03g.jpg`"
          src="`../assets/banner/banner03g.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner03g.jpg`"
          src="`../assets/banner/banner03m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner03g.jpg`"
          src="`../assets/banner/banner03p.jpg`"
          position="top"
        ></v-carousel-item>

        <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner04g.jpg`"
          src="`../assets/banner/banner04g.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner04g.jpg`"
          src="`../assets/banner/banner04m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner04g.jpg`"
          src="`../assets/banner/banner04p.jpg`"
          position="top"
        ></v-carousel-item>

        <!-- <template v-for="banner in bannerList" :key="banner.url">
          <v-carousel-item
            v-if="screenSize === 'g'"
            :lazy-src="`../assets/banner/banner01g.jpg`"
            :src="`../assets/banner/banner01g.jpg`"
            position="top"
          ></v-carousel-item>
          <v-carousel-item
            v-else-if="screenSize === 'm'"
            :lazy-src="`../assets/banner/banner01g.jpg`"
            :src="`../assets/banner/banner01m.jpg`"
            position="top"
          ></v-carousel-item>
          <v-carousel-item
            v-else
            :lazy-src="`../assets/banner/banner01g.jpg`"
            :src="`../assets/banner/banner01p.jpg`"
            position="top"
          ></v-carousel-item>
        </template> -->
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    screenSize() {
      if (this.windowWidth >= 1920) return 'g';
      else if (this.windowWidth >= 1440) return 'm';
      else return 'p';
    },
  },
  props: {
    bannerList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
