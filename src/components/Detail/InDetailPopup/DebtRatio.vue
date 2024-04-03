<template>
  <div id="debt-ratio"></div>
</template>

<script>
import SampleDebtRatioData from "@/assets/SampleDebtRatioData.json"

export default {
  data() {
    return{
      Data: null
    }
  },
  created(){
    this.Data = SampleDebtRatioData;
  },
  mounted(){
    this.$Donut_Chart(this.Data[0], "#debt-ratio");
    // const PERCENT = Math.round(this.Data[0].TotalLiabilities / this.Data[0].TotalEquity)*100 + '%';
    // d3.select("#debt-ratio svg").append('text')
    // .text(PERCENT)
    // .attr("class", "percentage")
    // .attr('text-anchor', 'middle')
    // .style('fill', 'white')
    // .style('font-size', '40px');
  }
}
</script>

<style scoped>
  #debt-ratio {
    width: 50%;
    height: 100%;
  }
</style>