import AuthService from "../service/auth.service";

const user = JSON.parse(localStorage.getItem("NerdBro-User"));
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
      return new Promise((resolve, reject) => {
        AuthService.logout();
        commit("logout");
        resolve();
        var t = false;
        if (t) {
          reject();
        }
      });
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
      state.status = { loggedIn: false };
      state.user = null;
    },

    logout(state) {
      state.status = { loggedIn: false };
      state.user = null;
    },

    registerSuccess(state) {
      state.status = { loggedIn: false };
      state.user = null;
    },

    registerFail(state) {
      state.status = { loggedIn: false };
      state.user = null;
    }
  }
};
