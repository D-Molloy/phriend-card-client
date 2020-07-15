import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// const url = "https://icanhazdadjoke.com";
// const headers = { Accept: "application/json" };

// const initialState = {
//   login: {
//     email: "",
//     password: ""
//   }
// }
export default new Vuex.Store({
  state: {
    currentJoke: "How bout that Corona Virus?",
    loginErrors:{}
  },
  // synchronous
  mutations: {
    setCurrentJoke(state, payload) {
      state.currentJoke = payload;
      state.allJokes.push(payload);
    }
  },
  // asynchronous
  actions: {
    // async setCurrentJoke(state) {
    //   const joke = await fetch(url, { headers });
    //   const j = await joke.json();
    //   state.commit("setCurrentJoke", j.joke);
    // }
  },
  modules: {},
  getters: {
    getCurrentJoke: state => state.currentJoke
  }
});
