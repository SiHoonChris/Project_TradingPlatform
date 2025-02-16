<template>
  <main id="main-expense">
    <div id="expense-background">
      <div id="expense-chart">
        <ExpenseChart @transactionCondition="receiveTransactionCondition"/>
      </div>
      <div id="expense-detail">
        <ExpenseTable :transactionConditionForTable="transactionConditionToSend"/>
        <ExpenseDetailChart/>
      </div>
    </div>
  </main>
</template>

<script>
import ExpenseChart from '@/components/Expense/ExpenseChart.vue'
import ExpenseTable from '@/components/Expense/ExpenseTable.vue'
import ExpenseDetailChart from '@/components/Expense/ExpenseDetailChart.vue'


export default {
  components: { ExpenseChart, ExpenseTable, ExpenseDetailChart },
  data() {
    return {
      transactionConditionToSend: null
    }
  },
  methods: {
    receiveTransactionCondition(val) {
      this.transactionConditionToSend = val;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/View.scss";
</style>