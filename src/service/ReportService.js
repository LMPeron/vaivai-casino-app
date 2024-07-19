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

  async getByScalpers(startDate, endDate) {
    return http
      .get(`/report/scalper`, {
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

  async getByManagers(startDate, endDate) {
    return http
      .get(`/report/manager`, {
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

  async getByScalperPlayers(startDate, endDate, username) {
    return http
      .get(`/report/scalper/${username}`, {
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

  async getByManagerScalpers(startDate, endDate, username) {
    return http
      .get(`/report/manager/${username}`, {
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

  async getPlayerHistory(startDate, endDate, username) {
    return http
      .get(`/report/player/${username}`, {
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
