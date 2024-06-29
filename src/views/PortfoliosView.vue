<template>
  <main id="portfolios">
    <PopupSlot v-if="popUpOnOff" @PopupSwitchOff="setPopupSwitch">
      <template v-slot:contents>
        <NewPortfolio @PopupSwitchOff="setPopupSwitch"
                      @emitDataAdded="funcDataAdded"/>
      </template>
    </PopupSlot>
    <div id="main-portfolio-sector">
      <MainPortfolio :MainPortfolioData="MainPortfolioData" />
    </div>
    <div id="sub-portfolio-sector">
      <SubPortfolio @portfolioData="sendDataToMain"
                    @PopupSwitchOn="setPopupSwitch"
                    :dataAdded="dataAdded" />
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
      popUpOnOff: false,
      dataAdded: null
    }
  },
  methods: {
    sendDataToMain(value){
      this.MainPortfolioData = value;
    },
    setPopupSwitch: function(val){
      this.popUpOnOff = val;
    },
    funcDataAdded: function(val) {
      this.dataAdded += val;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/View.scss";
</style>