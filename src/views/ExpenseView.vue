<template>
  <main id="main-expense">
    <div id="expense-background">
      <div id="expense-chart">
        <ExpenseChart/>
      </div>
      <div id="expense-detail">
        <ExpenseTable/>
        <ExpenseDetailChart/>
      </div>
    </div>
  </main>
</template>

<script>
import ExpenseChart from '@/components/View/Expense/ExpenseChart.vue'
import ExpenseTable from '@/components/View/Expense/ExpenseTable.vue'
import ExpenseDetailChart from '@/components/View/Expense/ExpenseDetailChart.vue'


export default {
  components: { ExpenseChart, ExpenseTable, ExpenseDetailChart },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/View.scss";
</style>