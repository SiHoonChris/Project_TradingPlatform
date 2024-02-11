<template>
  <div id="header-center">
    <input id="search-and-go" name="search-and-go" type="text" placeholder=" Name, ticker symbol, or code" v-model="urlParam"/>
    <div id="search-results">
      <div v-for="(data, i) in Object.keys(searchResults[searchResults.length-1])" :key="i" class="result"
      @click="$moveTo_2(searchResults[i].ticker)">
        {{searchResults[i].name}}
      </div>
    </div>
  </div>
</template>

<script>
import us_market from "@/assets/us_market.json"

export default {
  data () {
    return {
      DATAS: us_market,
      searchResults: [''],
      urlParam: ''
    }
  },
  watch: {
    urlParam: function(val) {
      if(val !== ""){
        this.searchResults 
          = this.DATAS
              .filter(e => e.name.toLowerCase().includes(val.toLowerCase()) || e.ticker.toLowerCase().includes(val.toLowerCase()));
        document.getElementById("search-results").style.display = val === "" ? "none" : "block";
      }
    }
  }
}
</script>

<style scoped>
#header-center {
  width: calc(100vw * 0.33);
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
#search-and-go {
  width: 60%;
  height: calc(7.9vh * 0.5);
  margin-top: calc(7.9vh * 0.25 - 1px);
  background: #0a0a0a;
  border: 1px solid gray;
  color: white;
}
::placeholder {
  color: gray;
}
#search-results {
  position: relative;
  display: none;
  width: 60%;
  max-height: 30vh;
  background: #0a0a0a;
  border: 1px solid gray;
  overflow-y: scroll;
}
.result {
  height: 4vh;
  color: white;
  vertical-align: middle;
}
.result:hover {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>