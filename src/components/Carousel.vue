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
        <template v-for="banner in filteredBannerList" :key="banner.url">
          <v-carousel-item
            :lazy-src="`${banner.url}`"
            :src="`${banner.url}`"
            position="top"
          ></v-carousel-item>
        </template>
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
    filteredBannerList() {
      return this.bannerList.filter((banner) => banner.size === this.screenSize);
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
