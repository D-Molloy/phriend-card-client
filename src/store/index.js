import Vue from "vue";
import Vuex from "vuex";
import API from "../utils/API.js";
Vue.use(Vuex);
// const url = "https://icanhazdadjoke.com";
// const headers = { Accept: "application/json" };

const initialState = {
  login: {
    email: "",
    password: ""
  }
};
export default new Vuex.Store({
  state: {
    currentJoke: "How bout that Corona Virus?",
    loginErrors: initialState.login,
    user: {}
  },
  // synchronous
  mutations: {
    setCurrentJoke(state, payload) {
      state.currentJoke = payload;
      state.allJokes.push(payload);
    },
    setLoginErrors(state, payload) {
      state.loginErrors = payload;
    },
    clearLoginErrors(state) {
      state.loginErrors = initialState.login;
    },
    setUser(state,payload){
      state.user = payload;
    },
    clearUser(state){
      state.user={};
    }
  },
  // asynchronous
  actions: {
    // async setCurrentJoke(state) {
    //   const joke = await fetch(url, { headers });
    //   const j = await joke.json();
    //   state.commit("setCurrentJoke", j.joke);
    // }
    async loginUser(loginCreds) {
      console.log("loginCreds", loginCreds);
      this.errors = {};
      API.loginUser(this.form)
        .then(({ data: { token } }) => {
          localStorage.setItem("phriendToken", token);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  modules: {},
  getters: {
    getCurrentJoke: state => state.currentJoke
  }
});
