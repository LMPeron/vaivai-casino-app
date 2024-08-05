import http from '@/http-common';

export default class ProviderService {
  async getAll() {
    return http
      .get(`/provider`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async update(providerId) {
    return http
      .put(`/provider`, {
        providerId: providerId,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
