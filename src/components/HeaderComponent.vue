<template>
  <header>
    <img :src="homeBtn" alt="homeBtn" @click="$moveTo_1('home')">
    <div id="header">
      <GlobalIndexes/>
      <SearchAndGo/>
      <NavigationBar/>
    </div>
  </header>
</template>

<script>
import GlobalIndexes from "@/components/Header/globalIndexes.vue"
import SearchAndGo from "@/components/Header/searchAndGo.vue"
import NavigationBar from "@/components/Header/navigationBar.vue"

export default {
  components: { GlobalIndexes, SearchAndGo, NavigationBar },
  data() {
    return {
      homeBtn: require("@/assets/wallpaper.jpg")
    }
  }
}
</script>

<style scoped>
header {
  height: 7.9vh;
  border-bottom: 1px solid gray;
  display: flex;
}
img {
  width: calc(100vw * 0.09);
  height: 100%;
  cursor: pointer;
}
#header {
  width: calc(100vw * 0.91);
  height: 100%;
  background: #0a0a0a;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>