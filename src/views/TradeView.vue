<template>
  <div id="detail">
    <PopupSlot v-if="popUpOnOff" @PopupSwitchOff="setPopupSwitch">
      <template v-slot:contents>
        <div id="charts-in-popup">
          <DebtRatio/>
          <ProfitMargin/>
        </div>
        <FinancialValues/>
        <FinancialReport/>
      </template>
    </PopupSlot>
    <div id="candle-chart"><CandleChart @PopupSwitchOn="setPopupSwitch"/></div>
    <div id="buy-and-sell"><BuyAndSell/></div>
    <div id="order-history"><OrderHistory/></div>
    <div id="asset-memo"><AssetMemo/></div>
  </div>
</template>

<script>
import CandleChart from "@/components/Trade/CandleChart.vue"
import BuyAndSell from "@/components/Trade/BuyAndSell.vue"
import OrderHistory from "@/components/Trade/OrderHistory.vue"
import AssetMemo from "@/components/Trade/AssetMemo.vue"
import PopupSlot from '@/components/Common/PopupSlot.vue'
import DebtRatio from "@/components/Trade/InDetailPopup/DebtRatio.vue"
import ProfitMargin from "@/components/Trade/InDetailPopup/ProfitMargin.vue"
import FinancialValues from "@/components/Trade/InDetailPopup/FinancialValues.vue"
import FinancialReport from "@/components/Trade/InDetailPopup/FinancialReport.vue"

export default {
  components: { 
    CandleChart, BuyAndSell, OrderHistory, AssetMemo, PopupSlot,
    DebtRatio, ProfitMargin, FinancialValues, FinancialReport
  },
  data(){
    return {
      popUpOnOff: false
    }
  },
  methods: {
    setPopupSwitch: function(val){
      this.popUpOnOff = val;
    }
  }
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

#charts-in-popup {
  display: flex;
  width:  100%;
  height: 100%;
}
</style>