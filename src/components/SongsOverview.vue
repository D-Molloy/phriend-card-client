<template>
  <div class="d-flex flex-column jsutify-center align-center pb-10">
    <div
      class="item_bg show_card d-flex justify-center align-center my-5  px-2"
    >
      <p class="font_title">
        Shared in the groove
      </p>
      <p class="font_shadow_red font_title_light font_heading mx-2">
        {{ totalSongsHeard }}
      </p>
      <p class="font_title">
        times.
      </p>
    </div>
    <div class="item_bg mx-2">
      <p class="font_title ma-2" v-for="song in songs" :key="song[0]">
        <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
        >)
      </p>
    </div>
  </div>
</template>
<style scoped>
.font_heading {
  font-size: 4em;
}
.font_subtitle {
  font-size: 2em;
}
.font_title {
  font-size: 1.5em;
}

@media only screen and (max-width: 650px) {
  .show_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .font_heading {
  font-size: 3em;
}
  .font_title {
    font-size: 1em;
  }
}
</style>

<script>
export default {
  name: "SongsOverview",
  props: {
    songs: {
      type: Array
    },
    totalSongsHeard: {
      type: Number
    }
  }
};
</script>
