<template>
  <main id="main-home">
    <div id="home-chart" class="home-components"><ChartComponent/></div>
    <div id="home-portfolio" class="home-components"><PortfolioComponent/></div>
    <div id="home-calendar" class="home-components"><CalendarComponent/></div>
    <div id="home-fx-rate" class="home-components"><FxrateComponent/></div>
    <div id="home-base-rate" class="home-components"><BaserateComponent/></div>
  </main>
</template>

<script>
  import ChartComponent from "@/components/Home/ChartComponent.vue"
  import PortfolioComponent from "@/components/Home/PortfolioComponent.vue"
  import CalendarComponent from "@/components/Home/CalendarComponent.vue"
  import FxrateComponent from "@/components/Home/FxrateComponent.vue"
  import BaserateComponent from "@/components/Home/BaserateComponent.vue"

  export default {
    components: {
      ChartComponent, 
      PortfolioComponent, 
      CalendarComponent, 
      FxrateComponent, 
      BaserateComponent
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/View.scss";
</style>
