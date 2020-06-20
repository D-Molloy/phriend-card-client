<template>
  <div v-if="user.showScoreAverage" class="grid">
    <div class="grid_score item_bg flex_column_center">
      <h1 class="font_title_light font_shadow_red font_xl mt-2">
        {{ user.username }}'s PhriendScore:
        {{ user.showScoreAverage.toFixed(3) }}
      </h1>
    </div>
    <div class="grid_total_shows item_bg flex_column_center">
      <p class="font_heading mt-2">Shows Seen</p>
      <p class="font_title_light font_lg">{{ user.shows.length }}</p>
    </div>
    <div class="grid_total_songs item_bg flex_column_center">
      <p class="font_heading mt-2">Songs Heard</p>
      <p class="font_title_light font_lg">{{ user.totalSongsHeard }}</p>
    </div>
    <div class="grid_venue_summary item_bg flex_column_center">
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
        ({{ user.venueSummary[0].shows.length }} show{{
          user.venueSummary[0].shows.length > 1 ? "s" : ""
        }})
      </p>
      <p class="font_heading">
        Best Venue
      </p>
      <p class="font_title_light font_md">
        {{ topShow.venue }}
      </p>
      <p class="font_subtitle mb-2">({{ topShow.venueRating.toFixed(3) }})</p>
    </div>

    <div class="grid_frequent item_bg flex_column_center">
      <p class="font_heading mt-2">Frequent Songs</p>
      <p
        class="font_title_light font_heading"
        v-for="song in user.songFrequency.slice(0, 6)"
        :key="song[0]"
      >
        {{ song[0] }} ({{ song[1] }})
      </p>
    </div>
    <div class="grid_days item_bg">
      <scores-by-day :days="user.avgShowScoreByDay" />
    </div>
    <div class="grid_years item_bg">
      <scores-by-year :years="user.avgShowScoreByYear" />
    </div>
    <div class="grid_best item_bg px-4">
      <div class="d-flex mt-2">
        <p class="font_title_light font_heading font_shadow_red">Best Show</p>
        <v-spacer />
        <a
          :href="user.showBest.phishnetUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="external_link"
          title="View on phish.net"
        >
          <v-icon>mdi-open-in-new</v-icon>
        </a>
      </div>
      <div class="d-flex font_md">
        <p class="font-weight-bold">
          {{ user.showBest.venue }}
        </p>
        <v-spacer />
        <p>
          {{ user.showBest.rating.toFixed(3) }}
        </p>
      </div>
      <div class="d-flex">
        <p class="flex-grow-1 text-left">{{ user.showBest.location }}</p>
        <p class="flex-grow-1 text-center">
          {{ user.showBest.date }} ({{ user.showBest.day }})
        </p>
        <p class="flex-grow-1 text-right">
          Song Count: {{ user.showBest.setlist.songCount }}
        </p>
      </div>
      <hr />
      <div v-for="(value, key) in user.showBest.setlist" :key="key">
        <div v-if="key.substring(0, 3) === 'Set'">
          <p class="text-left font-weight-bold">
            {{ key }}:
            <span class="font-weight-regular">{{ value.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="grid_worst item_bg px-4">
      <div class="d-flex mt-2">
        <p class="font_title_light font_heading font_shadow_red">Worst Show</p>
        <v-spacer />
        <a
          :href="user.showWorst.phishnetUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="external_link"
          title="View on phish.net"
        >
          <v-icon>mdi-open-in-new</v-icon>
        </a>
      </div>
      <div class="d-flex font_md ">
        <p class="font-weight-bold">
          {{ user.showWorst.venue }}
        </p>
        <v-spacer />
        <p>
          {{ user.showWorst.rating.toFixed(3) }}
        </p>
      </div>
      <div class="d-flex">
        <p class="flex-grow-1 text-left">{{ user.showWorst.location }}</p>
        <p class="flex-grow-1 text-center">
          {{ user.showWorst.date }} ({{ user.showWorst.day }})
        </p>
        <p class="flex-grow-1 text-right">
          Song Count: {{ user.showWorst.setlist.songCount }}
        </p>
      </div>
      <hr />
      <div v-for="(value, key) in user.showWorst.setlist" :key="key">
        <div v-if="key.substring(0, 3) === 'Set'">
          <p class="text-left font-weight-bold">
            {{ key }}:
            <span class="font-weight-regular">{{ value.join(", ") }}</span>
          </p>
        </div>
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
.item_bg {
  background-color: white;
  border: 2px solid var(--red);
  border-radius: 9px;
}
.flex_column_center {
  display: flex;
  flex-direction: column;
  justify-content: start;
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
