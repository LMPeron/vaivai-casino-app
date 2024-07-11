import http from '@/http-common';

export default class ReportService {
  async getByGames(startDate, endDate) {
    return http
      .get(`/api/report/game`, {
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

  async getByProviders(startDate, endDate) {
    return http
      .get(`/api/report/provider`, {
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

  async getByPlayers(startDate, endDate) {
    return http
      .get(`/api/report/player`, {
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
