<template>
  <div id="find-portfolio">
    <p id="title">
      <span>New / Other</span>
    </p>
    <div id="main">
      <input id="search-portfolio-list">
      <div id="portfolio-list">
        <ul id="select-list">
          <li v-for="(d, i) in data" :key="i"
            @click="showInfo(d)" 
            @dblclick="changePortfolio()">
            <span>{{d.NAME}}</span>
          </li>
        </ul>
        <ul id="portfolio-info">
          <li>Assets : {{this.numOfAssets}}</li>
          <li>Sum(\) : {{Number(this.sumTotal).toLocaleString()}}</li>
          <li>Value(E, %) : {{this.valutaion}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      numOfAssets: null,
      sumTotal: null,
      valutaion: null
    }
  },
  created(){
    this.getPortfolios();
  },
  methods: {
    getPortfolios: function(){
      this.$http.get("/portfolio/getPortfolioData")
        .then(res => {
            this.data = res.data;
            // this.$emit('portfolioData', this.Data[0]);
          }
        )
        .catch(err => console.log(err))
    },
    showInfo: function(data){
      this.numOfAssets = data.ASSETS.length,
      this.sumTotal = 123456789.123,
      this.valutaion = 123.1234
    },
    changePortfolio: function(){
      this.closeSubPage();
    },
    closeSubPage: function(){
      document.getElementById('portfolios-sub').style.right = '0px';
      document.getElementById('new-portfolio').style.paddingLeft = '0px';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/sub/findPortfolio.scss";
</style>