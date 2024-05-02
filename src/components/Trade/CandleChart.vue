<template>
  <div id="CandleChart">
    <div id="chart-helper">
      <div id="asset-price">
        <span id="name">{{this.assetName}}</span>
      </div>
      <div id="chart-tool">
        <button @click="PopupOn()">X</button>
        <button>X</button>
      </div>
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
      datasForChart: null
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
    this.$Basic_Candle(
      this.datasForChart, 
      "#asset-chart", "#yAxisBg", "#yAxis", "#Chart"
    );
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
    },
    PopupOn: function(){
      this.$emit("PopupSwitchOn", true);
    }
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
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 5%;
    padding: 0.5%;
  }
  #chart-tool button {
    width: 46%;
    height: 50%;
  }

  #asset-chart {
    width: 100%;
    height: 90%;
    overflow-x: scroll;
    overflow-y: hidden;
    background: none;
  }
  #yAxisBg, #yAxis, #yAxisBg, #forYAxis {
    position: absolute;
  }
  #forYAxis {
    width: calc(100vw * 0.8 * 0.05);
    height: calc(92vh * 0.9 * 0.97);
    margin-left: calc(100vw * 0.8 * 0.95);
  }

  /* Scroll-bar */
::-webkit-scrollbar-track {
  background-color: black;
}
::-webkit-scrollbar {
  background-color: black;
  height: 1.6vh;
}
::-webkit-scrollbar-thumb {
  border-radius: 30px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #333;
}
</style>