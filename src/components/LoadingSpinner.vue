<template>
  <div>
    <nav-bar />
    <div class="loading_container">
      <div id="wave">
        <span class="movin page"></span>
        <span class="trey"></span>
        <span class="movin fish"></span>
        <span class="movin mike"></span>
      </div>
      <p class="font_lg font_title_light font_shadow_red">Loading...</p>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "LoadingSpinner",
  components: {
    "nav-bar": NavBar
  }
};
</script>
<style>
.loading_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#wave {
  min-height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#wave .page {
  background: blue;
}
#wave .trey {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  background: green;
  transform: translateY(-60px);
}
#wave .fish {
  background: red;
}
#wave .mike {
  background: yellow;
}
#wave .movin {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  animation: wave 1.3s linear infinite;
}
#wave .movin:nth-child(2) {
  background-color: green;
  animation-delay: -2.1s;
}
#wave .movin:nth-child(3) {
  animation-delay: -0.7s;
}
#wave .movin:nth-child(4) {
  animation-delay: -0.5s;
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-60px);
  }
}
</style>
