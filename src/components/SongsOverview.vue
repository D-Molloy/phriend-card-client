<template>
  <div>
        <p class="font_lg">
      Shared in the groove
      <span class="font_shadow_w-hite font_heading font_title_light">{{
        totalSongsHeard
      }}</span>
      times.
    </p>
    <p>Total songs heard: {{ totalSongsHeard }}</p>
    
    <!-- TODO: remove outer-div when possible -->
    <div class="overview_container">
      <div v-for="song in songs" :key="song[0]">
        <h4>
          <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
          >)
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SongsOverview",
  props: {
    songs: {
      type: Array
    },
    totalSongsHeard: {
      type: Number
    }
  }
};
</script>
