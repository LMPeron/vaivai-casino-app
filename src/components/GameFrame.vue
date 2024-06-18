<template>
  <div style="background-color: black">
    <iframe
      :src="gameUrl"
      frameborder="0"
      :style="{ width: '100%', height: height }"
      allowfullscreen
    />
    <v-btn @click="$emit('exit')"> Voltar </v-btn>
  </div>
</template>

<script>
export default {
  name: 'GameFrame',
  data() {
    return {
      windowHeight: window.innerHeight,
    };
  },
  props: {
    gameUrl: {
      type: String,
      required: true,
    },
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
      this.windowHeight = window.innerHeight;
    },
  },
  computed: {
    height() {
      return `${this.windowHeight - 50}px`;
    },
  },
};
</script>
