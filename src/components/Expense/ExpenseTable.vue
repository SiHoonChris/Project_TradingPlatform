<template>
  <div id="component-expense-table">
    <div id="table-info">
      <div id="tbl-period">
        <span class="label">Selected Period</span>
        <div id="period-result">
          <input type="text" readonly id="period-date-from" value=""/>
          <span style="color:#ffffff; margin:0 4px; font-size:13px;">~</span>
          <input type="text" readonly id="period-date-to" value=""/>
        </div>
      </div>
      <div id="tbl-result">
        <span class="label">Expense</span>
        <div id="expense-result">
          <input type="text" readonly :value="(expenseTotal).toLocaleString()"/>&nbsp;
          <span style="color:#ffffff; margin-left:2px; font-size:13px;">(KRW)</span>
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
  props: ["transactionConditionForTable"],
  data() {
    return {
      data : [],
      expenseTotal: 0
    }
  },
  methods: {
    getTransactionHistoryDataForTable : function(){
      let eMin  = this.transactionConditionForTable['expenseStart'], 
          eMax  = this.transactionConditionForTable['expenseFrom'],  
          dFrom = this.transactionConditionForTable['dateFrom'], 
          dTo   = this.transactionConditionForTable['dateTo'],
          tType = this.transactionConditionForTable['transactionType'];

      this.$http.get("/getTransactionHistoryDataForTable", {
          params: { 
            ExpenseMin : eMin,
            ExpenseMax : eMax,
            DateFrom   : dFrom,
            DateTo     : dTo,
            TransactionType : tType
          }
        }).then(res => {
          this.data = [];

          if(res.data.length !== 0) {
            [this.data, this.expenseTotal] = [res.data.data, res.data.expenseTotal];
            console.log("ExpenseTable");
            console.log(this.data);
            console.log(this.expenseTotal)
            
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
          }
        }).catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/Components/Table.scss";
</style>