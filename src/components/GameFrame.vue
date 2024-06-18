<template>
  <div style="background-color: black">
    <iframe
      :src="gameUrl"
      frameborder="0"
      :style="{ width: `${width}px`, height: `${height - 50}px` }"
      allowfullscreen
    />
    <v-btn @click="$emit('exit')"> Voltar </v-btn>
  </div>
</template>

<script>
export default {
  name: 'GameFrame',
  props: {
    gameUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    height() {
      return window.innerHeight;
    },
    width() {
      return window.innerWidth;
    },
  },
};
</script>
