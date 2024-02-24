<template>
  <main id="financial-statements">
    <div id="balance-sheet" class="statements">
      <TableSlot>
        <template v-slot:header>Balance Sheets</template>
        <template v-slot:balance></template>
        <template v-slot:income><div style="display: none;"></div></template>
      </TableSlot>
    </div>
    <div id="income-statement" class="statements">
      <TableSlot>
        <template v-slot:header>Income Statements</template>
        <template v-slot:balance><div style="display: none;"></div></template>
        <template v-slot:income></template>
      </TableSlot>
    </div>
  </main>
</template>

<script>
import TableSlot from "@/components/FinancialStatements/TableSlot.vue"

export default {
  components: { 
    TableSlot
  },
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