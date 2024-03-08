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