import http from '@/http-common';

export default class ConfigService {
  async getBanners() {
    return http
      .get(`/config/banner`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
