<template>
  <main id="main-expense">
    <div id="expense-background">
      <div id="expense-chart">
        <ExpenseChart @sendTransaction="defineTransaction"/>
      </div>
      <div id="expense-table">
        <ExpenseTable :transactionFromChart="transactionToSet"/>
      </div>
    </div>
  </main>
</template>

<script>
import ExpenseChart from '@/components/Expense/ExpenseChart.vue'
import ExpenseTable from '@/components/Expense/ExpenseTable.vue'

export default {
  components: { ExpenseChart, ExpenseTable },
  data() {
    return {
      transactionToSet: ''
    }
  },
  methods: {
    defineTransaction(val) {
      this.transactionToSet = val;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/View.scss";
</style>