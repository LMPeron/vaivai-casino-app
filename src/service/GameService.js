import http from '@/http-common';

export default class GameService {
  async getAll() {
    return http
      .get(`/api/game/all`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllPriorities() {
    return http
      .get(`/api/game/priorities`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllSorted() {
    return http
      .get(`/api/game/sorted`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllSortedByCategory(category) {
    return http
      .get(`/api/game/sorted/${category}`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getTop() {
    return http
      .get(`/api/game/top`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getBingo() {
    return http
      .get(`/api/game/bingo`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async favorite(gameId) {
    return http
      .post(`/api/game/favorite`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async unfavorite(gameId) {
    return http
      .post(`/api/game/unfavorite`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
