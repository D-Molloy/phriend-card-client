<template>
  <v-card class="mx-auto my-auto">
    <v-card-title>
      <p class="font_title_light font_shadow_red font_md">Login</p>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          type="text"
          v-model="form.email"
          autocomplete="email"
          prepend-icon="mdi-email"
          :error-messages="errors.email"
          autofocus
          required
        />
        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="form.password"
          autocomplete="current-password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :error-messages="errors.password"
          required
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions class="px-3">
      <v-btn large color="blue darken-3 my-2 white--text" @click="loginUser"
        >Login</v-btn
      >
      <v-spacer />
      <v-btn
        large
        outlined
        color="red darken-1 my-2 white--text"
        @click="toSignup"
        >Create Account</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import API from "../utils/API.js";

const initialState = {
  email: "",
  password: ""
};
export default {
  name: "Login",
  data: () => ({
    form: initialState,
    errors: {},
    showPassword: false
  }),
  mounted() {
    if (localStorage.getItem("phriendToken")) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    loginUser() {
      this.errors = {};
      API.loginUser(this.form)
        .then(({ data: { token } }) => {
          localStorage.setItem("phriendToken", token);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    },
    toSignup() {
      this.$router.push("/create");
    }
  }
  // components: { Navbar }
};
</script>
