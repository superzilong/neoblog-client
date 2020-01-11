import axios from "axios";

const API_URL = "/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then(this.handleResponse)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("NerdBro-User", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("NerdBro-User");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  handleResponse(response) {
    if (response.status === 401) {
      this.logout();
      location.reload(true);

      const err = response.data && response.data.message;
      return Promise.reject(err);
    }
    return Promise.resolve(response);
  }
}

export default new AuthService();
