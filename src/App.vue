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

h1,
h2,
h3,
h4,
h5 {
  font-family: var(--font-title);
  color: var(--blue);
  text-shadow: 1px 1px 2px var(--red);
  font-size: 2.4em;
}
p{
  font-family: var(--font-primary);
  margin-bottom: 0;

}

#app {
  background-color: var(--background);
}
</style>
