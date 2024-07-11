import http from '@/http-common';

export default class BannerService {
  async getAll() {
    return http
      .get(`/api/banner/all`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
