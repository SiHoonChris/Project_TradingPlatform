<template>
  <section>
    <div class="caption">
      <span :id="ticker" :class="hold">{{name}}</span>
      <span>{{(trend).toUpperCase()}}</span>
    </div>
    <div class="candles" @click="$moveTo_3(ticker)">
      <svg id="chart" width="460.800" height="292.487"></svg>
    </div>
  </section>
</template>

<script>
export default {
  props: ['name', 'ticker', 'trend', 'hold']
}
</script>

<style scoped>
section {
    width: 30vw;
    height: 44vh;
    margin: 0 2.666vw 5vh 0;
}
.caption {
    width: 100%;
    height: 6%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
}
.candles {
    width: 100%;
    height: 94%;
    border: 1px solid gray;
}
.candles:hover {
    border: 1px solid whitesmoke;
    box-shadow: 0.1px 0.1px 1.6px 1.2px whitesmoke;
    cursor: pointer;
}
</style>