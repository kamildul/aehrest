import http from "../http-common";

class AuctionsDataService {
    getAll() {
      return http.get(`/product/getAll`);
    }
    bid(data) {
      return http.post("/product/bid", data);
    }
}

export default new AuctionsDataService();