import axios from "axios";

// const url = "http://localhost:8080";

export default {
  // Signin - create new account
  createUser: newUserCreds => {
    console.log("newUserCreds", newUserCreds);
    return axios.post(`/api/auth/create`, newUserCreds);
  },
  // Login - login existing user
  loginUser: loginCreds => {
    return axios.post("/api/auth/login", loginCreds);
  },
  // // Dashboard - get private details of logged-in user
  getUserInfo: function(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get("/api/setlist/");
  },
  addNewShow: function(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post("/api/setlist/");
  }
  // // Dashboard - get all staff (private)
  // getStaff: function (token) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   return axios.get('/api/data');
  // },
};
