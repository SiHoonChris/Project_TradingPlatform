<template>
  <div id="transaction-chart">
    <div id="chart-setting">
      <div id="setting-input">
        <div id="set-period">
          <span class="label">Period</span>
          <div id="period-select">
            <span id="dateFrom">2023.05.01</span> <!-- flatpickr -->
            <span>~</span>
            <span id="dateTo">2023.06.01</span> <!-- flatpickr -->
          </div>
        </div>
        <div id="set-transaction">
          <span class="label">Transaction</span>
          <select v-model="setTransaction">
            <option v-for="(e, i) in this.transaction_list" :key="i" :value="e">{{e}}</option>
          </select>
        </div>
        <div id="set-button">
          <button @click="getTransactionHistoryDataForChart()">
            <img :src="btn.img" :alt="btn.fn">
          </button>
        </div>
      </div>
      <div id="result-num">
        <span>num:</span>&nbsp;<span>{{(data.length).toLocaleString()}}</span>
      </div>
    </div>
    <div id="chart-result">
      <div id="chart-svg"></div>
    </div>
  </div>
</template>
<!-- <div id="calendar-sector">
      <TransactionCalendar @setDateFrom="getDateFrom" @setDateTo="getDateTo"/>
    </div>
    <div id="table-sector">
      <TransactionTable :dateFrom="sendDateFrom" :dateTo="sendDateTo"/>
    </div> -->

<script>
import TransactionCalendar from '@/components/Transaction/TransactionCalendar.vue'

export default {
  components: { TransactionCalendar },
  data() {
    return {
      btn: {fn:'transactions', img:require("@/assets/img/btnImg/Transaction/magnify_glass.png")},
      data: [],
      setTransaction: 'All',
      transaction_list: [
        "All",
        "Banking", "Exchange", "Trading",
        "Deposit", "Withdraw", "Dividend",
        "Exchange-Buy", "Exchange-Sell",
        "Buy", "Sell"
      ]
    }
  },
  methods: {
    getTransactionHistoryDataForChart : 
    function(){
      let tD = this.setTransaction === 'All' ? '' : this.setTransaction,
          df = document.getElementById("dateFrom").textContent.replaceAll(".", "-"),
          dt = document.getElementById("dateTo").textContent.replaceAll(".", "-");

      this.$http.get("/getTransactionHistoryDataForChart", 
        {
          params: { 
            Transaction: tD,
            DateFrom   : df,
            DateTo     : dt
          }
        })
        .then(res => {
          this.data = [];
          
          if(res.data.length !== 0) {
            this.data = res.data;
            this.$Scatter_Plot(res.data, 'chart-svg');
            // TransactionTable.vue에 transaction 정보 전송되어야 함
          }
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Chart.scss";
</style>