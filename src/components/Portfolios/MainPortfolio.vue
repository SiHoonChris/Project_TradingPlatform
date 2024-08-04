<template>
  <div id="main-portfolio">
    <p id="portfolio-name"></p>
    <div id="main-donut">
      <div id="main-donut-chart" style="width: 100%; height: 361px;"></div>
      <p id="evalutaion">Evaluation</p>
    </div>
    <div id="assets-in-portfolio">
      <label v-for="(d,i) in Object.keys(this.Data)" :key="i">
        <input type="checkbox" name="color-section" disabled/>
        <div class="asset-label">
          <span>{{d}}</span>
          <span>{{((this.Data[d]/this.Sum)*100).toFixed(2)}}%</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['MainPortfolioData'],
  data() {
    return {
      Data: {"": 0},
      Sum: 1
    }
  },
  updated(){
    this.$Color_Tag();
  },
  watch: {
    MainPortfolioData: function(d){
      this.Data = d.CHART_DATA;
      this.Sum = Object.values(this.Data).reduce((a, b)=> a + b, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/Main.scss";
</style>