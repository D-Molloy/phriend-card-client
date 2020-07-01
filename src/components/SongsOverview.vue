<template>
  <div class="d-flex flex-column align-center pb-10">
    <div
      class="item_bg font_md d-flex justify-center align-center my-5 mx-2 px-2"
    >
      <span class="subtitle">
        Shared in the groove
      </span>
      <span class="font_shadow_red font_title_light font_heading mx-3">
        {{ totalSongsHeard }}
      </span>
      <span class="subtitle">
        times.
      </span>
    </div>
    <div class="item_bg ml-2 mr-1">
      <p class="font_heading ma-2" v-for="song in songs" :key="song[0]">
        <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
        >)
      </p>
    </div>
  </div>
</template>
<style scoped>
.subtitle {
  font-size: 1em;
}

@media only screen and (max-width: 650px) {
  .show_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .font_md {
    font-size: 1.3em;
  }
  .font_heading {
    font-size: 2.3em;
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
