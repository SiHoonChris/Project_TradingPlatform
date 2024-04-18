<template>
  <div id="header-left">
    <div v-if="DATAS !== null" id="global-indexes">
      <div v-for="(d, i) in Object.keys(DATAS[0])" :key="i" class="result">
        <p class="index-key">{{d}}</p>
        <p class="index-values">
          <span>{{Number(DATAS[0][d]).toLocaleString()}}</span>
          <span>{{Number((DATAS[0][d] - DATAS[1][d]).toFixed(2)).toLocaleString()}}</span>
          <span>{{Number(((DATAS[0][d] - DATAS[1][d]) / DATAS[1][d] * 100).toFixed(2)).toLocaleString()}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DATAS: null
    }
  },
  created(){
    this.$http.get("/getGlobalIndexesData")
    .then(res => {
      this.DATAS = res.data;
      this.$store.commit("setFxRates", this.DATAS[0]);
    })
    .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
  },
  mounted(){
    setTimeout(() => {
      this.slider();
      setInterval(() => this.slider(), 4000);
      }
      , 1600
    );
  },
  updated(){
    for(const I of document.querySelectorAll(".index-values > span:nth-child(3)")) {
      if (Number(I.textContent) === 0) {
        I.className = "zero";
        I.previousSibling.className = "zero";
        I.textContent = "";
        I.previousSibling.textContent = "";
      } else if (Number(I.textContent) > 0) {
        I.className = "plus";
        I.previousSibling.className = "plus";
      } else {
        I.className = "minus"
        I.previousSibling.className = "minus";
      };
    }
  },
  methods: {
    slider(){
      const result = document.querySelectorAll('.result');
      const clone = document.querySelector('.result:first-child').cloneNode(true);
      setTimeout(()=>{
        for(const e of result){
          e.style.transform="translateY(-100%)";
          e.style.transition="1.6s linear";
        }
      });
      setTimeout(()=>{
        document.querySelector("#global-indexes").appendChild(clone);
        result[0].remove();
        for(const i in result){
          if(i>0) result[i].removeAttribute('style');
        }
      }, 1600);
    }
  }
}
</script>

<style scoped>
#header-left {
  width: calc(100vw * 0.24);
  height: 100%;
  overflow: hidden;
}
#global-indexes {
  height: calc(7.9vh * 10);
  width: 58%;
  padding-left: 4%;
}
.result {
  height: 7.9vh;
}
p {
  height: 50%;
  margin: 0;
  color: white;
  font-weight: bold;
}
.index-key {
  font-size: 1.3vw;
}
.index-values span:nth-child(1) {
  font-size: 1.1vw;
  margin-right: 0.5vw;
}
.index-values span:nth-child(2) {
  font-size: 0.8vw;
  margin-right: 0.4vw;
}
.index-values span:nth-child(3) {
  font-size: 0.8vw;
}

.plus { color: green; }
.plus:nth-child(2)::before { content: "▲"; }
.plus:nth-child(3)::before { content: "+"; }
.minus { color: red; }
.minus:nth-child(2)::before { content: "▼"; }
.plus:nth-child(3)::after, .minus:nth-child(3)::after { content: "%"; }

</style>