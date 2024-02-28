<template>
  <main id="financial-statements">
    <div id="balance-sheet" class="statements">
      <BalanceSheetTable/>
    </div>
    <div id="income-statement" class="statements">
      <IncomeStatementTable/>
    </div>
  </main>
</template>

<script>
import BalanceSheetTable from "@/components/FinancialStatements/BalanceSheetTable.vue"
import IncomeStatementTable from "@/components/FinancialStatements/IncomeStatementTable.vue"

export default {
  components: { BalanceSheetTable, IncomeStatementTable },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
#financial-statements {
  background: black;
  width: 100vw;
  height: 92vh;
  display: flex;
  overflow: hidden;
}
#balance-sheet {
  width: 50vw;
  height: 100%;
  border-right: 1px solid gray;
}
#income-statement {
  width: 50vw;
  height: 100%;
}

</style>