<template>
  <div>
    <h1>Avg Show Score By Year</h1>
    <ol class="overview_container">
      <li v-for="year in years" :key="year.year">
        {{ year.year }} - {{ year.shows }} show{{ year.shows > 1 ? "s" : "" }} -
        avg rating
        {{ year.rating.toFixed(3) }}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: "ScoresByYear",
  props: {
    years: {
      type: Array
    }
  }
};
</script>
