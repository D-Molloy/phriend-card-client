<template>
  <div>
    <p class="font_title_light font_heading font_shadow_red mt-2">Day Rank</p>
    <table>
      <tr>
        <th>Day</th>
        <th># Shows</th>
        <th>Avg. Score</th>
      </tr>
      <tr v-for="day in days" :key="day.day">
        <td>{{ day.day }}</td>
        <td>{{ day.shows }}</td>
        <td>{{ day.rating.toFixed(3) }}</td>
      </tr>
    </table>
  </div>
</template>
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
