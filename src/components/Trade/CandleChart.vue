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

<style lang="scss" scoped>
#CandleChart {
  $w: 80vw;
  $h: 92vh;
  @mixin setFlexDisplay($ai, $jc) {
    display: flex;
    align-items: $ai;
    justify-content: $jc;
  }

  width: $w;
  height: $h;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;

  #chart-helper {
    width: $w;
    height: $h * 0.1;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;

    #asset-price {
      @include setFlexDisplay(center, left);
      height: 100%;
      color: white;

      #name {
        font-size: 34px;
        font-weight: bold;
        padding-left: 0.6vw;
        padding-bottom: 1%;
        vertical-align: middle;
      }
    }
    #chart-tool {
      @include setFlexDisplay(flex-end, space-between);
      width: 5%;
      padding: 0.5%;

      button {
        width: 46%;
        height: 50%;
      }      
    }
  }
  #asset-chart {
    width: $w;
    height: $h * 0.9;
    overflow: hidden;
    // overflow-x: scroll;
    // overflow-y: hidden;
    background: none;

    #forYAxis {
      width: $w * 0.05;
      height: $h * 0.9 * 0.97;
      margin-left: $w * 0.95;
      position: absolute;

      #yAxisBg, #yAxis {
        position: absolute;
      }
    }
  }
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
