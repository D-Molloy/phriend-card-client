<template>
  <div class="mx-auto view_container">
    <p class="font_heading heading mt-5 mb-n5 ml-sm-3">
      Welcome to
    </p>
    <p class="text-center title_height font_xl font_title_red font_shadow_blue">
      PhriendScore
    </p>
    <p class="text-right font-italic mb-5 mr-3">
      Personalized Phish Statistics
    </p>
    <v-card min-width="326">
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
            :rules="[v => !!v || 'Username is required']"
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
            :rules="[v => !!v || 'Email is required']"
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
            :rules="[v => !!v || 'Password is required']"
          />
          <v-text-field
            label="Confirm Password"
            :type="showPassword ? 'text' : 'password'"
            v-model="form.confirmPassword"
            autocomplete="current-password"
            prepend-icon="mdi-lock"
            :error-messages="errors.confirmPassword"
            required
            :rules="[v => !!v || 'Password confirmation is required']"
          />

          <p v-if="signupSuccessMsg" align="center" class="green--text">
            {{ signupSuccessMsg }}
          </p>
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
    <credit-footer />
  </div>
</template>
<style>
.title_height {
  height: 75px;
}
@media only screen and (max-width: 775px) {
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
import CreditFooter from "@/components/CreditFooter.vue";
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};
export default {
  name: "signup",
  components: {
    "credit-footer": CreditFooter
  },
  data: () => ({
    form: initialState,
    showPassword: false
  }),
  computed: {
    errors() {
      return this.$store.getters.getFormErrors;
    },
    signupSuccessMsg() {
      return this.$store.getters.getSignupSuccessMsg;
    }
  },
  methods: {
    signup() {
      if (
        !this.form.email ||
        !this.form.password ||
        !this.form.confirmPassword ||
        !this.form.username
      )
        return;
      this.$store.dispatch("createUser", this.form);
      this.form = initialState;
    },
    toLogin() {
      this.$store.commit("clearFormErrors");
      this.form = initialState;
      this.$router.push("/");
    }
  }
};
</script>
