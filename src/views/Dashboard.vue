<template>
  <div>
    <div v-if="loading">
      <loading-spinner />
    </div>
    <div class="dashboard" align="center" v-else>
      <div class="nav_tabs" v-if="user.showScoreAverage">
        <p @click="activeTab = 'overview'">Overview</p>
        <p @click="activeTab = 'shows'">Shows</p>
        <p @click="activeTab = 'venues'">Venues</p>
        <p @click="activeTab = 'songs'">Songs</p>
      </div>
      <div v-if="activeTab === 'overview'">
        <h1>{{ user.username }}'s Phriendcard</h1>
        <template v-if="user.showScoreAverage">
          <user-overview :user="user" />
        </template>
        <template v-else>
          <h1>Add a show to see your PhriendCard.</h1>
        </template>
      </div>
      <div v-if="activeTab === 'shows'">
        <shows-overview :shows="user.shows || []" />
      </div>
      <div v-if="activeTab === 'venues'">
        <venues-overview :venues="user.venueSummary || []" />
      </div>
      <div v-if="activeTab === 'songs'">
        <songs-overview
          :songs="user.songFrequency"
          :total-songs-heard="user.totalSongsHeard"
        />
      </div>
      <!-- NEW SHOW FORM -->
      <h3>Add a new show</h3>
      <div class="input_form">
        <v-select
          :items="dates.years"
          label="Year"
          v-model="newShow.year"
          :error-messages="errors.year"
          solo
        />
        <v-select
          :items="dates.months"
          label="Month"
          v-model="newShow.month"
          :error-messages="errors.month"
          solo
        />
        <v-select
          :items="dates.days"
          label="Day"
          v-model="newShow.day"
          :error-messages="errors.day"
          solo
        />
        <v-btn
          color="success"
          @click="addNewShow"
          :disabled="!newShow.year || !newShow.month || !newShow.day"
        >
          Add Show
        </v-btn>
        <p v-if="errors.message">{{ errors.message }}</p>
      </div>
    </div>
  </div>
</template>
<style>
.input_form {
  display: flex;
}
.nav_tabs {
  display: flex;
  justify-content: space-between;
}
.card {
  border: 1px solid black;
  max-width: 90%;
}
.overview_container {
  max-height: 400px;
  overflow: auto;
  border: 1px solid grey;
}

.venue_show_container {
  border: 1px solid green;
  display: flex;
  overflow-x: auto;
}
.venue_show_div {
  border: 1px solid black;
  margin: 0 10px;
  padding: 5px;
  min-width: 100px;
}
</style>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UserOverview from "@/components/UserOverview.vue";
import SongsOverview from "@/components/SongsOverview.vue";
import ShowsOverview from "@/components/ShowsOverview.vue";
import VenuesOverview from "@/components/VenuesOverview.vue";

import API from "../utils/API.js";
import dates from "../utils/dates.js";

export default {
  name: "dashboard",
  components: {
    "loading-spinner": LoadingSpinner,
    "user-overview": UserOverview,
    "songs-overview": SongsOverview,
    "shows-overview": ShowsOverview,
    "venues-overview": VenuesOverview
  },
  data: () => ({
    user: {},
    token: "",
    errors: {},
    loading: true,
    dates: dates,
    activeTab: "overview",
    newShow: {
      year: "",
      month: "",
      day: ""
    }
  }),
  mounted() {
    const token = localStorage.getItem("phriendToken");
    const phriendData = JSON.parse(localStorage.getItem("phriendData"));

    if (!token) {
      localStorage.clear();
      return this.$router.push("/");
    }
    this.token = token;
    if (phriendData) {
      this.user = phriendData;
      this.loading = false;
    } else {
      API.getUserInfo(this.token)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
          this.loading = false;
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  methods: {
    addNewShow() {
      this.loading = true;
      this.errors = {};
      API.addNewShow(this.token, this.newShow)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
          this.loading = false;
        })
        .catch(err => {
          console.log("err.response", err.response);
          if (err.response.status === 403) {
            localStorage.clear();
            return this.$router.push("/");
          }
          // TODO: check bad dates
          this.errors = err.response.data;
          this.loading = false;
        });
    }
    // TODO: add a logout
  }
};
</script>
