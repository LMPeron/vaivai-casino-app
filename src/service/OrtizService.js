import http from '@/http-common';

export default class OrtizService {
  async launch(gameId) {
    return http
      .post(`/ortiz/launch`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
