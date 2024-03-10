<template>
  <div id="CandleChart">
    <div id="chart-helper">
      <div id="asset-price">
        <span id="name">{{this.assetName}}</span>
      </div>
      <div id="chart-tool"></div>
    </div>
    <div id="asset-chart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assetName: null
    }
  },
  created() {
    this.$store.commit('getAssetName', this.$route.params.ticker);
    this.assetName = this.$store.state.assetName;
  }
}
</script>

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
    width: 50%; /*너비는 종목명에 따라 자유롭게 변동되어야 함*/
    height: 100%;
    color: white;
    border-right: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  #name {
    font-size: 34px;
    font-weight: bold;
    padding-left: 0.6vw;
    vertical-align: middle;
    padding-bottom: 1%;
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