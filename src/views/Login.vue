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

      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
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

  methods: {
    loginUser(e) {
      e.preventDefault();
      if (this.form.email && this.form.password) {
        console.log("submitting form");
      }
    }
  }
  // components: { Navbar }
};
</script>
