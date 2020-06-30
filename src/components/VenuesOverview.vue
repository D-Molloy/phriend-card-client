<template>
  <!-- TODO: Add venue score by day -->
  <div>
    <div class="item_bg show_card my-5 px-2 d-flex justify-center align-center font_lg">
      <p class="font_shadow_red font_heading font_title_light">
        {{ venues.length }}
      </p>
      <p class="ml-2 title_descrip">
        venue{{ venues.length > 1 ? "s" : null }}
      </p>
    </div>
    <div
      class="item_bg show_card_lg pa-4 ma-5"
      v-for="venue in venues"
      :key="venue.location"
    >
      <div class="d-flex">
        <div class="text-left d-flex flex-column justify-space-around">
          <p class="font-weight-bold font_lg text-left mobile_title">
            {{ venue.venue }}
          </p>
          <p class="font_heading ">{{ venue.location }}</p>
        </div>
        <v-spacer />
        <div class="text-right">
          <p>
            Avg. Score:<span class="font-weight-bold font_md">
              {{ venue.venueRating.toFixed(3) }}</span
            >
          </p>
          <p>
            Shows:
            <span class="font-weight-bold font_md">{{
              venue.shows.length
            }}</span>
          </p>
        </div>
      </div>
      <hr />
      <div class="venue_show_container mt-2 pb-2">
        <div
          class="venue_show_div item_bg pa-2"
          v-for="show in venue.shows"
          :key="show.date"
        >
          <!-- <a
            :href="show.phishnetUrl"
            target="_blank"
            rel="noopener noreferrer"
            title="View show on Phish.net"
            >{{ show.date }}</a
          > -->
          <p class="text-no-wrap font_heading">{{ show.date }}</p>
          <p>{{ show.day }}</p>
          <p class="font_heading">{{ show.rating.toFixed(3) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title_descrip {
  font-size: 0.5em;
}
.show_card {
  width: 200px;
}
.show_card_lg {
  max-width: 850px;
}
.venue_show_container {
  display: flex;
  overflow-x: auto;
}
.venue_show_div {
  margin: 0 10px;
  padding: 5px;
}

@media only screen and (max-width: 650px) {
  .loc_data {
    font-size: 12px;
  }
  .font_md {
    font-size: 1.3em;
  }
  .mobile_title {
    font-size: 1.8em;
  }

  .font_heading {
    font-size: 0.75em;
  }
}
</style>
<script>
export default {
  name: "ShowsOverview",
  props: {
    venues: {
      type: Array
    }
  }
};
</script>
