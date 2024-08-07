import http from '@/http-common';

export default class GameService {
  async getAll() {
    return http
      .get(`/game/all`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async search(search) {
    return http
      .get(`/game/search/${search}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async search(search) {
    return http
      .get(`/game/admin/search/${search}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllPriorities() {
    return http
      .get(`/game/priorities`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllSorted() {
    return http
      .get(`/game/sorted`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllSortedByCategory(category, row) {
    return http
      .get(`/game/sorted/${category}/${row}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllSortedByProvider(provider, row) {
    return http
      .get(`/game/sorted/provider/${provider}/${row}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getTop() {
    return http
      .get(`/game/top`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getBingo() {
    return http
      .get(`/game/bingo`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async favorite(gameId) {
    return http
      .post(`/game/favorite`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async unfavorite(gameId) {
    return http
      .post(`/game/unfavorite`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getProviders() {
    return http
      .get(`/game/providers`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
