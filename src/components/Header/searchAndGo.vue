<template>
  <div id="header-center">
    <input id="search-and-go" name="search-and-go" type="text" placeholder="Name, ticker symbol, or code" v-model="urlParam"/>
    <div v-if="urlParam !== null && urlParam !== ''" id="suggestion">
      <div v-for="(data, i) in Object.keys(Suggestions[Suggestions.length-1])" :key="i" class="result"
      @click="$moveTo_2(Suggestions[i].ticker)">
        {{Suggestions[i].name}}
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
      Suggestions: [{}],
      urlParam: null
    }
  },
  watch: {
    urlParam: function(val) {
      if(val !== ""){
        this.Suggestions
          = this.DATAS
              .filter(
                e => e.name.toLowerCase().startsWith(val.toLowerCase()) 
                || e.ticker.toLowerCase().startsWith(val.toLowerCase()) 
                || e.name.toLowerCase().includes(val.toLowerCase()) 
                || e.ticker.toLowerCase().includes(val.toLowerCase())
              );
      }
    }
  }
}
</script>

<style scoped>
#header-center {
  width: calc(100vw * 0.33);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
#search-and-go {
  width: calc(60% - 0.4% - 2px);
  height: calc(7.9vh * 0.5);
  margin-top: calc(7.9vh * 0.25 - 1px);
  padding-left: 0.4%;
  background: #0a0a0a;
  border: 1px solid gray;
  color: white;
}
::placeholder {
  color: gray;
}
#suggestion {
  position: relative;
  display: block;
  width: 60%;
  max-height: 30vh;
  background: #0a0a0a;
  border: 1px solid gray;
  overflow-y: scroll;
}
.result {
  height: 3.4vh;
  padding: 0 1.6%;
  color: white;
}
.result:hover {
  background: #a9a9a931;
  text-decoration: underline;
  cursor: pointer;
}
</style>