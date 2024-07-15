import http from '@/http-common';

export default class BannerService {
  async getAll() {
    return http
      .get(`/banner/all`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async getAllGSize() {
    return http
      .get(`/banner/g`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async priority(bannerList) {
    return http
      .put(`/banner/order`, {
        bannerList: bannerList,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async upload(file, size) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('size', size);

    return http
      .post(`/banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
