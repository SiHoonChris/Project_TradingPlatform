<template>
  <div id="header-center">
    <input id="search-and-go" name="search-and-go" type="text" placeholder="Name, ticker symbol, or code" 
           v-model="urlParam" @focus="focusIn" @blur="focusOut"/>
    <label for="search-and-go">
      <ul v-if="urlParam !== null && urlParam !== '' && Suggestions.length !== 0 && focus" id="suggestion"
          @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <li v-for="(data, i) in Suggestions" :key="i" class="list"
            @click="$moveTo_3(Suggestions[i].TICKER)">
          <p>{{Suggestions[i].NAME}}</p>
          <p>&#40;{{Suggestions[i].TICKER}}&#41;</p>
        </li>
      </ul>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DATAS: null, 
      Suggestions: [], 
      urlParam: null, 
      focus: false, 
      hover: false, 
      where: null 
    }
  },
  created(){
    this.$http.get("/getAllAssetsData")
    .then(res => {
      this.DATAS = res.data;
      this.$store.commit('setAllAssetsData', res.data);
    })
    .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
  }, 
  watch: {
    urlParam: function(val) {
      if(val !== "" && val !== null) {
        this.Suggestions = [];  // 이전 검색 결과 지우고
        //새로운 검색 결과 다시 생성
        this.Suggestions.push(...this.DATAS.filter(e => e.NAME.toLowerCase().startsWith(val.toLowerCase())));
        this.Suggestions.push(...this.DATAS.filter(e => e.TICKER.toLowerCase().startsWith(val.toLowerCase())));
        this.Suggestions = [...new Set(this.Suggestions)];
      }
      else {
        this.Suggestions = [];
      }
    }
  },
  methods: {
    focusIn : function(){ this.focus = true; },
    focusOut: function(){ if(!this.hover) this.focus = false; },
    mouseEnter: function(){ this.hover = true; },
    mouseLeave: function(){ this.hover = false; }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/SearchAndMove.scss";
</style>