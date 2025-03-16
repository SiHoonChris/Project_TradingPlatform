<template>
  <div id="expense-amount-chart">
    <button id="createDetailAmountChartButton" style="display: none;" @click="getTransactionHistoryDataForDetailChart()"></button>
        
  </div>
</template>

<script>
export default {
  data() {
    return {
      data : [],
    }
  },
  mounted() {
    
  },
  methods: {
    getTransactionHistoryDataForDetailChart : function() {
      console.log(`Expense Detail Amount Chart : ${this.$store.state.expenseMin}`);
      console.log(`Expense Detail Amount Chart : ${this.$store.state.expenseMax}`);
      console.log(`Expense Detail Amount Chart : ${this.$store.state.dateFrom}`);
      console.log(`Expense Detail Amount Chart : ${this.$store.state.dateTo}`);
      console.log(`Expense Detail Amount Chart : ${this.$store.state.transactionType}`);
    }
  }
}
</script>

<style lang="scss" scoped>
//   @import "@/assets/css/Expense/Components/DetailChart.scss";
</style>