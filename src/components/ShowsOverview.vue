<template>
  <div>
    <h1>Your Shows ({{ shows.length }})</h1>
    <!-- TODO: add remove show button -->
    <div class="overview_container">
      <div class="card" v-for="show in shows" :key="show._id">
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
          <p v-if="key.substring(0, 3) === 'Set'">
            {{ key }}: <span>{{ value.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowsOverview",
  props: {
    shows: {
      type: Array
    }
  }
};
</script>
