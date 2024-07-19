import http from '@/http-common';

export default class ReportService {
  async getByGames(startDate, endDate) {
    return http
      .get(`/report/game`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getByProviders(startDate, endDate) {
    return http
      .get(`/report/provider`, {
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
      .get(`/report/player`, {
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
