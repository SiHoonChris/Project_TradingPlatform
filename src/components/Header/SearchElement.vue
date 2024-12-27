<template>
  <div id="search-element">

    <div id="search-cont" :class="{open: searchOpen}">
      <img :src="searchImg" id="search-img" :class="{open: searchOpen}" alt="search"
        @click="fn_searchOpen()"/>
      <input type="text" id="search-input" name="search-input" placeholder="Name, ticker symbol, or code number" 
        v-model="urlParam" 
        @focus="focusIn" @blur="focusOut"/>
    </div>
    
    <div id="suggest-cont">
<!-- <label for="search-input">
      <ul v-if="Suggestions.length !== 0 && focus" id="suggestion"
        @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <li v-for="(data, i) in Suggestions" :key="i" class="list"
          @click="$moveTo_2(Suggestions[i].TICKER)">
          <p>{{Suggestions[i].NAME}}</p>
          <p>&#40;{{Suggestions[i].TICKER}}&#41;</p>
        </li>
      </ul>
    </label> -->
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchImg: require('@/assets/img/btnImg/Common/magnify_glass.png'),
      urlParam: null, 
      searchOpen: false,

      DATAS: null, 
      Suggestions: [], 
      focus: false, 
      hover: false, 
      where: null 
    }
  },
  created(){
    this.$http.get("/getAllAssetsData")
      .then(
        res => {
          this.DATAS = res.data;
          this.$store.commit('setAllAssetsData', res.data);
        }
      )
      .then(
        done => {
          for(let E of this.$store.state.searchLog){
            this.Suggestions.push(...this.DATAS.filter(e => e.TICKER === E));
          }
          this.Suggestions = [...new Set(this.Suggestions)];
        }
      )
      .catch(
        err => console.log(err)
      );
  }, 
  watch: {
    urlParam: function(val) {
      this.Suggestions = []; 

      if(val !== "" && val !== null) {
        this.Suggestions.push(...this.DATAS.filter(e => e.NAME.toLowerCase().startsWith(val.toLowerCase())));
        this.Suggestions.push(...this.DATAS.filter(e => e.TICKER.toLowerCase().startsWith(val.toLowerCase())));
      }
      else {
        for(let E of this.$store.state.searchLog){
          this.Suggestions.push(...this.DATAS.filter(e => e.TICKER === E));
        }
      }

      this.Suggestions = [...new Set(this.Suggestions)];
    }
  },
  methods: {
    // focusIn :   function(){ this.focus = true;                  },
    // focusOut:   function(){ if(!this.hover) this.focus = false; },
    // mouseEnter: function(){ this.hover = true;  },
    // mouseLeave: function(){ this.hover = false; }
    fn_searchOpen: function () {
      this.searchOpen = !this.searchOpen;
      let searchInputElem = document.getElementById("search-input");

      if (this.searchOpen) {
        searchInputElem.placeholder = 'Name, ticker symbol, or code number';
        searchInputElem.focus();
      } else {
        searchInputElem.placeholder = '';
        searchInputElem.blur();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/SearchElement.scss";
</style>
