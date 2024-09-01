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
export default {
  data() {
    return {
      originalDatas: null, 
      searchResults: [],
      searchText: '',
      holdAndTrend: '',
      options: {'All':'', 'Hold':'Y', 'Not-Hold':'N', 'Bull':'bull', 'Bear':'bear', 'Dear':'dear'}
    }
  },
  created(){
    if(this.$store.state.allAssetsData === null){
      this.$http.get("/getAllAssetsData")
      .then(res => {
        this.$emit('datas', res.data);
        this.originalDatas = res.data;
      })
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    }
    else {
      this.originalDatas = this.$store.state.allAssetsData;
    }
  }, 
  mounted(){ 
    if(this.originalDatas !== null) this.$emit('datas', this.originalDatas);
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
            .filter(e => e.NAME.toLowerCase().startsWith(val.toLowerCase()))
            .filter(e => e.HOLD.startsWith(this.holdAndTrend) || e.TREND.startsWith(this.holdAndTrend));
      this.$emit('datas', this.searchResults);
      document.querySelector("label[name='search']").style.display = val !== '' ? "block" : "none" ;
    },
    holdAndTrend: function(val) {
      this.searchResults 
        = this.originalDatas
            .filter(e => e.HOLD.startsWith(val) || e.TREND.startsWith(val))
            .filter(e => e.NAME.toLowerCase().startsWith(this.searchText.toLowerCase()));
      this.$emit('datas', this.searchResults);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/SearchAndSort.scss";
</style>