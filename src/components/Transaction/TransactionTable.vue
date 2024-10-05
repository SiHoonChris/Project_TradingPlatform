<template>
  <div id="transaction-table">
    <div id="table-info">
      <div id="tbl-period">
        <span class="label">Period in detail</span>
        <div id="period-result">
          <input type="text" readonly id="period-date-from" value=""/>
          <span style="color:#ffffff; margin:0 4px; font-size:13px;">~</span>
          <input type="text" readonly id="period-date-to" value=""/>
        </div>
      </div>
      <div id="tbl-result">
        <span class="label">Expense in total</span>
        <div id="expense-result">
          <input type="text" readonly :value="(expenseTotal).toLocaleString()"/>
          <span style="color:#ffffff; margin-left:2px; font-size:13px;">(\)</span>
        </div>
      </div>
    </div>
    <div id="table-result">
      <button id="createTblButton" style="display: none;" @click="getTransactionHistoryDataForTable()"></button>
      <div id="table-canvas"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["transactionFromChart"],
  data() {
    return {
      data : [],
      expenseTotal: 0
    }
  },
  methods: {
    getTransactionHistoryDataForTable : 
    function(){
      let tD   = this.transactionFromChart, 
          eMin = this.$setExpense['expenseMin'], 
          eMax = this.$setExpense['expenseMax'], 
          df   = document.getElementById('period-date-from').value.replaceAll('.', '-'), 
          dt   = document.getElementById('period-date-to').value.replaceAll('.', '-');

      this.$http.get("/getTransactionHistoryDataForTable", {
          params: { 
            Transaction: tD,
            ExpenseMin : eMin,
            ExpenseMax : eMax,
            DateFrom   : df,
            DateTo     : dt
          }
        }).then(res => {
          this.data = [];

          if(res.data.length !== 0) {
            // 테이블 생성
            this.data = res.data;
            
            if(document.getElementById('table-canvas').nextSibling){
              document.getElementById('table-canvas').nextSibling.remove();
            }
            this.$Create_Table (
              this.data, 
              "table-result", 
              getComputedStyle(document.getElementById('table-canvas')).width, 
              getComputedStyle(document.getElementById('table-canvas')).height, 
              false
            );
            document.getElementById('table-canvas').nextSibling.style.position='absolute';
            
            // Expense 총계
            this.getExpenseSumForTable(tD, eMin, eMax, df, dt);
          }
        }).catch(err => console.log(err));
    },
    getExpenseSumForTable : 
    function(tD, eMin, eMax, df, dt){
      this.$http.get("/getExpenseSumForTable", {
          params: { 
            Transaction: tD,
            ExpenseMin : eMin,
            ExpenseMax : eMax,
            DateFrom   : df,
            DateTo     : dt
          }
        })
        .then(res => this.expenseTotal = res.data[0].expense_sum)
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Table.scss";
</style>