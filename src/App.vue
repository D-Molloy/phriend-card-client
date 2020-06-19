<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
export default {
  name: "app"
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

/* h1,
h2,
h3,
h4,
h5 {

  color: var(--blue);
  text-shadow: 1px 1px 2px var(--red);
  font-size: 2.4em;
} */



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
  font-size: 1.5em;
}

/* Font Styles */
.font_title_light {
  font-family: var(--font-title);
  color: var(--blue);
}
.font_title_dark {
  font-family: var(--font-title);
  color: var(--blue);
}
.font_shadow_red {
  text-shadow: 1px 1px 2px var(--red);
}
.font_shadow_blue {
  text-shadow: 1px 1px 2px var(--blue);
}

.font_subtitle {
  font-family: var(--font-primary);
  text-shadow: none;
  font-size: 1em;
  font-style: italic;
}

p,
th,
td {
  font-family: var(--font-primary);
  margin-bottom: 0 !important;
}

#app {
  background-color: var(--background);
}
</style>
