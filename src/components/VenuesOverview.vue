<template>
  <div>
    <h1>Your Venue Summary ({{ venues.length }})</h1>
    <div class="overview_container">
      <div class="card" v-for="venue in venues" :key="venue.location">
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
    </div>
  </div>
</template>
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
