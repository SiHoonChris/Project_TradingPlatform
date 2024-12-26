<template>
  <header>
    <SearchElement/>
    <PageElement/>
  </header>
</template>

<script>
  import SearchElement from "@/components/Header/SearchElement.vue"
  import PageElement from "@/components/Header/PageElement.vue"

  export default {
    components: {
      SearchElement, 
      PageElement
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header.scss";
</style>
