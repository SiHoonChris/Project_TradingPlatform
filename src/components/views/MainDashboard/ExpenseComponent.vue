<template>
  <div id="expense-component">
    <div id="expense-background">

      <div id="expense-chart">
        <ExpenseChart/>
      </div>

      <div id="expense-detail-info">
        <div id="expense-detail-period">
          <span class="label">Selected Period</span>
          <div id="period-result">
            <input type="text" readonly id="period-date-from" value=""/>
            <span style="color:#ffffff; margin:0 4px; font-size:13px;">~</span>
            <input type="text" readonly id="period-date-to" value=""/>
          </div>
        </div>
        <div id="expense-detail-result">
          <span class="label">Expense</span>
          <div id="expense-result">
            <input type="text" readonly value=""/>&nbsp;
            <span style="color:#ffffff; margin-left:2px; font-size:13px;">(KRW)</span>
          </div>
        </div>
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
  components: { ExpenseChart, ExpenseTable, ExpenseDetailChart }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/ExpenseComponent.scss";
</style>
