<template>
  <div id="search-and-sort">
    <div id="search">
      <input id="search-input" name="search" type="text" placeholder="Search" v-model="searchText"/>
      <label name="search">{{numOfResult}}</label>
    </div>
    <select id="sort" v-model="holdAndTrend"> <!-- ul-li로 바꾸기 -->
      <option v-for='(e, i) in Object.keys(options)' :key="i" :value='options[e]'>{{e}}</option>
    </select>
  </div>
</template>

<script>
import us_market from "@/assets/us_market.json"

export default {
  data() {
    return {
      originalDatas: us_market,
      searchResults: [],
      searchText: '',
      holdAndTrend: '',
      options: {'All':'', 'Hold':'Y', 'Not-Hold':'N', 'Bull':'bull', 'Bear':'bear', 'Dear':'dear'}
    }
  },
  mounted(){
    this.$emit('datas', this.originalDatas);
  },
  computed: {
    numOfResult(){
      return this.searchResults.length;
    }
  },
  watch: {
    searchText: function(val) {
      this.searchResults 
        = this.originalDatas
            .filter(e => e.name.toLowerCase().startsWith(val.toLowerCase()) || e.ticker.toLowerCase().startsWith(val.toLowerCase()))
            .filter(e => e.hold.startsWith(this.holdAndTrend) || e.trend.startsWith(this.holdAndTrend));
      this.$emit('datas', this.searchResults);
      document.querySelector("label[name='search']").style.display = val !== '' ? "block" : "none" ;
    },
    holdAndTrend: function(val) {
      this.searchResults 
        = this.originalDatas
            .filter(e => e.hold.startsWith(val) || e.trend.startsWith(val))
            .filter(e => e.name.toLowerCase().startsWith(this.searchText.toLowerCase()) || e.ticker.toLowerCase().startsWith(this.searchText.toLowerCase()));
      this.$emit('datas', this.searchResults);
    }
  }
}
</script>

<style scoped>
#search-and-sort {
  padding: 6.3vh 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#search{
  display: flex;
  align-items: flex-end;
}
#search-input {
  height: 3vh;
  border: 1px solid white;
  background: #0a0a0a;
  color: white;
  font-weight: bold;
}
::placeholder {
  color: white;
}
label {
  color: white;
  margin-left: 0.5vw;
  display: none;
}
label::before {content: '('}
label::after  {content: ')'}
#sort {
  background: #1a1a1a;
  color: white;
  font-weight: bold;
  width: 6vw;
  height: 3vh;
}
option:hover{
  background: pink;
}

</style>