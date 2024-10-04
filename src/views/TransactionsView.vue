<template>
  <main id="transaction">
    <div id="transaction-ct">
      <div id="transaction-ct-container">
        <TransactionChart @sendTransaction="defineTransaction"/>
      </div>
    </div>
    <div id="transaction-tbl">
      <div id="transaction-tbl-container">
        <TransactionTable :transactionFromChart="transactionToSet"/>
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
      transactionToSet: ''
    }
  },
  methods: {
    defineTransaction(val) {
      this.transactionToSet = val;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/View.scss";
</style>