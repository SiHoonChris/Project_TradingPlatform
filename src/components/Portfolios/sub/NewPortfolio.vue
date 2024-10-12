<template>
  <div id="new-portfolio">
    <div id="contents">
      <FindPortfolio/>
      <AddPortfolio/>
    </div>
  </div>
</template>

<script>
import FindPortfolio from "@/components/Portfolios/sub/findPortfolio.vue"
import AddPortfolio from "@/components/Portfolios/sub/addPortfolio.vue"

export default {
  components: { FindPortfolio, AddPortfolio }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/sub/NewPortfolio.scss";
</style>