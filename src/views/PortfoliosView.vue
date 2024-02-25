<template>
  <main id="portfolios">
    <div id="main-portfolio-sector">
      <MainPortfolio/>
    </div>
    <div id="sub-portfolio-sector">
      <SubPortfolio/>
    </div>
  </main>
</template>

<script>
import MainPortfolio from '@/components/Portfolios/MainPortfolio.vue'
import SubPortfolio from '@/components/Portfolios/SubPortfolio.vue'

export default {
  components: { MainPortfolio, SubPortfolio }
}
</script>

<style scoped>
#portfolios {
  background: black;
  width: 100vw;
  height: 92vh;
  display: flex;
  overflow: hidden;
}
#main-portfolio-sector {
  width: 38%;
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
}
#sub-portfolio-sector {
  width: 62%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>