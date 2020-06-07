<template>
  <div>
    <h1>Best Years</h1>

    <table>
      <tr>
        <th>Year</th>
        <th># Shows</th>
        <th>Avg.Score</th>
      </tr>
      <tr v-for="year in years" :key="year.year">
        <td>{{ year.year }}</td>
        <td>{{ year.shows }}</td>
        <td>{{ year.rating.toFixed(3) }}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
td {
  text-align: center;
  vertical-align: middle;
}
</style>
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
