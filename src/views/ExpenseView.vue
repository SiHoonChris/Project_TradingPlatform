<template>
  <main id="main-expense">
    <div id="expense-background">
      <div id="expense-chart">
        <ExpenseChart @sendTransaction="defineTransaction"/>
      </div>
      <div id="expense-detail">
        <ExpenseTable :transactionFromChart="transactionToSet"/>
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