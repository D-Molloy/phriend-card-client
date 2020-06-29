<template>
  <div class="d-flex flex-column align-center pb-10">
    <div
      class="item_bg show_card font_md d-flex justify-center align-center my-5 mx-2 px-2"
    >
      <p class="">
        Shared in the groove
      </p>
      <p class="font_shadow_red font_title_light font_heading mx-3">
        {{ totalSongsHeard }}
      </p>
      <p class="">
        times.
      </p>
    </div>
    <div class="item_bg show_card ml-2 mr-1">
      <p class="font_md ma-2" v-for="song in songs" :key="song[0]">
        <span>{{ song[0] }}</span> (<span>{{ song[1] }}</span
        >)
      </p>
    </div>
  </div>
</template>
<style scoped>
.show_card {
  /* max-width: 30%;
  min-width: 170px; */
  width: 630px;
}
@media only screen and (max-width: 650px) {
  .show_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
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
