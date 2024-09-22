<template>
  <main id="chart">
    <div id="chart-main">
      <div id="candle-chart"><CandleChart/></div>
      <div id="trade-history"><TradeHistory/></div>
      <div id="asset-note"><AssetNote/></div>
    </div>
    <div id="chart-sub">
      <FinancialReport/>
    </div>
  </main>
</template>

<script>
import CandleChart from "@/components/Chart/main/CandleChart.vue"
import TradeHistory from "@/components/Chart/main/TradeHistory.vue"
import AssetNote from "@/components/Chart/main/AssetNote.vue"
import FinancialReport from "@/components/Chart/sub/FinancialReport.vue"

export default {
  components: { CandleChart, TradeHistory, AssetNote, FinancialReport },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Chart/View.scss";
</style>
