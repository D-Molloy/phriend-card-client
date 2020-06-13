<template>
  <div v-if="user.showScoreAverage">
    <h1>{{ user.username }}'s PhriendScore</h1>
    <p>Avg. Show Score: {{ user.showScoreAverage.toFixed(3) }}</p>
    <p>Shows Attended: {{ user.shows.length }}</p>
    <hr />
    <p>Total Venues: {{ user.venueSummary.length }}</p>
    <p>
      Favorite venue: {{ user.venueSummary[0].venue }} ({{
        user.venueSummary[0].shows.length
      }}
      show{{ user.venueSummary[0].shows.length > 1 ? "s" : "" }})
    </p>
    <p>Top Venue: {{ topShow.venue }} ({{ topShow.venueRating }})</p>
    <hr />
    <p>Songs heard: {{ user.totalSongsHeard }}</p>
    <p>Frequent Songs:</p>
    <p v-for="song in user.songFrequency.slice(0, 3)" :key="song[0]">
      {{ song[0] }} x {{ song[1] }}
    </p>
    <hr />
    <scores-by-day :days="user.avgShowScoreByDay" />
    <scores-by-year :years="user.avgShowScoreByYear" />
    <div>
      <h1>Best Show</h1>
      <h3>
        {{ user.showBest.venue }}, {{ user.showBest.location }} ------
        {{ user.showBest.day }},
        {{ user.showBest.date }}
      </h3>
      <p>
        Show Rating: {{ user.showBest.rating.toFixed(3) }} | Show Song Count:
        {{ user.showBest.setlist.songCount }}
      </p>
      <a
        :href="user.showBest.phishnetUrl"
        target="_blank"
        rel="noopener noreferrer"
        >View show details on Phish.net</a
      >
      <div v-for="(value, key) in user.showBest.setlist" :key="key">
        <p v-if="key.substring(0, 3) === 'Set'">
          {{ key }}: <span>{{ value.join(", ") }}</span>
        </p>
      </div>
    </div>
    <div>
      <h1>Worst Show</h1>
      <h3>
        {{ user.showWorst.venue }}, {{ user.showWorst.location }} ------
        {{ user.showWorst.day }},
        {{ user.showWorst.date }}
      </h3>
      <p>
        Show Rating: {{ user.showWorst.rating.toFixed(3) }} | Show Song Count:
        {{ user.showWorst.setlist.songCount }}
      </p>
      <a
        :href="user.showWorst.phishnetUrl"
        target="_blank"
        rel="noopener noreferrer"
        >View show details on Phish.net</a
      >
      <div v-for="(value, key) in user.showWorst.setlist" :key="key">
        <p v-if="key.substring(0, 3) === 'Set'">
          {{ key }}: <span>{{ value.join(", ") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ScoresByYear from "@/components/ScoresByYear.vue";
import ScoresByDay from "@/components/ScoresByDay.vue";

export default {
  name: "UserOverview",
  props: {
    user: {
      type: Object
    }
  },
  components: {
    "scores-by-year": ScoresByYear,
    "scores-by-day": ScoresByDay
  },
  data: () => ({
    topShow: {}
  }),
  created() {
    this.topShow = this.user.venueSummary.reduce((best, currentValue) => {
      if (best.venueRating > currentValue.venueRating) {
        return best;
      } else {
        return currentValue;
      }
    }, this.user.venueSummary[0]);
  }
};
</script>
