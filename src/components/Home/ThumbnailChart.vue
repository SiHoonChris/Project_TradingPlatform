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

<style scoped>
section {
  width: 460px;
  height: 328px;
  margin-right: 2.666vw;
  margin-bottom: 5vh;
}
.title {
  width: 100%;
  height: 6%;
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.thumbnail {
  width: 100%;
  height: 93%;
  border: 1px solid gray;
}
.thumbnail:hover {
  border: 1px solid whitesmoke;
  box-shadow: 0.1px 0.1px 1.6px 1.2px whitesmoke;
  cursor: pointer;
}
</style>