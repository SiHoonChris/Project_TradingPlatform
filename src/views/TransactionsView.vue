<template>
  <main id="transaction">
    <div id="transaction-ct">
      <div id="transaction-ct-container">
        <TransactionChart/>
      </div>
    </div>
    <div id="transaction-tbl">
      <div id="transaction-tbl-container">
        <TransactionTable :dateFrom="sendDateFrom" :dateTo="sendDateTo"/>
      </div>
    </div>
  </main>
</template>

<script>
import TransactionChart from '@/components/Transaction/TransactionChart.vue'
import TransactionTable from '@/components/Transaction/TransactionTable.vue'

export default {
  components: { TransactionChart, TransactionTable },
  data() {
    return {
      sendDateFrom: null,
      sendDateTo: null,
    }
  },
  methods: {
    getDateFrom(value){ this.sendDateFrom = value; },
    getDateTo(value){ this.sendDateTo = value; }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/View.scss";
</style>