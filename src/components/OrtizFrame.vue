<template>
  <div style="background-color: black">
    <iframe
      ref="iframe"
      frameborder="0"
      :style="{ width: '100%', height: height }"
      allowfullscreen
    />
    <v-btn @click="$emit('exit')"> Voltar </v-btn>
  </div>
</template>

<script>
export default {
  name: 'OrtizFrameComponent',
  data() {
    return {
      windowHeight: window.innerHeight,
    };
  },
  props: {
    html: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.setIframeContent();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    setIframeContent() {
      const iframe = this.$refs.iframe;
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(this.html);
      iframe.contentWindow.document.close();
    },
  },
  computed: {
    height() {
      return `${this.windowHeight - 50}px`;
    },
  },
};
</script>
