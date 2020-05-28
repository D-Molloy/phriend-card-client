<template>
  <div>
    <div class="dashboard" align="center" v-if="user.username">
      <h1>{{ user.username }}'s Phriendcard</h1>
      <p>Shows Attended: {{ user.shows.length }}</p>
      <p>Avg. Show Score: {{ user.showScoreAverage.toFixed(3) }}</p>
      <p>Total songs heard: {{ user.totalSongsHeard }}</p>
      <p>Total venues: {{ user.venueSummary.length }}</p>

      <h1>Shows</h1>
      <div class="show-card" v-for="show in user.shows" :key="show._id">
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
        <div v-for="(value, key, index) in show.setlist" :key="index">
          <!-- Need to update to Set when adding new shows -->
          <p v-if="key.substring(0, 3) === 'set'">
            {{ key }}: <span>{{ value.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
<style>
.show-card {
  border: 1px solid black;
  max-width: 90%;
}
</style>

<script>
import Loading from "@/components/Loading.vue";
import API from "../utils/API.js";
export default {
  name: "dashboard",
  components: {
    Loading
  },
  data: () => ({
    user: {},
    errors: {}
  }),
  mounted() {
    const token = localStorage.getItem("phriendToken");
    if (token) {
      API.getUserInfo(token).then(({ data }) => {
        console.log(data);
        this.user = data;
      });
    } else {
      this.$router.push("/");
    }
  }
  // methods: {

  // }
};
</script>
