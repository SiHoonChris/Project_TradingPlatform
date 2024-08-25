<template>
  <div id="main-portfolio">
    <p id="portfolio-name"></p>
    <div id="main-donut">
      <div id="main-donut-chart" style="height: 361px;"></div>
      <p id="evalutaion">
        {{['-0', '0'].includes(String(Value)) ? '0.00' : Value.toLocaleString()}}%
      </p>
    </div>
    <div id="assets-in-portfolio">
      <label v-for="(d,i) in Object.keys(this.Data)" :id="`of_${d}`" :key="i">
        <input type="checkbox" name="color-section" disabled/>
        <div class="asset-label">
          <span>{{d}}</span>
          <span>{{((this.Data[d]/this.Sum)*100).toFixed(2)}}%</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { portfolioEval } from '../../assets/js/Portfolio/PortfolioEvaluation'

export default {
  props: ['MainPortfolioData'],
  data() {
    return {
      Data: {"": 0},
      Sum: 1,
      Value: 0,
      findMarket: null
    }
  },
  mounted() {
    this.findMarket = this.$store.state.allAssetsData;
  },
  updated(){
    this.$Color_Tag();
  },
  watch: {
    MainPortfolioData: function(d){
      let paramArr = d.ASSETS.map(e => e = {
        TICKER: e, 
        MARKET: this.findMarket[this.findMarket.findIndex(v => v.TICKER === e)].MARKET
      });
      let sendObj = {array: paramArr};

      this.$http.get("/portfolio/getCurrentPrices", {params: sendObj})
        .then(res => {
          [this.Data, this.Sum, this.Value] = 
            portfolioEval(d, res.data, this.$store.state.fxRates);
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/Main.scss";
</style>