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
  --font-title: "Righteous", cursive;
  --font-primary: "Montserrat", sans-serif;
  --blue: #2c6e91;
  --red: #f15a50;
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

#app{
   background-color: var(--background);
}
</style>
