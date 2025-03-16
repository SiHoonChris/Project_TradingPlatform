<template>
  <div id="expense-frequency-chart">
    <button id="createDetailFrequencyChartButton" style="display: none;" @click="getTransactionHistoryDataForDetailFrequencyChart()"></button>
        
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
    getTransactionHistoryDataForDetailFrequencyChart : function () {
      this.$http.get("/getTransactionHistoryDataForDetailFrequencyChart", {
          params: { 
            ExpenseMin : this.$store.state.expenseMin,
            ExpenseMax : this.$store.state.expenseMax,
            DateFrom   : this.$store.state.dateFrom,
            DateTo     : this.$store.state.dateTo
          }
        }).then(res => {
          this.data = [];

          if(res.data.length !== 0) {
            const transformedData = Object.entries(res.data[0]).map(([type, value]) => ({type, value}));

            switch (this.$store.state.transactionType) { // filter
              case '매수': 
                this.data = transformedData.filter(e => e.type === '매수');
                break;
              case '매도': 
                this.data = transformedData.filter(e => e.type === '매도'); 
                break;
              case '입금': 
                this.data = transformedData.filter(e => e.type === '입금'); 
                break;
              case '출금': 
                this.data = transformedData.filter(e => e.type === '출금'); 
                break;
              case '배당': 
                this.data = transformedData.filter(e => e.type === '배당'); 
                break;
              case '매매': 
                this.data = transformedData.filter(e => ['매수', '매도'].includes(e.type)); 
                break;
              case '입출금': 
                this.data = transformedData.filter(e => ['입금', '출금'].includes(e.type)); 
                break;
              default: 
                this.data = transformedData;
            }

            console.log(this.data);
          }
        }).catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
//   @import "@/assets/css/Expense/Components/DetailChart.scss";
</style>