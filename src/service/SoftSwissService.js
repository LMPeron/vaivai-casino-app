import http from '@/http-common';

export default class SoftSwissService {
  async open(gameId, clientType, urls) {
    return http
      .post(`/softswiss/session`, {
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
