<template>
  <div id="FinancialReport">
    <div id="slide-btn">
      <button 
        @click="open(open)"
        @mouseover="changeColor('white')"
        @mouseleave="changeColor('gray')"
      >
        <img :src="btn" alt="financial_report">
      </button>
    </div>
    <ChartTable/>
  </div>
</template>

<script>
import ChartTable from "@/components/Chart/sub/ChartTable.vue"

export default {
  components: { ChartTable },
  data(){
    return {
      open: false,
      btn: require("@/assets/img/btnImg/Common/side_sub_menu_open_gray.png")
    }
  },
  methods: {
    open(){
      document.getElementById('chart-sub').style.right =
        this.open ? '0px' : 'calc(100vw - 20px)';
      document.getElementById('FinancialReport').style.paddingLeft =
        this.open ? '0px' : 'calc(20vw - 20px)';
      
      this.btn = 
        require(`@/assets/img/btnImg/Common/side_sub_menu_${this.open ? 'open' : 'close'}_gray.png`);
      
      this.open = !this.open;
    },
    changeColor(color){
      this.btn =  
        require(`@/assets/img/btnImg/Common/side_sub_menu_${this.open ? 'close' : 'open'}_${color}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Chart/sub/FinancialReport.scss";
</style>