<template>
  <section>
    <div class="title">
      <span :id="ticker" :class="hold">{{name}}</span>
      <span>{{(trend).toUpperCase()}}</span>
    </div>
    <div class="thumbnail" @click="$moveTo_2(ticker)">
      <svg id="chart" width="460.800" height="305.038"></svg>
    </div>
  </section>
</template>

<script>
export default {
  props: ['name', 'ticker', 'trend', 'hold']
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/ThumbnailChart.scss";
</style>