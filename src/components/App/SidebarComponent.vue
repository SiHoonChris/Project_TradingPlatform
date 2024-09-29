<template>
  <aside>
    <div id="sidebar">
      <div id="btns_grp">
        <button v-for="(btn, n) in btns" :key="n" 
          @click="$moveTo_1(btn.page)"
          @mouseover="changeColor(btn.page, n, 'white')"
          @mouseleave="changeColor(btn.page, n, 'gray')"
        >
          <img :src="btn.img" :alt="btn.page">
        </button>
      </div>
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
    changeColor: function(page, idx, color){
      this.btns[idx].img = require(`@/assets/img/btnImg/SidebarComponent/${page}_${color}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Sidebar.scss";
</style>