<template>
  <v-app>
    <nav-bar />
    <router-view />
  </v-app>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "app",
  components: {
    "nav-bar": NavBar
  }
};
</script>
<style>
:root {
  --font-title: "Lobster", cursive;
  --font-primary: "Montserrat", sans-serif;
  --blue: #0055a5;
  --red: #e51837;
  --background: #b0c4de;
}
body {
  margin: 0;
}
#app {
  background-color: var(--background);
}
table {
  width: 100%;
}

p,
th,
td {
  font-family: var(--font-primary);
  margin-bottom: 0 !important;
}
th,
td {
  font-size: 1.2em;
}

th {
  width: calc(100% / 3);
  font-style: italic;
}
td {
  text-align: center;
  vertical-align: middle;
}
.external_link {
  text-decoration: none;
}
/* Font Sizes */
.font_xl {
  font-size: 4em;
}

.font_lg {
  font-size: 3em;
}

.font_md {
  font-size: 2.25em;
}

.font_heading {
  font-size: 1.4em;
}

/* Font Styles */
/* TODO: change to font_title_blue */
.font_title_light {
  font-family: var(--font-title);
  color: var(--blue);
  letter-spacing: 1.5px;
}
.font_title_red {
  font-family: var(--font-title);
  color: var(--red);
  letter-spacing: 1.5px;
}

.font_shadow_red {
  text-shadow: 1px 1px 2px var(--red);
}
.font_shadow_blue {
  text-shadow: 1px 1px 2px var(--blue);
}
.font_shadow_white {
  text-shadow: 1px 1px 2px white;
}

.text_green {
  color: green;
}
.text_red {
  color: red;
}

.font_subtitle {
  font-family: var(--font-primary);
  text-shadow: none;
  font-size: 1em;
  font-style: italic;
}
</style>
