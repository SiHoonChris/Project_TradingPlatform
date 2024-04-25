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

<style scoped>
  #new-portfolio {
    width: 100%;
    height: 98%;
    display: flex;
  }
  
  #included-assets {
    width: 70%;
    height: 100%;
    border: 1px solid gray;
    color: white;
  }
  #included-assets-thead {
    width: 100%;
    height: 6%;
    background: rgba(0, 0, 0, 0.4);
  }
  #included-assets-tbody {
    width: 100%;
    height: 94%;
    background: rgba(0, 0, 0, 0.4);
    overflow-y: scroll;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid gray;
  }
  th:nth-child(1) { width: 10%; border-right: 1px solid gray; }
  th:nth-child(2) { width: 40%; border-right: 1px solid gray; }
  th:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(4) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(5) { width: 10%; }
  td {
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid gray;
  }
  td:nth-child(1) { width: 10%; border-right: 1px solid gray; }
  td:nth-child(2) { width: 40%; border-right: 1px solid gray; }
  td:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(4) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(5) { width: 8.5%; border-right: 1px solid gray; }
  td input {
    width: 80%;
    height: 90%;
    text-align: right;
    color: white;
    background: rgba(0, 0, 0, 0.9);
    border: none;
  }
  td button {
    background: rgba(0, 0, 0, 0.9);
    color: white;
  }

  #find-assets {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #find-assets-search {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #find-assets-search input {
    width: 80%;
    height: calc(100% * 0.06);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid gray;
  }
  #find-assets-search input:first-child {
    margin-bottom: 2%;
  }
  #find-assets-suggest {
    width: 80%;
    max-height: 82%;
    list-style: none;
    padding: 0 2px;
    margin: 0;
    border: 1px solid gray;
    border-top: none;
    color: white;
    overflow-y: scroll;
  }
  #find-assets-suggest li {
    padding: 0.5% 0%;
    margin: 1% 0%;
    vertical-align: center;
  }
  #find-assets-suggest li p:first-child {
    margin: 0;
    font-weight: bold;
  }
  #find-assets-suggest li p:last-child {
    margin: 0;
    font-size: 14px;
  }
  #find-assets-suggest li:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  #find-assets-btns {
    width: 80%;
    height: 10%;
    padding: 0% 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #find-assets-btns button {
    width: 40%;
    height: 80%;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    border: 1px solid gray;
  }
  #find-assets-btns button:hover {
    cursor: pointer;
    border: 1px solid white;
  }
</style>
