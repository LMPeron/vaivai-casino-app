import http from '@/http-common';

export default class GameService {
  async getAll() {
    return http
      .get(`/`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async open(gameId, clientType, urls) {
    return http
      .post(`/api/session`, {
        gameId: gameId,
        clientType: clientType,
        urls: urls,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
