<template>
  <main id="portfolios">
    <div id="portfolio-main">
      <p id="portfolio-name"><span>Portfolio_name</span></p>
      <SelectedPortfolio :MainPortfolioData="MainPortfolioData" />
    </div>
    <div id="portfolios-sub">
      <NewPortfolio @emitDataAdded="funcDataAdded"/>
      <!-- <SubPortfolio @portfolioData="sendDataToMain" :dataAdded="dataAdded" /> -->
    </div>
  </main>
</template>

<script>
import SelectedPortfolio from '@/components/Portfolios/main/SelectedPortfolio.vue'
import NewPortfolio from '@/components/Portfolios/sub/NewPortfolio.vue'

export default {
  components: { SelectedPortfolio, NewPortfolio },
  data(){
    return{
      MainPortfolioData: null,
      dataAdded: null
    }
  },
  methods: {
    sendDataToMain(value){
      this.MainPortfolioData = value;
    },
    funcDataAdded: function(val) {
      this.dataAdded += val;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/View.scss";
</style>