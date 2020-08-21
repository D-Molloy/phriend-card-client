<template>
  <div class="mx-auto view_container">
    <p class="font_heading mt-10 mb-n5">Welcome to</p>
    <p class="text-center title_height font_xl font_title_red font_shadow_blue">
      PhriendScore
    </p>
    <p class="text-right font-italic mb-10">Personalized Phish statistics</p>
    <!-- <p>{{ joke }}</p> -->
    <v-card min-width="326">
      <v-card-title>
        <p class="font_title_light font_shadow_red font_md">Login</p>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="loginUser">
          <v-text-field
            label="Email"
            type="text"
            v-model="form.email"
            autocomplete="email"
            prepend-icon="mdi-email"
            :error-messages="errors.email"
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
        </v-form>
        <p v-if="errors.message" align="center" class="red--text">
          {{ errors.message }}
        </p>
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
    <!-- <div class="footer">
      <p>
        Data courtesy of
        <a href="https://phish.net/" target="_blank" rel="noopener noreferrer"
          >Phish.net</a
        >
      </p>
    </div> -->
    <credit-footer />
  </div>
</template>
<script>
import CreditFooter from "@/components/CreditFooter.vue";

const initialState = {
  email: "",
  password: ""
};
export default {
  name: "Login",
  components: {
    "credit-footer": CreditFooter
  },
  data: () => ({
    form: initialState,
    showPassword: false
  }),
  mounted() {
    if (localStorage.getItem("phriendToken")) {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    errors() {
      return this.$store.getters.getFormErrors;
    }
  },
  methods: {
    loginUser() {
      if (!this.form.email || !this.form.password) return;
      this.form = initialState;
      this.$store.dispatch("loginUser", this.form);
    },
    toSignup() {
      this.form = initialState;
      this.$router.push("/create");
    }
  }
};
</script>
