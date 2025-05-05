<template>
  <div id="component-profit-loss-chart">
    <div id="profit-loss-chart">
      <ProfitPlusLossChart/>
    </div>
    <div id="charts-bottom">
      <div id="profit-only-chart">
        <ProfitOnlyChart/>
      </div>
      <div id="loss-only-chart">
        <LossOnlyChart/>
      </div>
    </div>
  </div>
</template>

<script>
import ProfitPlusLossChart from '@/components/ProfitLoss/Charts/ProfitPlusLossChart.vue'
import ProfitOnlyChart from '@/components/ProfitLoss/Charts/ProfitOnlyChart.vue'
import LossOnlyChart from '@/components/ProfitLoss/Charts/LossOnlyChart.vue'

export default {
  components: { ProfitPlusLossChart, ProfitOnlyChart, LossOnlyChart },
  data() {
    return {
      data : []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/ProfitLoss/Components/Chart.scss";
</style>