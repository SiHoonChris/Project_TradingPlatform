<template>
  <div id="CandleChart">
    <div id="chart-helper">
      <div id="asset-price"></div>
      <div id="chart-tool"></div>
    </div>
    <div id="asset-chart"></div>
  </div>
</template>

<style scoped>
  #CandleChart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid gray;
  }

  #chart-helper {
    width: 100%;
    height: 10%;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
  }
  #asset-price {
    width: 50%;
    height: 100%;
    background: lightblue;
  }
  #chart-tool {
    width: 10%;
    height: 100%;
    background: lightpink;
  }

  #asset-chart {
    width: 100%;
    height: 90%;
  }
</style>