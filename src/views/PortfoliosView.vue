<template>
  <main id="portfolios">
    <PopupSlot v-if="popUpOnOff" @PopupSwitchOff="setPopupSwitch">
      <template v-slot:contents>
        <NewPortfolio @PopupSwitchOff="setPopupSwitch"/>
      </template>
    </PopupSlot>
    <div id="main-portfolio-sector">
      <MainPortfolio :MainPortfolioData="MainPortfolioData" />
    </div>
    <div id="sub-portfolio-sector">
      <SubPortfolio @portfolioData="sendDataToMain" @PopupSwitchOn="setPopupSwitch"/>
    </div>
  </main>
</template>

<script>
import MainPortfolio from '@/components/Portfolios/MainPortfolio.vue'
import SubPortfolio from '@/components/Portfolios/SubPortfolio.vue'
import PopupSlot from '@/components/Common/PopupSlot.vue'
import NewPortfolio from '@/components/Portfolios/InPortfolioPopup/NewPortfolio.vue'

export default {
  components: { MainPortfolio, SubPortfolio, PopupSlot, NewPortfolio },
  data(){
    return{
      MainPortfolioData: null,
      popUpOnOff: false
    }
  },
  methods: {
    sendDataToMain(value){
      this.MainPortfolioData = value;
    },
    setPopupSwitch: function(val){
      this.popUpOnOff = val;
    }
  }
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