<template>
  <div>
    <iframe :src="gameUrl" frameborder="0" width="1920" height="1080" allowfullscreen /> 
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
