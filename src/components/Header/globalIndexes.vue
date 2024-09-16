<template>
  <div id="header-left">
    <div v-if="DATAS !== null" id="global-indexes" 
      @mouseover="overflow('visible')" @mouseleave="overflow('hidden')">
      <div v-for="(d, i) in Object.keys(DATAS[0])" :key="i" class="g_idx">
        <div class="idx_name">
          <p>
            <span>{{d}}</span>
          </p>
        </div>
        <div class="idx_value">
          <p class="value" v-if="Number(DATAS[0][d] - DATAS[1][d]) != 0">
            <span>{{Number(DATAS[0][d]).toLocaleString()}}</span>
          </p>
          <p class="value" style="height: 60%;" v-else>
            <span>{{Number(DATAS[0][d]).toLocaleString()}}</span>
          </p>
          <p class="change" v-if="Number(DATAS[0][d] - DATAS[1][d]) != 0">
            <span>{{Number((DATAS[0][d] - DATAS[1][d]).toFixed(2)).toLocaleString()}}</span>
            <span class="calculated">{{Number(((DATAS[0][d] - DATAS[1][d]) / DATAS[1][d] * 100).toFixed(2)).toLocaleString()}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DATAS: null,
      fn_slider: null,
      idxNum: 0
    }
  },
  created(){
    this.$http.get("/getGlobalIndexesData")
    .then(res => {
      this.DATAS = res.data;
      this.idxNum = Object.keys(this.DATAS[0]).length;
      this.$store.commit("setFxRates", this.DATAS[0]);
    })
    .catch(err => console.log(err));
  },
  mounted(){
    setTimeout(() => {
      this.slider();
      this.fn_slider = setInterval(() => this.slider(), 400*this.idxNum);
    }, 1604);
  },
  updated(){
    document.getElementById('global-indexes').style.height = `calc(40px * ${this.idxNum})`;
    
    for(const I of document.querySelectorAll(".calculated")) {
      if (Number(I.textContent) === 0) {
        I.className = "zero";
        I.previousSibling.className = "zero";
        I.textContent = "0.00";
        I.previousSibling.textContent = "0";
      } else if (Number(I.textContent) > 0) {
        I.className = "plus";
        I.previousSibling.className = "plus";
      } else {
        I.className = "minus";
        I.previousSibling.className = "minus";
      };
    }
  },
  methods: {
    slider(){
      let clone = document.querySelector('.g_idx:first-child').cloneNode(true);
      document.querySelector("#global-indexes").appendChild(clone);

      setTimeout(()=>{
        let result = document.querySelectorAll('.g_idx');
        for(let e of result){
          e.style.transform="translateY(-100%)";
          e.style.transition="1.6s linear";
        }
      }, 4);
      setTimeout(()=>{
        let result = document.querySelectorAll('.g_idx');
        result[0].remove();
        for(let i in result){
          if(i>0) result[i].removeAttribute('style');
        }
      }, 1604);
    },
    overflow(style){
      document.getElementById('header-left').style.overflow=style;

      switch(style){
        case 'visible':
          clearInterval(this.fn_slider);
          break;
        case 'hidden':
          setTimeout(() => {
            this.slider();
            this.fn_slider = setInterval(() => this.slider(), 400*this.idxNum);
          }, 1600);
          break;
        default: //none
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/GlobalIndexes.scss";
</style>