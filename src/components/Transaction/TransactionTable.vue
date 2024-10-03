<template>
  <div id="transaction-table">
    <div id="table-info">
      <div id="tbl-period">
        <span class="label">Period in detail</span>
        <div id="period-result">
          <input v-if="data.length !== 0" type="text" readonly :value="
            new Date(data[0].Date).toLocaleString('ja-JP').replaceAll('/', '.')
          "/> <input v-else type="text" readonly value=""/>
          <span style="color:#ffffff; margin:0 4px; font-size:13px;">~</span>
          <input v-if="data.length !== 0" type="text" readonly :value="
            new Date(data[data.length-1].Date).toLocaleString('ja-JP').replaceAll('/', '.')
          "/> <input v-else type="text" readonly value=""/>
        </div>
      </div>
      <div id="tbl-result">
        <span class="label">Expense in total</span>
        <div id="expense-result">
          <input type="text" readonly :value="(expenseTotal).toLocaleString()" @click="getTransactionHistoryDataForTable()"/> <!-- 서버 단에서 계산해서 결과 전송 -->
          <span style="color:#ffffff; margin-left:2px; font-size:13px;">(\)</span>
        </div>
      </div>
    </div>
    <div id="table-result">
      <div id="table-canvas"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data : [],
      expenseTotal: 0
    }
  },
  methods: {
    getTransactionHistoryDataForTable : 
    function(){
      // let tD = this.setTransaction === 'All' ? '' : this.setTransaction,
      //     df = document.getElementById("dateFrom").textContent.replaceAll(".", "-"),
      //     dt = document.getElementById("dateTo").textContent.replaceAll(".", "-");
      // TransactionChart.vue에서 정보 전송받기
      let tD = '', eMin = 0, eMax = 10000, df = "2023-05-01", dt = "2023-06-01";

      this.$http.get("/getTransactionHistoryDataForTable", 
        {
          params: { 
            Transaction: tD,
            ExpenseMin : eMin,
            ExepnseMax : eMax,
            DateFrom   : df,
            DateTo     : dt
          }
        })
        .then(res => {
          this.data = [];
          
          if(res.data.length !== 0) {
            // 테이블 생성
            this.data = res.data;
            this.$Create_Table (
              this.data, 
              "table-result", 
              getComputedStyle(document.getElementById('table-canvas')).width, 
              getComputedStyle(document.getElementById('table-canvas')).height, 
              false
            );
            document.getElementById('table-canvas').nextSibling.style.position='absolute';
            // Expense 총계
            this.expenseTotal = 10000;
          }
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Table.scss";
</style>