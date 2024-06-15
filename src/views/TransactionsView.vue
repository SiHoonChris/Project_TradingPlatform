<template>
  <main id="transaction">
    <div id="calendar-sector">
      <TransactionCalendar @setDateFrom="getDateFrom" @setDateTo="getDateTo"/>
    </div>
    <div id="table-sector">
      <TransactionTable :dateFrom="sendDateFrom" :dateTo="sendDateTo"/>
    </div>
  </main>
</template>

<script>
import TransactionCalendar from '@/components/Transaction/TransactionCalendar.vue'
import TransactionTable from '@/components/Transaction/TransactionTable.vue'

export default {
  components: { TransactionCalendar, TransactionTable },
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