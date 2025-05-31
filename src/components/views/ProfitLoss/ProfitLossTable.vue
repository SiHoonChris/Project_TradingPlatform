<template>
  <div id="component-profit-loss-table">
    <div id="table-result">
      <button id="createTblButton" style="display: none;" @click="getTransactionProfitLossDataForTable()"></button>
      <div id="table-transaction-list">
        <div id="list-header">
          <div><span>Date</span></div>
          <div><span>Transaction</span></div>
          <div><span>Expense</span></div>    
        </div>
        <div id="list-body">
          <ul>
            <li v-for="(d, i) in data" :key="i">
              <div><span>{{convertToKST(d.Date)}}</span></div>
              <div><span>{{d.Transaction}}</span></div>
              <div><span>{{Number(d.Expense).toLocaleString()}}</span></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data : []
    }
  },
  mounted() {
    // this.setTableMaxHeight();
    // window.addEventListener("resize", this.setTableMaxHeight);
  },
  beforeUnmount() {
    // window.removeEventListener("resize", this.setTableMaxHeight);
  },
  methods: {
    // setTableMaxHeight : function () {
    //   const maxHeight = parseFloat(document.getElementById("detail-chart-canvas").getBoundingClientRect().height);
    //   document.getElementById("table-transaction-list").style.maxHeight = `${maxHeight}px`;
    // },
    getTransactionProfitLossDataForTable : function () {
      this.$http.get("/getTransactionHistoryDataForTable", {
          params: { 
            ExpenseMin : this.$store.state.expenseMin,
            ExpenseMax : this.$store.state.expenseMax,
            DateFrom   : this.$store.state.dateFrom,
            DateTo     : this.$store.state.dateTo,
            TransactionType : this.$store.state.transactionType
          }
        }).then(res => {
          this.data = [];
          if(res.data.length !== 0) this.data = res.data.data;
        }).catch(err => console.log(err));
    },
    convertToKST : function (utcDate) {
      const date = new Date(utcDate); // Convert to Date object
      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // Add 9 hours for KST
      return kstDate.toISOString().slice(0, 19).replace("T", " "); // Format as 'yyyy-MM-dd HH:mm:ss'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/ProfitLoss/Components/Table.scss";
</style>