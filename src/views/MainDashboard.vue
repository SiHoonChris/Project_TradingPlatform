<template>
  <main id="main-dashboard-view">
    <div id="main-dashboard-expense" class="main-dashboard-components"><ExpenseComponent/></div>
    <div id="main-dashboard-income" class="main-dashboard-components"><IncomeComponent/></div>
    <div id="main-dashboard-asset" class="main-dashboard-components"><AssetComponent/></div>
  </main>
</template>

<script>
  import ExpenseComponent from "@/components/views/MainDashboard/ExpenseComponent.vue"
  import IncomeComponent from "@/components/views/MainDashboard/IncomeComponent.vue"
  import AssetComponent from "@/components/views/MainDashboard/AssetComponent.vue"

  export default {
    components: {
      ExpenseComponent, 
      IncomeComponent, 
      AssetComponent
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/views/MainDashboard.scss";
</style>
