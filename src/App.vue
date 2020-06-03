<template>
  <div id="app">
    <loading-spinner />
    <router-view />
  </div>
</template>
<script>
import LoadingSpinner from "./components/loading-spinner.vue";
export default {
  name: "app",
  components: {
    "loading-spinner": LoadingSpinner
  }
};
</script>
<style>
body {
  margin: 0;
}
/* * {
  border: 1px solid black;
} */
</style>
