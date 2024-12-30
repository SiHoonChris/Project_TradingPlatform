<template>
  <div id="search-element">

    <div id="search-cont" :class="{open: searchOpen}">
      <img :src="searchImg" id="search-img" :class="{open: searchOpen}" alt="search"
        @click="fn_searchOpen()"/>
      <input type="text" id="search-input" name="search-input" placeholder="" 
        v-model="urlParam" 
        @focus="fn_focus(true)" @blur="fn_focus(false)"/>
    </div>
    
    <div id="suggest-cont">
      <ul v-if="suggestion.length !== 0 && focused" id="suggestion" 
          @mouseenter="fn_hover(true)" @mouseleave="fn_hover(false)">
        <li v-for="(data, i) in suggestion" :key="i" class="in-suggestion"
            @click="fn_moveTo(suggestion[i].TICKER)">
          <p>{{suggestion[i].NAME}}</p>
          <p>{{`(${suggestion[i].TICKER})`}}</p>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchImg: require('@/assets/img/btnImg/Common/magnify_glass.png'), 
        searchOpen: false, 
        urlParam: null, 
        data: null, 
        suggestion: [], 
        focused: false, 
        hover: false
      }
    },
    created () {
      this.$http.get("/getAllAssetsData")
        .then(
          res => {
            this.data = res.data;
            this.$store.commit('setAllAssetsData', res.data);
          }
        )
        .then(
          done => {
            for(let E of this.$store.state.searchLog){
              this.suggestion.push(...this.data.filter(e => e.TICKER === E));
            }
            this.suggestion = [...new Set(this.suggestion)];
          }
        )
        .catch(
          err => console.log(err)
        );
    }, 
    watch: {
      urlParam: function(val) {
        this.suggestion = []; 

        if(val !== "" && val !== null) {
          this.suggestion.push(...this.data.filter(e => e.NAME.toLowerCase().startsWith(val.toLowerCase())));
          this.suggestion.push(...this.data.filter(e => e.TICKER.toLowerCase().startsWith(val.toLowerCase())));
        }
        else {
          for(let E of this.$store.state.searchLog){
            this.suggestion.push(...this.data.filter(e => e.TICKER === E));
          }
        }

        this.suggestion = [...new Set(this.suggestion)];
      }
    },
    methods: {
      fn_focus: function (bool) {
        if (bool) {
          this.focused = bool;
        } else {
          if(!this.hover) this.focused = bool;
        }
      },
      fn_hover: function (bool) {
        this.hover = bool;
      },
      fn_searchOpen: function () {
        let searchInputElem = document.getElementById("search-input");

        this.searchOpen = [null, ''].includes(searchInputElem.value) ? !this.searchOpen : this.searchOpen;

        if (this.searchOpen) {
          setTimeout(() => {
            searchInputElem.placeholder = 'Name, ticker symbol, or code number';
            searchInputElem.focus();
          }, 2000);
        } else {
          searchInputElem.placeholder = '';
          searchInputElem.blur();
        }
      },
      fn_moveTo: function (ticker) {
        this.$moveTo_2(ticker);
        this.focused = !this.focused;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/SearchElement.scss";
</style>
