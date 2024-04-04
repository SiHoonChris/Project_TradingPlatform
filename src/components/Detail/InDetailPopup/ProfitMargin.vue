<template>
  <div id="profit-margin"></div>
</template>

<script>
import SampleProfitMargin from "@/assets/SampleProfitMargin.json"

export default {
  date(){
    return {
      Data: null
    }
  },
  created(){
    this.Data = SampleProfitMargin;
  },
  mounted(){
    this.$Horizontal_Bar_Chart(this.Data, "#profit-margin");
  }
}
</script>

<style scoped>
  #profit-margin {
    width: 50%;
    height: 100%;
  }
</style>