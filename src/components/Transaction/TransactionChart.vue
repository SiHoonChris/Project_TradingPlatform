<template>
  <div id="transaction-chart">
    <div id="chart-setting">
      <div id="setting-input">
        <div id="set-period">
          <span class="label">Period</span> <!-- 날짜 선택 , 차트에서는 시간까지 출력 -->
          <div id="period-select">
            <span>2024.12.31</span> <!-- flatpickr -->
            <span>~</span>
            <span>2024.12.31</span> <!-- flatpickr -->
          </div>
        </div>
        <div id="set-transaction">
          <span class="label">Transaction</span>
          <select v-model="setTransaction">
            <option v-for="(e, i) in this.transaction_list" :key="i" :value="e">{{e}}</option>
          </select>
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
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Chart.scss";
</style>