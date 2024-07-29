<template>
  <div class="mb-4">
    <v-card
      style="margin-bottom: 0"
      class="card"
      color="surface-variant"
      rel="noopener noreferrer"
      variant="text"
      @click="$router.push(`/game/provider/${provider.id}`)"
    >
      <div
        v-if="errorImage"
        style="
          width: 251px;
          height: 135px;
          border-radius: 5px;
          background: linear-gradient(90.59deg, rgb(70, 158, 98) -2.73%, rgb(1, 123, 39) 73.29%);
          align-content: center;
          text-align-last: center;
        "
      >
        <span style="color: white; font-size: x-large; font-weight: 700">
          {{ provider.name }}
        </span>
      </div>
      <img
        v-else
        style="width: 100%; height: 100%; border-radius: 5px"
        :src="provider?.imageUrl"
        alt=""
        @error="onError"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorImage: false,
    };
  },
  methods: {
    onError() {
      this.errorImage = true;
    },
  },
  props: {
    provider: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.card {
  background-color: transparent;
  filter: drop-shadow(1px 1px 3px rgb(46, 46, 46)) !important;
}

@media screen and (min-width: 960px) {
  .card:hover {
    z-index: 2 !important;
    transform: scale(1.2);
    transform-origin: center;
    transition: transform 0.6s ease-in-out;
  }
}
</style>
