<template>
  <div v-if="user.showScoreAverage" class="grid">
    <div class="grid_score item">
      <h1 class="font_title_light font_shadow_red font_xl">
        {{ user.username }}'s PhriendScore:
        {{ user.showScoreAverage.toFixed(3) }}
      </h1>
    </div>
    <div class="grid_total_shows item">
      <p class="font_heading mt-2">Shows Seen</p>
      <p class="font_title_light font_lg">{{ user.shows.length }}</p>
    </div>
    <div class="grid_total_songs item">
      <p class="font_heading mt-2">Songs Heard</p>
      <p class="font_title_light font_lg">{{ user.totalSongsHeard }}</p>
    </div>
    <div class="grid_venue_summary item">
      <div class="d-flex justify-center align-center">
        <p class="font_heading">Total Venues:</p>
        <p class="font_title_light font_md mx-2">
          {{ user.venueSummary.length }}
        </p>
      </div>

      <p class="font_heading">
        Favorite Venue
      </p>
      <p class="font_title_light font_md">
        {{ user.venueSummary[0].venue }}
      </p>
      <p class="font_subtitle mb-2">
        {{ user.venueSummary[0].shows.length }} show{{
          user.venueSummary[0].shows.length > 1 ? "s" : ""
        }}
      </p>
      <p class="font_heading">
        Best Venue
      </p>
      <p class="font_title_light font_md">
        {{ topShow.venue }}
      </p>
      <p class="font_subtitle mb-2">{{ topShow.venueRating.toFixed(3) }}</p>
    </div>

    <div class="grid_frequent item">
      <p class="font_heading">Frequent Songs:</p>
      <p class="font_title_light font_heading" v-for="song in user.songFrequency.slice(0, 5)" :key="song[0]">
        {{ song[0] }} ({{ song[1] }})
      </p>
    </div>
    <div class="grid_days item">
      <scores-by-day :days="user.avgShowScoreByDay" />
    </div>
    <div class="grid_years item">
      <scores-by-year :years="user.avgShowScoreByYear" />
    </div>
    <div class="grid_best item">
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
    <div class="grid_worst item">
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
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(5, 1fr); */
  grid-template-rows: minmax(min-content, max-content);
  /* grid-template-rows: auto; */
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
.item {
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
