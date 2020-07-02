<template>
  <div class="mx-auto">
    <p class="font_heading heading mt-5 mb-n5 ml-sm-3">
      Welcome to
    </p>
    <p class="text-center title_height font_xl font_title_red font_shadow_blue">
      PhriendScore
    </p>
    <p class="text-right font-italic mb-5 mr-3">
      Presonalized Phish Statistics
    </p>
    <v-card class="mx-auto my-auto p3-3">
      <v-card-title>
        <p class="font_title_light font_shadow_red font_md">Create Account</p>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="signup">
          <v-text-field
            label="Username"
            type="text"
            v-model="form.username"
            autocomplete="username"
            prepend-icon="mdi-account-circle"
            :error-messages="errors.username"
            autofocus
            required
          />
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
          <v-text-field
            label="Confirm Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="form.confirmPassword"
            autocomplete="current-password"
            prepend-icon="mdi-lock"
            required
            :error-messages="errors.confirmPassword"
          />

          <p v-if="message" align="center" class="green--text">{{ message }}</p>
          <p v-if="errors.message" align="center" class="red--text">
            {{ errors.message }}
          </p>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-3">
        <v-btn large color="blue darken-3 my-2 white--text" @click="signup"
          >Create Account</v-btn
        >
        <v-spacer />
        <v-btn
          large
          outlined
          color="red darken-1 my-2 white--text"
          @click="toLogin"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<style>
.title_height {
  height: 75px;
}
@media only screen and (max-width: 775px) {
  /* .font_heading.mt-10{
    margin-top:20px
  } */
  .font_heading.heading {
    font-size: 20px;
    /* margin-top:10px; */
  }
  .title_height {
    height: 60px;
  }
  .title_height.font_xl {
    font-size: 3em;
  }
}
</style>
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
    errors: {},
    showPassword: false
  }),

  methods: {
    signup() {
      this.errors = {};
      API.createUser(this.form)
        .then(({ data }) => {
          this.message = data;
          // TODO: make sure this works
          this.form = initialState;
          setTimeout(() => {
            this.message = "";
            this.$router.push("/");
          }, 2000);
        })
        .catch(err => {
          // TODO: setup error-message on 500
          // console.log("error", err);
          // console.log("error", err.response);
          this.errors = err.response.data;
        });
    },
    toLogin() {
      this.$router.push("/");
    }
  }
};
</script>
