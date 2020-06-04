<template>
  <div>
    <div class="dashboard" align="center" v-if="user.username">
      <h1>{{ user.username }}'s Phriendcard</h1>
      <template v-if="user.showScoreAverage">
        <p>Shows Attended: {{ user.shows.length }}</p>
        <p>Avg. Show Score: {{ user.showScoreAverage.toFixed(3) }}</p>
        <p>Total songs heard: {{ user.totalSongsHeard }}</p>
        <p>Total venues: {{ user.venueSummary.length }}</p>
        <scores-by-year :years="user.avgShowScoreByYear" />
        <shows-overview :shows="user.shows" />
        <venues-overview :venues="user.venueSummary" />
        <song-frequency
          :songs="user.songFrequency"
          :total-songs-heard="user.totalSongsHeard"
        />
      </template>
      <template v-else>
        <h1>Add a show to see your PhriendCard.</h1>
      </template>
      <div>
        <h3>Add a new show</h3>
        <select name="year" id="year" v-model="newShow.year" required>
          <option value="" default>Select year</option>
          <option v-for="year in dates.years" :key="year" :value="year">{{
            year
          }}</option>
        </select>
        <p v-if="errors.year">{{ errors.year }}</p>
        <select name="month" id="month" v-model="newShow.month" required>
          <option value="" default>Select month</option>
          <option v-for="month in dates.months" :key="month" :value="month">{{
            month
          }}</option>
        </select>
        <p v-if="errors.month">{{ errors.month }}</p>
        <select name="day" id="day" v-model="newShow.day" required>
          <option value="" default>Select day</option>
          <option v-for="day in dates.days" :key="day" :value="day">{{
            day
          }}</option>
        </select>
        <p v-if="errors.day">{{ errors.day }}</p>
        <button
          @click="addNewShow"
          :disabled="!newShow.year || !newShow.month || !newShow.day"
        >
          Add Show
        </button>
        <p v-if="errors.message">{{ errors.message }}</p>
      </div>
    </div>
    <div v-else>
      <loading-spinner />
    </div>
  </div>
</template>
<style>
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
import SongFrequency from "@/components/SongFrequency.vue";
import ShowsOverview from "@/components/ShowsOverview.vue";
import VenuesOverview from "@/components/VenuesOverview.vue";
import ScoreByYear from "@/components/ScoreByYear.vue";
import API from "../utils/API.js";
import dates from "../utils/dates.js";

export default {
  name: "dashboard",
  components: {
    "loading-spinner": LoadingSpinner,
    "song-frequency": SongFrequency,
    "shows-overview": ShowsOverview,
    "venues-overview": VenuesOverview,
    "scores-by-year": ScoreByYear
  },
  data: () => ({
    user: {},
    token: "",
    errors: {},
    dates: dates,
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
      this.$router.push("/");
    }
    this.token = token;
    if (phriendData) {
      this.user = phriendData;
    } else {
      API.getUserInfo(this.token)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  methods: {
    addNewShow() {
      this.errors = {};
      API.addNewShow(this.token, this.newShow)
        .then(({ data }) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
        })
        .catch(err => {
          console.log("err.response", err.response);
          if (err.response.status === 403) {
            localStorage.clear();
            this.$router.push("/");
          }
          this.errors = err.response.data;
        });
    }
    // TODO: add a logout
  }
};
</script>
