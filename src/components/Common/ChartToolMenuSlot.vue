<template>
  <div id="chart-tool-menu">
    <div>
      <p>Timeframes</p>
      <slot name="timeframes"></slot>
    </div>
    <div>
      <p>Indicators</p>
      <slot name="indicators"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  $w: 80vw;
  $h: 92vh;

  #chart-tool-menu {
    width: calc($w * 0.15 - 0.5px);
    height: $h * 0.9;
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    border-left: 0.5px solid gray;
    border-right: 0.5px solid gray;
    left: $w * (1 - 0.15);
    z-index: 99;

    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      color: white;

      li {
        background: none;
        width: 100%;
        height: 1vh;
        list-style-type: none;
      }
    }
  }
  
</style>
