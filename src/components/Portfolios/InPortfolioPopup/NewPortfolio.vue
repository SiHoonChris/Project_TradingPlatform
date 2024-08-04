<template>
  <div id="new-portfolio">
    <div id="included-assets">
      <div id="included-assets-thead">
        <table>
          <thead>
            <tr>
              <th>No.</th><th>Name</th><th>Price</th><th>Amount</th><th>Delete</th>
            </tr>
          </thead>
        </table>
      </div>
      <div id="included-assets-tbody">
        <table>
          <tbody>
            <tr v-for="(e, i) in addAssetsData" :key="i">
              <td>{{i+1}}</td>
              <td>{{e}}</td>
              <td><input :class="'price-'+String(e)" type="text"></td> 
              <td><input :class="'amount-'+String(e)" type="number" min="1" required value="1"></td>
              <td><button @click="removeAsset(e)">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="find-assets">
      <div id="find-assets-search">
        <input type="text" placeholder="Set portfolio-name" v-model="portfolioName">
        <input type="text" placeholder="Name, ticker symbol, or code" v-model="paramForSearch">
        <ul id="find-assets-suggest">
          <template v-if="suggestionResult.length != 0">
            <li v-for="(e,i) in suggestionResult" :key="i" @click="addAsset(e.TICKER)">
              <p>{{e.TICKER}}</p>
              <p>{{e.NAME}}</p>
            </li>
          </template>
        </ul>
      </div>
      <div id="find-assets-btns">
        <button @click="makeNewPortfolio()">EXECUTE</button>
        <button @click="PopupOffByCancelBtn()">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addAssetsData: [], 
      findAssetsData: null,
      suggestionResult: [],
      portfolioName: 'New Portfolio',
      paramForSearch: '',
      market_fxRates: {
        Shanghai  : "CNY/KRW",
        Hongkong  : "HKD/KRW", 
        Singapore : "SGD/KRW",
        Us        : "USD/KRW"
      }
    }
  },
  mounted(){
    this.findAssetsData = this.$store.state.allAssetsData;
  },
  watch: {
    paramForSearch: function(val) {
      if(val !== "" && val !== null) {
        this.suggestionResult = [];
        this.suggestionResult.push(...this.findAssetsData.filter(e => e.NAME.toLowerCase().startsWith(val.toLowerCase())));
        this.suggestionResult.push(...this.findAssetsData.filter(e => e.TICKER.toLowerCase().startsWith(val.toLowerCase())));
        this.suggestionResult = [...new Set(this.suggestionResult)];
      }
      else {
        this.suggestionResult = [];
      }
    },
    addAssetsData: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          let tableBody = document.getElementById('included-assets-tbody');
          let [scrollHeight, clientHeight] = [tableBody.scrollHeight, tableBody.clientHeight];
        
          if(scrollHeight > clientHeight) { 
            for(let e of document.querySelectorAll(`#included-assets-tbody tr:last-child td`)) {
              e.style.borderTop = "1px solid gray";
              e.style.borderBottom = "none";
            }
            tableBody.scrollBy(0, scrollHeight);
          }
        });
      },
      deep: true
    }
  },
  methods: {
    makeNewPortfolio: function(){
      let assetsToBeAdded = {
        NAME: [null, ''].includes(this.portfolioName) ? "New Portfolio" : this.portfolioName,
        TYPE: "Customized",
        ASSETS: this.addAssetsData,
        DATAS: this.setAssetsInPortfolio()
      };
        
      if(Object.keys(assetsToBeAdded['DATAS']).length !== 0){
        this.$http.post("/portfolio/makeNewPortfolio", {params: assetsToBeAdded})
          .then(res => {
            this.$emit('emitDataAdded', 1);
            this.PopupOffByCancelBtn();
          })
          .catch(err => console.log(err));
      }
    },
    setAssetsInPortfolio: function(){
      let datas = {};

      for(const E of this.addAssetsData) {
        let market = this.findAssetsData[this.findAssetsData.findIndex(e => e.TICKER === E)].MARKET;
        datas[E] = {
          FXRATE : market === "Korea" ? 1 : Number(this.$store.state.fxRates[ this.market_fxRates[market] ]),
          PRICE  : Number(document.querySelector(`.price-${E}`).value), 
          AMOUNT : Number(document.querySelector(`.amount-${E}`).value)
        };
      }
      
      return datas;
    },
    addAsset: function(ticker){
      let findDuplication = this.addAssetsData.find(asset => asset === ticker);
      
      if(findDuplication === undefined) { 
        let market = this.findAssetsData[this.findAssetsData.findIndex(e => e.TICKER === ticker)].MARKET;
        let closePrice = 0;

        this.$http.get("/portfolio/addAsset", {params: {TICKER: ticker, MARKET: market}})
          .then(res => {
            this.addAssetsData.push(ticker);
            closePrice = res.data[0].Close;
          })
          .then(added => {
            closePrice = closePrice.toFixed(closePrice % 1 === 0 ? 0 : 4).toLocaleString();
            document.querySelector(`.price-${ticker}`).value = closePrice;
          })
          .catch(err => console.log(err)); 
      }
    },
    removeAsset: function(E){
      this.addAssetsData.splice(this.addAssetsData.findIndex(el => el === E), 1);
    },
    PopupOffByCancelBtn: function(){
      this.$emit("PopupSwitchOff", false);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/New.scss";
</style>