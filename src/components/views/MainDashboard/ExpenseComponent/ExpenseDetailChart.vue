<template>
  <div id="component-expense-detail-chart">
    <div id="detail-chart-blank"></div>
    <div id="detail-chart-result">
      <div id="detail-chart-canvas">
        <div id="frequency-chart-svg"><FrequencyChart/></div>
        <div id="amount-chart-svg"><AmountChart/></div>
      </div>
    </div>
  </div>
</template>

<script>
// import FrequencyChart from '@/components/Expense/ExpenseDetailChart/ExpenseDetailFrequencyChart.vue'
// import AmountChart from '@/components/Expense/ExpenseDetailChart/ExpenseDetailAmountChart.vue'

export default {
  // components: { FrequencyChart, AmountChart },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/ExpenseComponent/Components/DetailChart.scss";
</style>