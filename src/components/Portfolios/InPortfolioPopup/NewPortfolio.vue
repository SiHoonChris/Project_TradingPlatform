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
              <td><input :class="'price-'+String(e)" type="number" min="0" required value="0"></td> 
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
      paramForSearch: ''
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
    }
  },
  methods: {
    makeNewPortfolio: function(){
      const assetsToBeAdded = {
        NAME: this.portfolioName === null || this.portfolioName === '' ? 
              "New Portfolio" : this.portfolioName,
        TYPE: "Customized",
        ASSETS: this.setAssetsToBeAdded()
      };
        
      if(Object.keys(assetsToBeAdded['ASSETS']).length !== 0){
        this.$http.post("/portfolio/makeNewPortfolio", {params: assetsToBeAdded})
          .then(res => {
            console.log(this.$store.state.fxRates);
            this.$emit('emitDataAdded', 1);
            this.PopupOffByCancelBtn();
          })
          .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
      }
    },
    setAssetsToBeAdded: function(){
      const objAssets = {};
      for(const E of this.addAssetsData) {
        objAssets[E] = 
          document.querySelector(`.price-${E}`).value * document.querySelector(`.amount-${E}`).value;
      }
      return objAssets;
    },
    addAsset: function(d){
      this.addAssetsData.push(d);
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