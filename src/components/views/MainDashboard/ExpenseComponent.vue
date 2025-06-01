<template>
  <div id="expense-component">
    <div id="expense-background">
      <div id="expense-chart">
        <ExpenseChart/>
      </div>
      <div id="expense-detail">
        <ExpenseTable/>
        <ExpenseDetailChart/>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseChart from '@/components/views/MainDashboard/ExpenseComponent/ExpenseChart.vue'
import ExpenseTable from '@/components/views/MainDashboard/ExpenseComponent/ExpenseTable.vue'
import ExpenseDetailChart from '@/components/views/MainDashboard/ExpenseComponent/ExpenseDetailChart.vue'


export default {
  components: { ExpenseChart, ExpenseTable, ExpenseDetailChart },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/ExpenseComponent.scss";
</style>
