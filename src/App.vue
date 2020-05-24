<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
}
/* * {
  border: 1px solid black;
} */
</style>
