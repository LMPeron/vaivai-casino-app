import http from '@/http-common';

export default class AdminService {
  async getDashboard(startDate, endDate) {
    return http
      .get(`/admin/dashboard`, {
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

  async savePriorityGames(priorityGameList) {
    return http
      .post(`/admin/game/priority`, {
        priorityGameList: priorityGameList,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
