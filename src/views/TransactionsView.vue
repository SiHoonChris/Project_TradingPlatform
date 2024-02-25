<template>
  <main id="transaction">
    <div id="transaction-calendar-sector">
      <TransactionCalendar/>
    </div>
    <div id="transaction-table-sector">
      <TransactionTable/>
    </div>
  </main>
</template>

<script>
import TransactionCalendar from '@/components/Transaction/TransactionCalendar.vue'
import TransactionTable from '@/components/Transaction/TransactionTable.vue'

export default {
  components: { TransactionCalendar, TransactionTable }
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