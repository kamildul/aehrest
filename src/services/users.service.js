import http from "../http-common";

class UsersDataService {
    login(data) {
        return http.post("/user/authentication", data);
    }
    register(data) {
        return http.post("/user/add", data);
    }
}

export default new UsersDataService();
