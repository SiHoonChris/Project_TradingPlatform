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
      <div id="table-transaction-list">
        <div id="list-header">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Expense</th>
              </tr>
            </thead>
          </table>
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
  props: ["transactionConditionForTable"],
  data() {
    return {
      data : [],
      expenseTotal: 0
    }
  },
  methods: {
    getTransactionHistoryDataForTable : function () {
      let eMin  = this.transactionConditionForTable['expenseMin'], 
          eMax  = this.transactionConditionForTable['expenseMax'],  
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
          }
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
  @import "@/assets/css/Expense/Components/Table.scss";
</style>