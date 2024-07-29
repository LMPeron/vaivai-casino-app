import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

const store = defineStore({
  id: 'banner',
  state: () => ({
    _list: useStorage('list', [], undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    list() {
      return this._list;
    },
  },
  actions: {
    setList(list) {
      this._list = list;
    },
  },
});

export default store;
