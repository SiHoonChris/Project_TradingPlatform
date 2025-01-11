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
        listPart: "watch-list-stock",
        chartPart: "tradingview-widget-stock" 
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
              // assets/note/tradingview_widget_chart.txt
            ],
            hide_volume: true
          });
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Chart.scss";
</style>
