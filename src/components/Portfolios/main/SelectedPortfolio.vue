<template>
  <div id="selected-portfolio">
    <div id="portfolio-content">
      <div id="chart">
        <!-- <p id="portfolio-name"></p>
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
    </div> -->
      </div>
      <div id="portfolio-table">
        <div id="tbl-top">
          <div id="table-info">
            <div class="tbl-info">
              <span class="label">Sum</span>
              <div class="result">
                <input id="portfolio-sum" type="text" readonly :value="(10.23).toLocaleString()"/>
                <span style="color:#ffffff; margin-left:2px; font-size:13px;">(\)</span>
              </div>
            </div>
            <div class="tbl-info">
              <span class="label">Valuation(E)</span>
              <div class="result">
                <input id="portfolio-valuation" type="text" readonly :value="(10.23).toLocaleString()"/>
                <span style="color:#ffffff; margin-left:2px; font-size:13px;">(%)</span>
              </div>
            </div>
          </div>
          <div class="tbl-modify">
            <button>New / Other</button>
          </div>
        </div>
        <div id="table"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { portfolioEval } from '../../../assets/js/Portfolio/PortfolioEvaluation'

export default {
  props: ['MainPortfolioData'],
  data() {
    return {
      Data: {"": 0},
      Sum: 1,
      Value: 0,
      findMarket: null,
      tblData: [
        {"Name": 'AAPL',  "FX":'USD', "Price": 100.1234, "Amount": 1000, "Total(KRW)":13000, "Proportion(%)": 15},
        {"Name": 'XOM',   "FX":'USD', "Price": 100.1234, "Amount": 500,  "Total(KRW)":13000, "Proportion(%)": 15},
        {"Name": 'CRM',   "FX":'USD', "Price": 100.1234, "Amount": 1200, "Total(KRW)":13000, "Proportion(%)": 15},
        {"Name": 'KO',    "FX":'USD', "Price": 100.1234, "Amount": 800,  "Total(KRW)":13000, "Proportion(%)": 15},
        {"Name": 'GOOGL', "FX":'USD', "Price": 100.1234, "Amount": 10,   "Total(KRW)":13000, "Proportion(%)": 15},
        {"Name": 'MSFT',  "FX":'USD', "Price": 100.1234, "Amount": 320,  "Total(KRW)":13000, "Proportion(%)": 15}
      ]
    }
  },
  mounted(){
    this.findMarket = this.$store.state.allAssetsData;

    if(document.getElementById('table').hasChildNodes()){
      document.getElementById('table').removeChild(document.getElementById('table').childNodes[0]);
    }
    this.$Create_Table (
      this.tblData, 
      "table", 
      getComputedStyle(document.getElementById('table')).width,
      getComputedStyle(document.getElementById('table')).height,
      true
    );
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
  @import "@/assets/css/Portfolios/main/SelectedPortfolio.scss";
</style>