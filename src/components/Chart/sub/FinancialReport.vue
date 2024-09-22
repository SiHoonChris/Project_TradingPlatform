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
      btn: require("@/assets/img/btnImg/FinancialReport/financial_report_open_gray.png")
    }
  },
  methods: {
    open(){
      document.getElementById('chart-sub').style.right =
        this.open ? '0px' : 'calc(100vw - 20px)';
      document.getElementById('FinancialReport').style.paddingLeft =
        this.open ? '0px' : 'calc(20vw - 20px)';
      
      this.btn = 
        require(`@/assets/img/btnImg/FinancialReport/financial_report_${this.open ? 'open' : 'close'}_gray.png`);
      
      this.open = !this.open;
    },
    changeColor(color){
      this.btn =  
        require(`@/assets/img/btnImg/FinancialReport/financial_report_${this.open ? 'close' : 'open'}_${color}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
  #FinancialReport {
    display: flex;
    width: 100vw;
    height: calc(100vh - 40px);
    background: rgba(0, 0, 0, .64);

    #slide-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 100%;
      background: #12141b;
      border-left: 1px solid #232323;

      button {
        background: none;
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        
        img {
          width: 12px;
          height: 12px;
        }
      }
    }  
  }
</style>