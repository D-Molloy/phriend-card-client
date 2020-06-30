<template>
  <div class="my-5 d-flex flex-column justify-center align-center">
    <div class="item_bg font_lg d-flex align-center px-4">
      <p class="font_shadow_red font_heading font_title_light ">
        {{ shows.length }}
      </p>
      <p class="subtitle pl-2">show{{ shows.length > 1 ? "s" : null }}</p>
    </div>
    <!-- TODO: add remove show button -->
    <div
      v-for="show in shows"
      :key="show.date"
      class="item_bg show_card_lg px-4 ma-5"
    >
      <div class="d-flex align-center mt-2">
        <p class="font_heading font-weight-bold">
          {{ show.date }} ({{ show.day }})
        </p>
        <v-spacer />
        <a
          :href="show.phishnetUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="external_link"
          title="View on phish.net"
        >
          <v-icon>mdi-open-in-new</v-icon>
        </a>
        <!-- TODO: add pointer icon -->
        <v-icon class="mx-3">mdi-refresh</v-icon>
        <v-icon class="icon_delete ">mdi-delete-forever</v-icon>
      </div>
      <div class="d-flex align-center">
        <p class="font-weight-bold font_lg text-left mobile_title">
          {{ show.venue }}
        </p>
        <v-spacer />
        <p
          :class="[
            'font-weight-bold',
            'font_lg',
            'mobile_title',
            show.rating.toFixed(3) === bestScore
              ? 'text_green'
              : show.rating.toFixed(3) === worstScore
              ? 'text_red'
              : null
          ]"
        >
          {{ show.rating.toFixed(3) }}
        </p>
      </div>
      <div class="d-flex">
        <p class="flex-grow-1 text-left font_heading loc_data">
          {{ show.location }}
        </p>

        <p class="flex-grow-1 text-right font_heading loc_data">
          Song Count:
          <span class="font-weight-bold">{{ show.setlist.songCount }}</span>
        </p>
      </div>
      <hr />
      <div class="py-1" v-for="(value, key) in show.setlist" :key="key">
        <div v-if="key.substring(0, 3) === 'Set'">
          <p class="text-left font_heading font-weight-bold">
            {{ key }}:
            <span class="font-weight-regular ">{{ value.join(", ") }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.subtitle {
  font-size: 0.5em;
}
.show_card_lg {
  max-width: 850px;
}

.icon_delete {
  color: var(--red);
  font-size: 30px;
}

@media only screen and (max-width: 650px) {
  .loc_data {
    font-size: 12px;
  }

  .mobile_title {
    font-size: 2em;
  }

  .font_heading {
    font-size: 1em;
  }
}
</style>
<script>
export default {
  name: "ShowsOverview",
  props: {
    shows: {
      type: Array
    },
    bestScore: {
      type: String
    },
    worstScore: {
      type: String
    }
  }
};
</script>
