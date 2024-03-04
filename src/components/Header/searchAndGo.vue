<template>
  <div id="header-center">
    <input id="search-and-go" name="search-and-go" type="text" placeholder="Name, ticker symbol, or code" 
           v-model="urlParam" @focus="focusIn" @blur="focusOut"/>
    <label for="search-and-go">
      <ul v-if="urlParam !== null && urlParam !== '' && Suggestions.length !== 0 && focus" id="suggestion"
          @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <li v-for="(data, i) in Suggestions" :key="i" class="list"
            @click="$moveTo_2(Suggestions[i].TICKER, Suggestions[i].NAME)">
          {{Suggestions[i].NAME}}
        </li>
      </ul>
    </label>
  </div>
</template>

<script>
export default {
  data () {
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
        this.$store.commit('setAllAssetsData', res.data);
        this.DATAS = this.$store.state.allAssetsData;
        console.log(this.DATAS);
      })
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
  },
  watch: {
    urlParam: function(val) {
      if(val !== ""){
        // this.Suggestions
        //   = this.DATAS
        //       .filter(
        //         e => e.name.toLowerCase().startsWith(val.toLowerCase()) 
        //         || e.name.toLowerCase().includes(val.toLowerCase()) 
        //         || e.ticker.toLowerCase().startsWith(val.toLowerCase()) 
        //         || e.ticker.toLowerCase().includes(val.toLowerCase())
        //       );
        this.Suggestions
          .push(...this.DATAS.filter(e => e.name.toLowerCase().startsWith(val.toLowerCase())))
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
label {
  display: flex;
  justify-content: center;
  width: 100%;
}
#suggestion {
  position: relative;
  display: block;
  width: 60%;
  max-height: 30vh;
  margin: 0;
  padding: 0;
  background: #0a0a0a;
  border: 1px solid gray;
  list-style-type: none;
  overflow-y: scroll;
}
.list {
  height: 3.4vh;
  padding: 0 1.6%;
  color: white;
}
.list:hover {
  background: #a9a9a938;
  text-decoration: underline;
  cursor: pointer;
}
</style>