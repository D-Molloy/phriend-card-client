<template>
  <div class="signup">
    <h1>Create Account</h1>
    <form @submit.prevent="signup">
      <input
        type="text"
        v-model="form.username"
        ref="username"
        placeholder="DukeOfLizards"
        autocomplete="username"
        autofocus
        required
      />
      <p v-if="errors.username">{{ errors.username }}</p>
      <input
        type="text"
        v-model="form.email"
        ref="email"
        placeholder="wilson@lizards.com"
        autocomplete="email"
        required
      />
      <p v-if="errors.email">{{ errors.email }}</p>
      <input
        type="password"
        v-model="form.password"
        placeholder="password"
        autocomplete="current-password"
        required
      />
      <p v-if="errors.password">{{ errors.password }}</p>
      <input
        type="password"
        v-model="form.confirmPassword"
        placeholder="Confirm password"
        autocomplete="current-password"
        required
      />
      <p v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
      <button>Create Account</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <router-link to="/">Login</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import API from "../utils/API.js";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};
export default {
  name: "signup",
  data: () => ({
    form: initialState,
    message: "",
    errors: {}
  }),

  methods: {
    signup(e) {
      e.preventDefault();
      this.errors = {};
      API.createUser(this.form)
        .then(({ data }) => {
          console.log("Create Success:", data);
          this.message = data;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch(err => {
          this.errors = err.response.data;
          console.log(err.response.data);
        });
    }
  }
};
</script>
