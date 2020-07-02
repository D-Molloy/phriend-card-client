import axios from "axios";

// const url = "http://localhost:8081";
const url = "https://phriendscore-api.herokuapp.com";

export default {
  // Signin - create new account
  createUser: newUserCreds => {
    return axios.post(`${url}/api/auth/create`, newUserCreds);
  },
  // Login - login existing user
  loginUser: loginCreds => {
    return axios.post(`${url}/api/auth/login`, loginCreds);
  },
  // // Dashboard - get private details of logged-in user
  getUserInfo: function(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get(`${url}/api/setlist/`);
  },
  addNewShow: function(token, showDate) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post(`${url}/api/setlist/`, showDate);
  }
};
