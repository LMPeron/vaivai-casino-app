import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import AuthService from '@/service/AuthService.js';

const store = defineStore({
  id: 'user',
  state: () => ({
    _user: useStorage('user', {}, undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
    _token: useStorage('token', {}, undefined, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    user() {
      return this._user;
    },
    token() {
      return this._token;
    },
  },
  actions: {
    logout() {
      this._user = null;
      this._token = false;
    },
    async login(data) {
      const response = await AuthService.login(data);
      this._user = response.data;
      this._token = response.token;
    },
    async register(data) {
      const response = await AuthService.register(data);
      this._user = response.data;
      this._token = response.token;
    },
    async renewToken() {
      const response = await AuthService.renewToken();
      this._user = response.data?.user;
      this._token = response.data?.token;
    },
    setToken(token) {
      this._token = token;
    },
  },
});

export default store;
