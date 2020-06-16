<template>
  <div v-if="user.showScoreAverage" class="grid">
    <div class="grid_score item_bg">
      <h1>
        {{ user.username }}'s PhriendScore:
        {{ user.showScoreAverage.toFixed(3) }}
      </h1>
    </div>
    <div class="grid_total_shows item_bg">
      <p>Shows Seen: {{ user.shows.length }}</p>
    </div>
    <div class="grid_total_songs item_bg">
      <p>Songs heard: {{ user.totalSongsHeard }}</p>
    </div>
    <div class="grid_venue_summary item_bg">
      <p>Total Venues: {{ user.venueSummary.length }}</p>
      <p>
        Favorite venue: {{ user.venueSummary[0].venue }} ({{
          user.venueSummary[0].shows.length
        }}
        show{{ user.venueSummary[0].shows.length > 1 ? "s" : "" }})
      </p>
      <p>
        Best Venue: {{ topShow.venue }} ({{ topShow.venueRating.toFixed(3) }})
      </p>
    </div>
    <div class="grid_frequent item_bg">
      <p>Frequent Songs:</p>
      <p v-for="song in user.songFrequency.slice(0, 3)" :key="song[0]">
        {{ song[0] }} x {{ song[1] }}
      </p>
    </div>
    <div class="grid_days item_bg">
      <scores-by-day :days="user.avgShowScoreByDay" />
    </div>
    <div class="grid_years item_bg">
      <scores-by-year :years="user.avgShowScoreByYear" />
    </div>
    <div class="grid_best item_bg">
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
    <div class="grid_worst item_bg">
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
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(5, 1fr); */
  /* grid-template-rows: minmax(min-content, max-content); */
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 20px;
}

.grid_score {
  grid-area: 1 / 1 / 2 / 3;
}
.grid_total_shows {
  grid-area: 1 / 3 / 2 / 4;
}
.grid_total_songs {
  grid-area: 1 / 4 / 2 / 5;
}
.grid_venue_summary {
  grid-area: 2 / 1 / 3 / 2;
}
.grid_frequent {
  grid-area: 2 / 2 / 3 / 3;
}
.grid_days {
  grid-area: 2 / 3 / 3 / 4;
}
.grid_years {
  grid-area: 2 / 4 / 3 / 5;
}
.grid_best {
  grid-area: 3 / 1 / 5 / 3;
}
.grid_worst {
  grid-area: 3 / 3 / 5 / 5;
}
.item_bg {
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 9px;
}
</style>

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
