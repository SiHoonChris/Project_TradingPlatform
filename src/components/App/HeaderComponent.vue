<template>
  <header>
    <div id="header">
      <GlobalIndexes/>
      <SearchAndGo/>
    </div>
  </header>
</template>

<script>
import GlobalIndexes from "@/components/Header/globalIndexes.vue"
import SearchAndGo from "@/components/Header/searchAndGo.vue"

export default {
  components: { GlobalIndexes, SearchAndGo },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header.scss";
</style>