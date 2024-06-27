import http from '@/http-common';

export default class OrtizService {
  async launch(gameId) {
    return http
      .post(`/1.0/ortiz/launch`, {
        gameId: gameId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
