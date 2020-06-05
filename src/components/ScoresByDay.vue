<template>
  <div>
    <h1>Best Days</h1>
    <table>
      <tr>
        <th>Day</th>
        <th># Shows</th>
        <th>Avg.Score</th>
      </tr>
      <tr v-for="day in days" :key="day.day">
        <td>{{ day.day }}</td>
        <td>{{ day.shows }}</td>
        <td>{{ day.rating.toFixed(3) }}</td>
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
  name: "ScoresByDay",
  props: {
    days: {
      type: Array
    }
  }
};
</script>
