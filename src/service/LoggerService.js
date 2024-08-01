import http from '@/http-common';

export default class LoggerService {
  async getAll(startDate, endDate) {
    return http
      .get(`/logger`, {
        params: {
          startDate,
          endDate,
        },
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
