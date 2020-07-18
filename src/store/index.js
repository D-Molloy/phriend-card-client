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
  },
  dashboard: {
    message: "",
    year: "",
    month: "",
    day: ""
  }
};

export default new Vuex.Store({
  state: {
    formErrors: { ...initialState.form },
    signupSuccessMsg: "",
    user: {},
    token: "",
    loading: true,
    dashboardErrors: { ...initialState.dashboard },
    addShowForm: { ...initialState.dashboard }
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
      state.formErrors = { ...initialState.form };
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
    },
    setToken(state, payload) {
      state.token = payload;
    },
    clearToken(state) {
      state.token = "";
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    setDashboardErrors(state, payload) {
      state.dashboardErrors = payload;
    },
    clearDashboardErrors(state) {
      state.dashboardErrors = { ...initialState.dashboard };
    },
    updateAddShowForm(state, payload) {
      state.addShowForm = payload;
    },
    resetAddShowForm(state) {
      state.addShowForm = { ...initialState.dashboard };
    }
  },
  // asynchronous - dispatch
  actions: {
    /**
     * Login/Signup actions
     */
    loginUser(state, loginCreds) {
      state.commit("clearFormErrors");
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
    },
    /**
     * Dashboard actions
     */
    getUserInfo(state) {
      API.getUserInfo(state.getters.getUserToken)
        .then(({ data }) => {
          state.commit("setUser", data);
          localStorage.setItem("phriendData", JSON.stringify(data));
          state.commit("setLoadingFalse");
        })
        .catch(err => {
          if (err.response.status === 403) {
            localStorage.removeItem("phriendData");
            localStorage.removeItem("phriendToken");
            return router.push("/");
          }
          state.commit("setDashboardErrors", err.response.data);
          state.commit("setLoadingFalse");
        });
    },
    addNewShow(state) {
      API.addNewShow(state.getters.getUserToken, state.getters.getAddShowForm)
        .then(({ data }) => {
          state.commit("setUser", data);
          localStorage.setItem("phriendData", JSON.stringify(data));
          state.commit("setLoadingFalse");
        })
        .catch(err => {
          console.log("err", err);
          if (err.response.status === 403) {
            localStorage.clear();
            return router.push("/");
          }
          state.commit("setDashboardErrors", err.response.data);
          state.commit("setLoadingFalse");
        });
    }
  },
  modules: {},
  getters: {
    // Login/Signup
    getFormErrors: state => state.formErrors,
    getSignupSuccessMsg: state => state.signupSuccessMsg,
    // Dashboard
    getUser: state => state.user,
    getUserToken: state => state.token,
    getLoadingState: state => state.loading,
    getDashboardErrors: state => state.dashboardErrors,
    getAddShowForm: state => state.addShowForm
  }
});
