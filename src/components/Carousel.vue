<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-carousel
        :style="carouselStyle"
        style="width: 100%; height: 100%"
        hide-delimiter-background
        show-arrows="hover"
        continuous
        cycle
      >
        <v-carousel-item
          lazy-src="../assets/banner-1.jpg"
          src="../assets/banner-1.jpg"
          position="top"
        ></v-carousel-item>
        <!-- <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner01g.jpg`"
          src="`../assets/banner01g.jpg`"
          position="top"
        ></v-carousel-item> -->
        <!-- <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner01g.jpg`"
          src="`../assets/banner01m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner01g.jpg`"
          src="`../assets/banner01p.jpg`"
          position="top"
        ></v-carousel-item> -->

        <!-- <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner02g.png`"
          src="`../assets/banner/banner02g.png`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner02m.jpg`"
          src="`../assets/banner/banner02m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner02p.jpg`"
          src="`../assets/banner/banner02p.jpg`"
          position="top"
        ></v-carousel-item> -->

        <!-- <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner03g.png`"
          src="`../assets/banner/banner03g.png`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner03m.jpg`"
          src="`../assets/banner/banner03m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner03p.jpg`"
          src="`../assets/banner/banner03p.jpg`"
          position="top"
        ></v-carousel-item>

        <v-carousel-item
          v-if="screenSize === 'g'"
          lazy-src="`../assets/banner/banner04g.png`"
          src="`../assets/banner/banner04g.png`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else-if="screenSize === 'm'"
          lazy-src="`../assets/banner/banner04m.jpg`"
          src="`../assets/banner/banner04m.jpg`"
          position="top"
        ></v-carousel-item>
        <v-carousel-item
          v-else
          lazy-src="`../assets/banner/banner04p.jpg`"
          src="`../assets/banner/banner04p.jpg`"
          position="top"
        ></v-carousel-item> -->

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
    carouselStyle() {
      if (this.windowWidth >= 1920) return { 'min-height': '400px' };
      else if (this.windowWidth >= 1240) return { 'min-height': '500px' };
      else if (this.windowWidth >= 920) return { 'min-height': '400px' };
      else return { 'min-height': '200px' };
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
