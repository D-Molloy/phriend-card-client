<template>
  <div>
    <h1>Your Song Summary</h1>
    <p>Total songs heard: {{ totalSongsHeard }}</p>
    <!-- TODO: remove outer-div when possible -->
    <div v-for="song in songs" :key="song[0]">
      <h4>
        <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
        >)
      </h4>
    </div>
  </div>
</template>
<script>
export default {
  name: "SongFrequency",
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
