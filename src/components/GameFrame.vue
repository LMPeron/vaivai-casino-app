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
  props: {
    gameUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    height() {
      return `${window.innerHeight - 50}px`;
    },
    width() {
      return `${window.innerWidth}px`;
    },
  },
};
</script>
