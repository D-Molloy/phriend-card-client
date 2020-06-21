<template>
  <div
    :class="[
      'item_bg',
      'px-4',
      cardType === 'worst'
        ? 'grid_worst'
        : cardType === 'best'
        ? 'grid_best'
        : ''
    ]"
  >
    <div class="d-flex mt-2">
      <p
        v-if="cardType === 'worst'"
        class="font_title_light font_heading font_shadow_red"
      >
        Worst Show
      </p>
      <p
        v-if="cardType === 'best'"
        class="font_title_light font_heading font_shadow_red"
      >
        Best Show
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
    </div>
    <div class="d-flex font_md ">
      <p class="font-weight-bold">
        {{ show.venue }}
      </p>
      <v-spacer />
      <p>
        {{ show.rating.toFixed(3) }}
      </p>
    </div>
    <div class="d-flex">
      <p class="flex-grow-1 text-left">{{ show.location }}</p>
      <p class="flex-grow-1 text-center">{{ show.date }} ({{ show.day }})</p>
      <p class="flex-grow-1 text-right">
        Song Count: {{ show.setlist.songCount }}
      </p>
    </div>
    <hr />
    <div class="py-1" v-for="(value, key) in show.setlist" :key="key">
      <div v-if="key.substring(0, 3) === 'Set'">
        <p class="text-left font-weight-bold">
          {{ key }}:
          <span class="font-weight-regular">{{ value.join(", ") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowsOverview",
  props: {
    show: {
      type: Object
    },
    cardType: {
      type: String
    }
  }
};
</script>
