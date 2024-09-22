<template>
  <aside>
    <div id="sidebar">
      <div id="btns_grp_1">
        <button v-for="(btn, n) in btns1" :key="n" 
          @click="alert('btns_grp_1')"
          @mouseover="changeColor(btn.fn, n, 'white')"
          @mouseleave="changeColor(btn.fn, n, 'gray')"
        >
          <img :src="btn.img" :alt="btn.page">
        </button>
      </div>
      <div id="btns_grp_2">
        <button v-for="(btn, n) in btns2" :key="n" 
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
      btns1: [
        { fn:'newWidget', img:require("@/assets/img/btnImg/SidebarComponent/newWidget_gray.png") }
      ],
      btns2: [
        { page:'transactions', img:require("@/assets/img/btnImg/SidebarComponent/transactions_gray.png") },
        { page:'portfolios',   img:require("@/assets/img/btnImg/SidebarComponent/portfolios_gray.png")   },
        { page:'home',         img:require("@/assets/img/btnImg/SidebarComponent/home_gray.png")         }
      ]
    }
  },
  methods: {
    changeColor: function(fn_or_page, idx, color){
      let imgUrl = require(`@/assets/img/btnImg/SidebarComponent/${fn_or_page}_${color}.png`);
      if(['newWidget'].includes(fn_or_page)) {
        this.btns1[idx].img = imgUrl;
      }
      else if(['transactions', 'portfolios', 'home'].includes(fn_or_page)) {
        this.btns2[idx].img = imgUrl;
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Sidebar.scss";
</style>