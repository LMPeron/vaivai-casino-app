import http from '@/http-common';

export default class CategoryService {
  async getAll() {
    return http
      .get(`/category`)
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async create(category) {
    return http
      .post(`/category`, {
        category: category,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }

  async update(category) {
    return http
      .put(`/category`, {
        category: category,
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response.data || e;
      });
  }
}
