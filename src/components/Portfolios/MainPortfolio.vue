<template>
  <div id="main-portfolio">
    <p id="portfolio-name"></p>
    <div id="main-donut">
      <div id="main-donut-chart" style="height: 361px;"></div>
      <p id="evalutaion">{{Value.toLocaleString()}}%</p>
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
      let nowPrice = this.getNowPrice(d.ASSETS);
      [this.Data, this.Sum, this.Value] = portfolioEval(d, nowPrice, this.$store.state.fxRates);
    }
  },
  methods: {
    getNowPrice: function(Arr){
      let obj = {};

      for(let el of Arr) {
        // let mrk = this.findMarket[this.findMarket.findIndex(v => v.TICKER === el)].MARKET;
        
        // this.$http.get("/portfolio/addAsset", {params: {TICKER: el, MARKET: mrk}})
        //   .then(res => {obj[el] = res.data[0].Close;})
        //   .catch(err => console.log(err));

        obj[el] = 10000;
        // 해당 종목의 가장 최근 가격(현재가)을 어떻게 가져올 것인가?
        // 서버단에서 객체 전체를 만들어서 보내주는 것도 방법일 듯 
      };

      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/Main.scss";
</style>