<template>
  <div>
    <p class="font_title_light font_heading font_shadow_red mt-2">Year Rank</p>

    <table>
      <tr>
        <th>Year</th>
        <th># Shows</th>
        <th>Avg. Score</th>
      </tr>
      <tr v-for="year in years" :key="year.year">
        <td>{{ year.year }}</td>
        <td>{{ year.shows }}</td>
        <td>{{ year.rating.toFixed(3) }}</td>
      </tr>
    </table>
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
