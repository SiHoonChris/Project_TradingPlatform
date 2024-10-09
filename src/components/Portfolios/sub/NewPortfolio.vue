<template>
  <div id="new-portfolio">
    <div id="slide-btn">
      <button 
        @click="open(open)"
        @mouseover="changeColor('white')"
        @mouseleave="changeColor('gray')"
      >
        <img :src="btn" alt="new_portfolio">
      </button>
    </div>
    <FindAdd/>
  </div>
</template>

<script>
import FindAdd from "@/components/Portfolios/sub/findAdd.vue"

export default {
  components: { FindAdd },
  data() {
    return {
      open: false,
      btn: require("@/assets/img/btnImg/Common/side_sub_menu_open_gray.png"),
    }
  }, 
  methods: {
    open(){
      document.getElementById('portfolios-sub').style.right =
        this.open ? '0px' : 'calc(100vw - 20px)';
      document.getElementById('new-portfolio').style.paddingLeft =
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
  @import "@/assets/css/Portfolios/sub/NewPortfolio.scss";
</style>