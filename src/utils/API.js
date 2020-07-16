import axios from "axios";

let url;

if (process.env.NETLIFY) {
  url = "https://phriendscore-api.herokuapp.com";
} else {
  // url = "https://phriendscore-api.herokuapp.com";
  url = "http://localhost:8081";
}

export default {
  // Signin - create new account
  createUser: newUserCreds => {
    return axios.post(`${url}/api/auth/create`, newUserCreds);
  },
  // Login - login existing user
  loginUser: loginCreds => {
    return axios.post(`${url}/api/auth/login`, loginCreds);
  },
  // Dashboard - get private details of logged-in user
  getUserInfo: token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.get(`${url}/api/setlist/`);
  },
  // Add a new show to User's show array
  addNewShow: (token, showDate) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.post(`${url}/api/setlist/`, showDate);
  },
  // Remove show from Users's show array
  removeShow: (token, id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios.delete(`${url}/api/setlist/${id}`);
  }
};
