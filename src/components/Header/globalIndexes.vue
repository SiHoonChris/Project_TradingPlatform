<template>
  <div id="header-left">
    <div v-if="DATAS !== null" id="global-indexes">
      <div v-for="(d, i) in Object.keys(DATAS[0])" :key="i" class="g_idx">
        <div class="idx_name">{{d}}</div>
        <div class="idx_value">
          <p>
            <span>{{Number(DATAS[0][d]).toLocaleString()}}</span>
          </p>
          <p>
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
    for(const I of document.querySelectorAll(".calculated")) {
      if (Number(I.textContent) === 0) {
        I.className = "zero";
        I.previousSibling.className = "zero";
        I.textContent = "";
        I.previousSibling.textContent = "";
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
      const result = document.querySelectorAll('.g_idx');
      const clone = document.querySelector('.g_idx:first-child').cloneNode(true);
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

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/GlobalIndexes.scss";
</style>