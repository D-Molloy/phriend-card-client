<template>
  <div class="greeting mx-5 mt-5">
    <h1 class="font_title_light font_shadow_red font_md">
      Thanks for joining!
    </h1>
    <p class="font_heading my-3 font-italic">
      PhriendScore is powered by show data provided by the fine folks at
      <a href="https://phish.net/" target="_blank" rel="noopener noreferrer"
        >Phish.net</a
      >.
    </p>
    <p>
      Visit them to jot down a list of all the shows you've seen, then press the
      <span class="text_green font-weight-bold font_shadow_white">green</span>
      button below to get started!
    </p>
    <p class="my-3">
      If you just want to see what PhriendScore has to offer, give
      <span class="font-italic font-weight-bold">1999-12-31</span> a try.
    </p>
    <p class="mt-5">
      Please contact me on
      <a
        href="https://twitter.com/PhriendScore"
        target="_blank"
        rel="noopener noreferrer"
        >@PhriendScore</a
      >
      with any suggestion or bugs. This is a work in progress, so feedback is
      welcome!
    </p>
  </div>
</template>
<script>
export default {
  name: "GreetingMessage"
};
</script>
<style>
.greeting {
  max-width: 450px;
}
</style>
