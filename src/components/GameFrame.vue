<template>
  <div style="background-color: black">
    <iframe
      :src="gameUrl"
      frameborder="0"
      style="width: 100%; height: calc(100vh - 50px)"
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
};
</script>
