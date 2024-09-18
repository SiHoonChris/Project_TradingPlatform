<template>
  <div id="CandleChart">
    <div id="chart-helper">
      <div id="asset-price">
        <span id="name">{{this.assetName}}</span>
      </div>
      <div id="chart-tool"></div>
    </div>
    <div id="asset-chart">
      <div id="forYAxis">
        <svg id="yAxisBg"></svg>
        <svg id="yAxis"></svg>
      </div>
      <svg id="Chart"></svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assetName: null,
      marketInfo: null,
      datasForChart: null,
      chartToolMenu_On: false,
      timeframes: ["Annual", "Month", "Week", "Day"],
      indicators: ["Bollinger Band", "Ichimoku Cloud"]
    }
  },
  created() {
    this.$store.commit('getAssetName', this.$route.params.ticker);
    this.$store.commit('getMarketInfo', this.$route.params.ticker);
    this.assetName = this.$store.state.assetName;
    this.marketInfo = this.$store.state.marketInfo;
    this.getHistoricalPriceData(this.$route.params.ticker, this.marketInfo);
  },
  updated() {
    if(document.querySelectorAll("g").length === 0){
      this.$Basic_Candle(
        this.datasForChart, 
        "#asset-chart", "#yAxisBg", "#yAxis", "#Chart"
      );
    }
    
  },
  beforeUnmount(){
    this.$Erase_Chart("#asset-chart", "#yAxisBg", "#yAxis", "#Chart");
  },
  methods: {
    getHistoricalPriceData: function(t, m){
      this.$http.get("/trade/getHistoricalPriceData", {params: { TICKER: t , MARKET: m}})
      .then(res => {
        this.datasForChart = res.data;
        this.$Basic_Candle(
          this.datasForChart, 
          "#asset-chart", "#yAxisBg", "#yAxis", "#Chart"
        );
        document.querySelector("#asset-chart").scrollBy(document.querySelector("#asset-chart").offsetWidth, 0);
      })
      .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Chart/CandleChart.scss";
</style>