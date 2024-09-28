<template>
  <div id="header-lower">
    <div v-if="DATAS !== null" id="global-indexes">
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
          <p class="value" v-else>
            <span>{{Number(DATAS[0][d]).toLocaleString()}}</span>
          </p>
          <p class="change" v-if="Number(DATAS[0][d] - DATAS[1][d]) != 0">
            <span>{{Number((DATAS[0][d] - DATAS[1][d]).toFixed(2)).toLocaleString()}}</span>
            <span class="calculated">{{Number(((DATAS[0][d] - DATAS[1][d]) / DATAS[1][d] * 100).toFixed(2)).toLocaleString()}}</span>
          </p>
        </div>
      </div>
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
          <p class="value" v-else>
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
    }
  },
  created(){
    this.$http.get("/getGlobalIndexesData")
    .then(res => {
      this.DATAS = res.data;
      this.$store.commit("setFxRates", this.DATAS[0]);
    })
    .catch(err => console.log(err));
  },
  updated(){
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
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/GlobalIndexes.scss";
</style>