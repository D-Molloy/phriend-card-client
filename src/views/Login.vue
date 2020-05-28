<template>
  <div class="login">
    <h1>This is Login</h1>
    <form @submit.prevent="loginUser">
      <input
        type="text"
        v-model="form.email"
        ref="email"
        placeholder="wilson@lizards.com"
        autocomplete="email"
        autofocus
        required
      />
      <p v-if="errors.email">{{ errors.email }}</p>
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
      <p v-if="errors.password">{{ errors.password }}</p>
      <button>Login</button>
    </form>
    <div id="nav">
      <router-link to="/signup">Create Account</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import API from "../utils/API.js";
const initialState = {
  email: "",
  password: ""
};
export default {
  name: "Login",
  data: () => ({
    form: initialState,
    errors: {}
  }),
  mounted() {
    if (localStorage.getItem("phriendToken")) {
      this.$router.push("/dashboard");
    }
  },
  // TODO: redirect if phriendToken in localStorage
  methods: {
    loginUser() {
      // e.preventDefault();
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
  }
  // components: { Navbar }
};
</script>
