<template>
  <main id="financial-statements">
    <div class="statements"><BalanceSheetTbl/></div>
    <div class="statements"><IncomeStatementTbl/></div>
  </main>
</template>

<script>
import BalanceSheetTbl from "@/components/FinancialStatements/BalanceSheetTable.vue"
import IncomeStatementTbl from "@/components/FinancialStatements/IncomeStatementTable.vue"

export default {
  components: { BalanceSheetTbl, IncomeStatementTbl }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/FinancialStatements/View.scss";
</style>
