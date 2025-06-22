<template>
  <div id="income-component">
    <div id="income-background">
      
      <div id="income-composite-chart" class="income-indicator-component">
        <IncomeCompositeChart/>
      </div>
      
      <div id="income-individual-chart" class="income-indicator-component">
        <div id="income-plus-chart" class="individuals">
          <IncomePlusChart/>
        </div>
        <div id="income-minus-chart" class="individuals">
          <IncomeMinusChart/>
        </div>
      </div>

      <div id="income-table" class="income-indicator-component">
        <IncomeTable/>
      </div>
      
    </div>
  </div>
</template>

<script>
import IncomeCompositeChart from '@/components/views/MainDashboard/IncomeComponent/IncomeCompositeChart.vue'
import IncomePlusChart from '@/components/views/MainDashboard/IncomeComponent/IncomePlusChart.vue'
import IncomeMinusChart from '@/components/views/MainDashboard/IncomeComponent/IncomeMinusChart.vue'
import IncomeTable from '@/components/views/MainDashboard/IncomeComponent/IncomeTable.vue'

export default {
  components: { 
    IncomeCompositeChart, 
    IncomePlusChart, 
    IncomeMinusChart,
    IncomeTable 
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/IncomeComponent.scss";
</style>
