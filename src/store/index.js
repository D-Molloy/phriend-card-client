import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
import API from "../utils/API.js";
Vue.use(Vuex);

const initialState = {
  login: {
    email: "",
    password: "",
    message: ""
  }
};

export default new Vuex.Store({
  state: {
    currentJoke: "How bout that Corona Virus?",
    loginErrors: initialState.login,
    user: {},
    token: ""
  },
  // synchronous - commit
  mutations: {
    setLoginErrors(state, payload) {
      state.loginErrors = payload;
    },
    clearLoginErrors(state) {
      state.loginErrors = initialState.login;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    clearUser(state) {
      state.user = {};
    }
    // setToken(state, paylad) {}
  },
  // asynchronous - dispatch
  actions: {
    loginUser(state, loginCreds) {
      state.commit("clearLoginErrors");
      API.loginUser(loginCreds)
        .then(({ data: { token } }) => {
          localStorage.setItem("phriendToken", token);
          router.push("/dashboard");
        })
        .catch(err => {
          // this.errors = err.response.data;
          state.commit("setLoginErrors", err.response.data);
        });
    }
  },
  modules: {},
  getters: {
    getUser: state => state.user,
    getLoginErrors: state => state.loginErrors
  }
});
