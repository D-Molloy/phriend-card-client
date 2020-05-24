import axios from "axios";

const url = "http://localhost:8080";

export default {
  // Signin - create new account
  createUser: newUserCreds => {
    console.log("newUserCreds", newUserCreds);
    return axios.post(`${url}/api/auth/create`, newUserCreds);
  },
  // Login - login existing user
  loginUser: loginCreds => {
    return axios.post("/api/auth/login", loginCreds);
  }
  // // Dashboard - get private details of logged-in user
  // getUser: function (token) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   return axios.get('/api/auth/user');
  // },
  // // Dashboard - get all staff (private)
  // getStaff: function (token) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   return axios.get('/api/data');
  // },
};
