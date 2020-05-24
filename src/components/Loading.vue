<template>
  <div>
    <div id="wave">
      <span class="movin page"></span>
      <span class="trey"></span>
      <span class="movin fish"></span>
      <span class="movin mike"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading"
};
</script>
<style>
div#wave {
  border: 1px solid black;
  position: relative;
  text-align: center;
  max-width: 100%;
  height: 100vh;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    border: 1px solid lightgrey;
  }
  .page {
    background: blue;
  }
  .trey {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background: green;
    transform: translateY(-20px);
  }
  .fish {
    background: red;
  }

  .mike {
    background: yellow;
  }

  .movin {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;

    animation: wave 1.3s linear infinite;

    &:nth-child(2) {
      background-color: green;
      animation-delay: -2.1s;
    }

    &:nth-child(3) {
      animation-delay: -0.7s;
    }
    &:nth-child(4) {
      animation-delay: -0.5s;
    }
  }
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-30px);
  }
}
</style>
