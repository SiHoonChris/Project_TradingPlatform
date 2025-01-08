<template>
  <div id="component-chart" class="tradingview-widget-container">
    <div :id="listPart"></div>
    <div :id="chartPart"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        symbol: "NASDAQ:AAPL",
        interval: "D",
        listPart: "watch-list",
        chartPart: "tradingview-widget" 
      }
    },
    mounted () {
      this.$nextTick(() => {
        const chartContainer = document.getElementById(this.chartPart);
        const [chartWidth, chartHeight] = [chartContainer.offsetWidth, chartContainer.offsetHeight];

        if (window.TradingView) {
          new window.TradingView.widget({
            symbol: this.symbol,
            container_id: this.chartPart,
            width: chartWidth,
            height: chartHeight,
            theme: "dark",
            interval: this.interval,
            timezone: "Etc/UTC",
            style: "1",
            locale: "en",
            toolbar_bg: "#111111",
            enable_publishing: false,
            allow_symbol_change: true,
            studies: [
              "BB@tv-basicstudies", 
              "IchimokuCloud@tv-basicstudies"
            ]
          });
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Chart.scss";
</style>
