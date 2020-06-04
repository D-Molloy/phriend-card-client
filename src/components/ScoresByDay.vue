<template>
  <div >
    <h1>Avg Show Score By Day</h1>
    <ol class="overview_container">
      <li v-for="day in days" :key="day.day">
        {{ day.day }} - {{ day.rating.toFixed(3) }}
      </li>
    </ol>
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
