<template>
  <aside @mouseover="moveSidebar(50, .6)" @mouseleave="moveSidebar(0, .6)">
    <div id="sidebar">
    </div>
  </aside>
</template>

<script>

export default {
  methods: {
    moveSidebar: function(d,s){
      let sidebar = document.querySelector("aside");
      sidebar.style.transform=`translateX(${d}px)`;
      sidebar.style.transition=`${s}s linear`;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Sidebar.scss";
</style>