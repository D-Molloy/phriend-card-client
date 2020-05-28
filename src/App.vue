<template>
  <div id="app">
    <Loading />
    <router-view />
  </div>
</template>
<script>
import Loading from "./components/Loading.vue";

export default {
  name: "app",
  components: {
    Loading
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
