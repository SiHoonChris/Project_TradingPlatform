<template>
  <div id="TradeHistory" style="width:100%; height:100%"></div>
</template>

<script>
export default {
  data() {
    return {
      tradeHistData: [
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
        {"Trade History":"[2022.09.13] BUY / $100 * 3"},
        {"Trade History":"[2022.12.28] SELL / $120 * 13"},
      ]
    }
  },
  mounted(){
    this.$Create_Table (
      this.tradeHistData, 
      "TradeHistory", 
      getComputedStyle(document.getElementById('TradeHistory')).width,
      getComputedStyle(document.getElementById('TradeHistory')).height,
      true
    );
  }
}
</script>