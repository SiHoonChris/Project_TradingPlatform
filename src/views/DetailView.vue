<template>
  <div id="detail">
    <div id="candle-chart"><CandleChart/></div>
    <div id="buy-and-sell"><BuyAndSell/></div>
    <div id="order-history"><OrderHistory/></div>
    <div id="asset-memo"><AssetMemo/></div>
  </div>
</template>

<script>
import CandleChart from "@/components/Detail/CandleChart.vue"
import BuyAndSell from "@/components/Detail/BuyAndSell.vue"
import OrderHistory from "@/components/Detail/OrderHistory.vue"
import AssetMemo from "@/components/Detail/AssetMemo.vue"

export default {
  components: { CandleChart, BuyAndSell, OrderHistory, AssetMemo },
}
</script>

<style scoped>
#detail {
  display: grid;
  grid-template-rows: repeat(10, 10%);
  grid-template-columns: repeat(5, 20%);
  width: 100vw;
  height: 92vh;
  gap: 0;
  grid-template-areas:
    "c c c c b"
    "c c c c b"
    "c c c c b"
    "c c c c b"
    "c c c c b"
    "c c c c o"
    "c c c c o"
    "c c c c o"
    "c c c c m"
    "c c c c m";
  background: black;
  overflow: hidden;
}
#candle-chart  { grid-area: c; }
#buy-and-sell  { grid-area: b; }
#order-history { grid-area: o; }
#asset-memo    { grid-area: m; }

</style>