import http from "../http-common";

class ProductsDataService {
  getAll(id) {
    return http.get(`/product/getAllUserProducts/${id}`);
  }

  get(id) {
    return http.get(`/product/get/${id}`);
  }

  create(data) {
    return http.post("/product/add", data);
  }

  update(data) {
    return http.put(`/product/update`, data);
  }

  delete(id) {
    return http.delete(`/product/delete/${id}`);
  }
}

export default new ProductsDataService();
