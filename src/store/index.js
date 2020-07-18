import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
import API from "../utils/API.js";

Vue.use(Vuex);

const initialState = {
  form: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: ""
  }
};

export default new Vuex.Store({
  state: {
    formErrors: initialState.form,
    signupSuccessMsg: "",
    user: {},
    token: "",
    loading: true
  },
  // synchronous - commit
  mutations: {
    /**
     * Login/Signup mutations
     */
    setFormErrors(state, payload) {
      state.formErrors = payload;
    },
    clearFormErrors(state) {
      state.formErrors = initialState.form;
    },
    setSignupSuccessMsg(state, payload) {
      state.signupSuccessMsg = payload;
    },
    clearSignupSuccessMsg(state) {
      state.signupSuccessMsg = "";
    },
    /**
     * Dashboard mutations
     */
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
    /**
     * Login/Signup actions
     */
    loginUser(state, loginCreds) {
      state.commit("clearLoginErrors");
      API.loginUser(loginCreds)
        .then(({ data: { token } }) => {
          localStorage.setItem("phriendToken", token);
          router.push("/dashboard");
        })
        .catch(err => {
          if (err.response.status === 500) {
            return state.commit("setFormErrors", {
              message: "Problem on our end.  Please try again later."
            });
          }
          state.commit("setFormErrors", err.response.data);
        });
    },
    createUser(state, signupCreds) {
      state.commit("clearFormErrors");
      API.createUser(signupCreds)
        .then(({ data }) => {
          state.commit("setSignupSuccessMsg", data);
          setTimeout(() => {
            state.commit("clearSignupSuccessMsg");
            router.push("/");
          }, 2000);
        })
        .catch(err => {
          if (err.response.status === 500) {
            return state.commit("setFormErrors", {
              message: "Problem on our end.  Please try again later."
            });
          }

          state.commit("setFormErrors", err.response.data);
        });
    }
    /**
     * Dashboard mutations
     */
    // getUserInfo(state, jwt){

    // }
  },
  modules: {},
  getters: {
    getUser: state => state.user,
    getFormErrors: state => state.formErrors,
    getSignupSuccessMsg: state => state.signupSuccessMsg
  }
});
