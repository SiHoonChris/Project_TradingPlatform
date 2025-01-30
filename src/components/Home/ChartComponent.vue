<template>
  <div id="component-stock" class="tradingview-widget-container">
    <div :id="listPart">
      <div id="stock-title">
        <p>Watch-List</p>
      </div>
      <ul id="stock-list">
        <li v-for="(stock_name, idx) in watch_list" :key="idx"
            @click="setStock(stock_name)">
          <p>{{stock_name}}</p>
        </li>
      </ul>
    </div>
    <div :id="chartPart"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listPart: "watch-list-stock",
        chartPart: "tradingview-widget-stock", 
        watch_list: [],
        interval: "D"
      }
    },
    mounted () {
      // 관심종목 테이블에서 불러오기
      this.watch_list = [
          "META",
          "AAPL",
          "TSLA",
          "PLTR",
          "LLY",
          "PANW",
          "NVO",
          "TSM"
        ];

      this.initializeWidget(this.watch_list[0]);
    },
    methods: {
      initializeWidget(symbol) {
        const chartContainer = document.getElementById(this.chartPart);
        const [chartWidth, chartHeight] = [chartContainer.offsetWidth, chartContainer.offsetHeight];

        // Clear the previous widget container
        chartContainer.innerHTML = "";

        if (window.TradingView) {
          new window.TradingView.widget({
            symbol: symbol,
            container_id: this.chartPart,
            width: chartWidth + 6,
            height: chartHeight + 4,
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
      },
      setStock(stockName) {
        this.initializeWidget(stockName);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Chart.scss";
</style>
