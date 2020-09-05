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
    addShowForm: { ...initialState.dashboard },
    activeTab: "overview"
  },
  // synchronous - commit
  mutations: {
    /**
     * Global
     */
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      // state.loading = false
      setTimeout(() => (state.loading = false), 1000);
    },
    setActiveTab(state, tab) {
      state.activeTab = tab;
    },
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
      state.commit("setLoadingTrue");
      API.loginUser(loginCreds)
        .then(({ data: { token } }) => {
          localStorage.setItem("phriendToken", token);
          state.commit("setLoadingFalse");
          router.push("/dashboard");
        })
        .catch(err => {
          if (err.message === "Network Error") {
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
          if (err.message === "Network Error") {
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
          // state.commit("setLoadingFalse");
        })
        .catch(err => {
          if (err.response.status === 403) {
            localStorage.removeItem("phriendData");
            localStorage.removeItem("phriendToken");
            return router.push("/");
          }
          state.commit("setDashboardErrors", err.response.data);
          // state.commit("setLoadingFalse");
        });
    },
    addNewShow(state) {
      state.commit("setLoadingTrue");
      state.commit("clearDashboardErrors");
      API.addNewShow(state.getters.getUserToken, state.getters.getAddShowForm)
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
    removeShow(state, showToRemove) {
      state.commit("setLoadingTrue");
      API.removeShow(state.getters.getUserToken, showToRemove)
        .then(({ data }) => {
          state.commit("setActiveTab", "overview");
          state.commit("setUser", data);
          localStorage.setItem("phriendData", JSON.stringify(data));
          state.commit("setLoadingFalse");
        })
        .catch(err => {
          if (err.response.status === 403) {
            localStorage.removeItem("phriendData");
            localStorage.removeItem("phriendToken");
            return this.$router.push("/");
          }
        });
    }
  },
  modules: {},
  getters: {
    // Gloabl
    getLoadingState: state => state.loading,
    getActiveTab: state => state.activeTab,
    // Login/Signup
    getFormErrors: state => state.formErrors,
    getSignupSuccessMsg: state => state.signupSuccessMsg,
    // Dashboard
    getUser: state => state.user,
    getUserToken: state => state.token,
    getDashboardErrors: state => state.dashboardErrors,
    getAddShowForm: state => state.addShowForm
  }
});
