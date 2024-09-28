<template>
  <header>
    <div id="header">
      <SearchAndMove/>
      <GlobalIndexes/>
    </div>
  </header>
</template>

<script>
import GlobalIndexes from "@/components/Header/globalIndexes.vue"
import SearchAndMove from "@/components/Header/searchAndMove.vue"

export default {
  components: { GlobalIndexes, SearchAndMove },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header.scss";
</style>