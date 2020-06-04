<template>
  <div id="app">
    <loading-spinner />
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
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
