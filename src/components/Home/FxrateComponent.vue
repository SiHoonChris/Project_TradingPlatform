<template>
  <div id="component-fx-rate" class="tradingview-widget-container">
    <div :id="listPart">
      <div id="fx-title">
        <p>Currencies</p>
      </div>
      <ul id="fx-list">
        <li v-for="(currency_name, idx) in fxrate_list" :key="idx"
            @click="setFxRate(currency_name)">
          <p>{{currency_name}}</p>
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
        defaultFxRateSymbol: "USDKRW",
        fxrate_list: [
          'USD/KRW',
          'CNY/KRW',
          'JPY/KRW',
          'HKD/KRW',
          'SGD/KRW',
          'EUR/KRW',
          'GBP/KRW'
        ],
        interval: "D",
        listPart: "watch-list-fxrate",
        chartPart: "tradingview-widget-fxrate",
      }
    },
    mounted () {
      this.initializeWidget(this.defaultFxRateSymbol);
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
              "MASimple@tv-basicstudies"
              // assets/note/tradingview_widget_chart.txt
            ],
            hide_volume: true
          });
        }
      },
      setFxRate(currencyName) {
        const symbol = currencyName.replace("/", "");
        this.initializeWidget(symbol);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Fxrate.scss";
</style>
