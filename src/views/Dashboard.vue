<template>
  <div>
    <div class="dashboard" align="center" v-if="user.username">
      <h1>{{ user.username }}'s Phriendcard</h1>
      <template v-if="user.showScoreAverage">
        <p>Shows Attended: {{ user.shows.length }}</p>
        <p>Avg. Show Score: {{ user.showScoreAverage.toFixed(3) }}</p>
        <p>Total songs heard: {{ user.totalSongsHeard }}</p>
        <p>Total venues: {{ user.venueSummary.length }}</p>

        <h1>Your Shows ({{ user.shows.length }})</h1>
        <!-- add remove show button -->
        <div class="card" v-for="show in user.shows" :key="show._id">
          <h3>
            {{ show.venue }}, {{ show.location }} ------ {{ show.day }},
            {{ show.date }}
          </h3>
          <p>
            Show Rating: {{ show.rating.toFixed(3) }} | Show Song Count:
            {{ show.setlist.songCount }}
          </p>
          <a :href="show.phishnetUrl" target="_blank" rel="noopener noreferrer"
            >View show details on Phish.net</a
          >
          <div v-for="(value, key) in show.setlist" :key="key">
            <!-- Need to update to 'Set' when adding new shows -->
            <p v-if="key.substring(0, 3) === 'set'">
              {{ key }}: <span>{{ value.join(", ") }}</span>
            </p>
          </div>
        </div>

        <h1>Your Venue Summary</h1>
        <div
          class="card"
          v-for="venue in user.venueSummary"
          :key="venue.location"
        >
          <h3>{{ venue.venue }}, {{ venue.location }}</h3>
          <p>Shows at venue: {{ venue.shows.length }}</p>
          <p>Avg Show Score: {{ venue.venueRating.toFixed(3) }}</p>
          <div class="venue_show_container">
            <div
              class="venue_show_div"
              v-for="show in venue.shows"
              :key="show.date"
            >
              <a
                :href="show.phishnetUrl"
                target="_blank"
                rel="noopener noreferrer"
                title="View show details on Phish.net"
                >{{ show.date }}</a
              >
              <p>{{ show.day }}</p>
              <p>Rating: {{ show.rating.toFixed(3) }}</p>
            </div>
          </div>
        </div>
        <h1>Your Song Summary</h1>
        <p>Total songs heard: {{ user.totalSongsHeard }}</p>
        <div v-for="song in user.songFrequency" :key="song[0]">
          <h4>
            <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
            >)
          </h4>
        </div>
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
          <!-- <option value="saab">Saab</option>
          <option value="audi">Audi</option> -->
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
        <p v-if="errors.message">{{errors.message}}</p>
      </div>
    </div>
    <!-- :disabled="!showYear || !showMonth || !showDay" -->
    <!-- wait for content to load -->
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
<style>
.card {
  border: 1px solid black;
  max-width: 90%;
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
import Loading from "@/components/Loading.vue";
import API from "../utils/API.js";
import dates from "../utils/dates.js";
export default {
  name: "dashboard",
  components: {
    Loading
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
      console.log("No token");
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
          console.log(err);
        });
    }
  },
  methods: {
    addNewShow() {
      this.errors={};
      API.addNewShow(this.token, this.newShow)
        .then(({data}) => {
          this.user = data;
          localStorage.setItem("phriendData", JSON.stringify(data));
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
    // TODO: add a logout
  }
};
</script>
