import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const store = defineStore({
  id: 'app',
  state: () => ({
    _running: useStorage('running', {}, undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    running() {
      return this._running;
    },
  },
  actions: {
    setRunning(running) {
      this._running = running;
    },
  },
});

export default store;
