import http from '@/http-common';

export default class GameService {
  async getAll() {
    return http
      .get(`/game`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
