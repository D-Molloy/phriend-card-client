<template>
  <div>
    <div v-if="user.showScoreAverage" class="grid">
      <div class="grid_score item_bg pt-2 d-flex justify-center flex-wrap">
        <p class="font_title_light font_shadow_red font_xl title_small">
          {{ user.username }}'s PhriendScore:
        </p>
        <p class="font_title_light font_shadow_red font_xl mx-3 ">
          {{ user.showScoreAverage.toFixed(3) }}
        </p>
      </div>
      <div class="grid_total_shows item_bg d-flex flex-column justify-center">
        <p class="font_title_light font_heading font_shadow_red mt-2">
          Shows Seen
        </p>
        <p class="font_lg">{{ user.shows.length }}</p>
      </div>
      <div class="grid_total_songs item_bg d-flex flex-column justify-center">
        <p class="font_title_light font_heading font_shadow_red mt-2">
          Songs Heard
        </p>
        <p class="font_lg">{{ user.totalSongsHeard }}</p>
      </div>
      <div class="grid_venue_summary item_bg d-flex flex-column justify-start">
        <div class="d-flex flex-column align-center mt-2">
          <p class="font_title_light font_heading font_shadow_red">
            Total Venues
          </p>
          <p class="font_lg mx-2">
            {{ user.venueSummary.length }}
          </p>
        </div>
        <div class="d-flex mt-3">
          <div class="d-lex flex-column flex-grow-1">
            <p class="font_title_light font_heading font_shadow_red">
              Favorite
            </p>
            <p class="font_heading ">
              {{ user.venueSummary[0].venue }}
            </p>

            <p class="font_subtitle">
              ({{ user.venueSummary[0].shows.length }} show{{
                user.venueSummary[0].shows.length > 1 ? "s" : ""
              }})
            </p>
          </div>
          <div class="d-flex flex-column flex-grow-1">
            <p class="font_title_light font_heading font_shadow_red">
              Best
            </p>
            <p class="font_heading">
              {{ topShow.venue }}
            </p>
            <p class="font_subtitle mb-2">
              ({{ topShow.venueRating.toFixed(3) }})
            </p>
          </div>
        </div>
      </div>

      <div class="grid_frequent item_bg d-flex flex-column pb-3">
        <p class="font_title_light font_heading font_shadow_red mt-2">
          Frequent Songs
        </p>
        <p
          class="font_heading"
          v-for="song in user.songFrequency.slice(0, 6)"
          :key="song[0]"
        >
          {{ song[0] }} ({{ song[1] }})
        </p>
      </div>

      <div class="grid_days item_bg pb-3">
        <scores-by-day :days="user.avgShowScoreByDay" />
      </div>
      <div class="grid_years item_bg pb-3">
        <scores-by-year :years="user.avgShowScoreByYear" />
      </div>
      <show-display :show="user.showBest" card-type="best" />
      <show-display :show="user.showWorst" card-type="worst" />
    </div>
    <credit-footer />
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
  justify-content: flex-start;
  align-items: center;
}

/* TABLE SCREENS 1200px -  */
@media only screen and (max-width: 1200px) {
  .grid_score {
    grid-area: 1 / 1 / 2 / 5;
  }
  .grid_total_shows {
    grid-area: 2 / 1 / 3 / 3;
  }
  .grid_total_songs {
    grid-area: 2 / 3 / 3 / 5;
  }
  .grid_venue_summary {
    grid-area: 3 / 1 / 5 / 3;
  }
  .grid_frequent {
    grid-area: 3 / 3 / 5 / 5;
  }
  .grid_days {
    grid-area: 5 / 1 / 7 / 3;
  }
  .grid_years {
    grid-area: 5 / 3 / 7 / 5;
  }
  .grid_best {
    grid-area: 7 / 1 / 9 / 5;
  }
  .grid_worst {
    grid-area: 9 / 1 / 11 / 5;
  }
}
@media only screen and (max-width: 650px) {
  .title_small {
    flex-basis: 100%;
    font-size: 2em;
  }
  .grid_score {
    grid-area: 1 / 1 / 2 / 5;
  }
  .grid_total_shows {
    grid-area: 2 / 1 / 3 / 3;
  }
  .grid_total_songs {
    grid-area: 2 / 3 / 3 / 5;
  }
  .grid_venue_summary {
    grid-area: 3 / 1 / 5 / 5;
  }
  .grid_frequent {
    grid-area: 5 / 1 / 7 / 5;
  }
  .grid_days {
    grid-area: 7 / 1 / 9 / 5;
  }
  .grid_years {
    grid-area: 9 / 1 / 11 / 5;
  }
  .grid_best {
    grid-area: 11 / 1 / 13 / 5;
  }
  .grid_worst {
    grid-area: 13 / 1 / 15 / 5;
  }
}
</style>

<script>
import ScoresByYear from "@/components/ScoresByYear.vue";
import ScoresByDay from "@/components/ScoresByDay.vue";
import ShowDisplay from "@/components/ShowDisplay.vue";
import CreditFooter from "@/components/CreditFooter.vue";

export default {
  name: "UserOverview",
  props: {
    user: {
      type: Object
    }
  },
  components: {
    "scores-by-year": ScoresByYear,
    "scores-by-day": ScoresByDay,
    "show-display": ShowDisplay,
    "credit-footer": CreditFooter
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
