<template>
  <main id="transaction">
    <div id="transaction-calendar-sector">
      <TransactionCalendar @setDateFrom="getDateFrom" @setDateTo="getDateTo"/>
    </div>
    <div id="transaction-table-sector">
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

<style scoped>
#transaction {
  background: black;
  width: 100vw;
  height: 92vh;
  display: flex;
  overflow: hidden;
}
#transaction-calendar-sector {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
}
#transaction-table-sector {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>