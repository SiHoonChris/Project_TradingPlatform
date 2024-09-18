<template>
  <aside @mouseover="moveSidebar(50, .1)" @mouseleave="moveSidebar(0, .2)">
    <div id="sidebar">
      <button v-for="(btn, n) in btns" :key="n" 
        @click="$moveTo_1(btn.page)"
        @mouseover="changeColor(btn.page, n, 'white')"
        @mouseleave="changeColor(btn.page, n, 'gray')"
      >
        <img :src="btn.img" :alt="btn.page">
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  data(){
    return {
      btns: [
        { page:'transactions', img:require("@/assets/img/btnImg/SidebarComponent/transactions_gray.png") },
        { page:'portfolios',   img:require("@/assets/img/btnImg/SidebarComponent/portfolios_gray.png")   },
        { page:'home',         img:require("@/assets/img/btnImg/SidebarComponent/home_gray.png")         }
      ]
    }
  },
  methods: {
    moveSidebar: function(d,s){
      let sidebar = document.querySelector("aside");
      sidebar.style.transform=`translateX(${d}px)`;
      sidebar.style.transition=`${s}s linear`;
    },
    changeColor: function(page, idx, color){
      this.btns[idx].img = require(`@/assets/img/btnImg/SidebarComponent/${page}_${color}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Sidebar.scss";
</style>