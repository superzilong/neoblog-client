import AuthService from "../service/auth.service";

console.log(localStorage.getItem("NerdBro-User"));
const user = JSON.parse(localStorage.getItem("NerdBro-User"));
console.log(user);
const initState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        error => {
          commit("loginFail");
          return Promise.reject(error.response.data);
        }
      );
    },

    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },

    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        error => {
          commit("registerFail");
          return Promise.reject(error.reponse.data);
        }
      );
    }
  },

  mutations: {
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },

    loginFail(state) {
      state.status = {};
      state.user = null;
    },

    logout(state) {
      state.status = {};
      state.user = null;
    },

    registerSuccess(state) {
      state.status = {};
    },

    registerFail(state) {
      state.status = {};
    }
  }
};
