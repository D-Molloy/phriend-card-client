<template>
  <div class="nav_tabs">
    <div id="site_id">
      <h5 class="font_shadow_red">PhriendScore</h5>
    </div>
  </div>
</template>
<style scoped>
#site_id {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--blue);
  width: 100%;
}
#site_id > h5 {
  font-family: var(--font-title);
  color: white;
  font-size: 1.4em;
  margin: 0 10px;
  letter-spacing: 5px;
}
</style>
<script>
export default {
  name: "NavBar"
};
</script>
