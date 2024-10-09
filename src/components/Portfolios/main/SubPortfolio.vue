<template>
  <div id="sub-portfolio">
    <div id="sub-portfolio-charts">
      <div v-for="(d, i) in Data" :key="i" class="sub-donuts" @click="Change_Donut_Chart(i)">
        <div class="sub-donuts-title">
          <input v-if="Rmv" type="checkbox" :value="d._id">
          <div>{{d.NAME}}</div>
        </div>
        <div class="sub-donuts-chart"></div>
      </div>
    </div>
    <div id="sub-portfolio-btns">
      <div id="btn-set">
        <button v-if="!Rmv" @click="PopupOn()"
                @mouseover="ChangeColor('plus', 'white')" @mouseleave="ChangeColor('plus', 'gray')">
          <img :src="btnSet.plus" alt="plus">
        </button>
        <button v-if="!Rmv" @click="SettingMode(false, true)"
                @mouseover="ChangeColor('minus', 'white')" @mouseleave="ChangeColor('minus', 'gray')">
          <img :src="btnSet.minus" alt="minus">
        </button>

        <button v-if="Rmv" @click="RemovePortfolio()" 
                @mouseover="ChangeColor('delete', 'white')" @mouseleave="ChangeColor('delete', 'gray')">
          <img :src="btnSet.delete" alt="delete">
        </button>
        <button v-if="Rmv" @click="SettingMode(false, false)" 
                @mouseover="ChangeColor('cancel', 'white')" @mouseleave="ChangeColor('cancel', 'gray')">
          <img :src="btnSet.cancel" alt="cancel">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataAdded'],
  data() {
    return {
      Data: null, 
      Setting: false,
      Rmv: false,
      btnSet: {
        plus   : require("@/assets/img/btnImg/SubPortfolio/plus_gray.png"),
        minus  : require("@/assets/img/btnImg/SubPortfolio/minus_gray.png"),
        delete : require("@/assets/img/btnImg/SubPortfolio/delete_gray.png"),
        cancel : require("@/assets/img/btnImg/SubPortfolio/cancel_gray.png")
      }
    }
  },
  created() {
    this.getPortfolios();
  },
  updated() {
    if(this.Setting) {
      for(let i=0 ; i <= this.Data.length ; i++) { 
        if(Number(i) === 0) this.$Donut_Chart_With_Detail(this.Data[i], '#main-donut-chart');
        this.$Donut_Chart(this.Data[i].CHART_DATA, `.sub-donuts:nth-of-type(${Number(i)+1}) > .sub-donuts-chart`);
      }
    }
    this.Setting = false;
  },
  watch: {
    dataAdded: function(d){
      this.getPortfolios();
    }
  },
  methods: {
    getPortfolios: function(){
      this.SettingMode(true, false);

      this.$http.get("/portfolio/getPortfolioData")
        .then(res => {
            this.Data = res.data;
            this.$emit('portfolioData', this.Data[0]);
          }
        )
        .catch(err => console.log(err))
    }, 
    SettingMode: function(Setting, Rmv){
      [this.Setting, this.Rmv] = [Setting, Rmv];
      for(const check of document.querySelectorAll(".sub-donuts-title")) {
        check.style.justifyContent = this.Rmv ? "left" : "center";
      }
    }, 
    Change_Donut_Chart: function(i){
      this.$emit('portfolioData', this.Data[i]);
      this.$Donut_Chart_With_Detail(this.Data[i], '#main-donut-chart');
    }, 
    PopupOn: function(){
      this.$emit("PopupSwitchOn", true);
    }, 
    RemovePortfolio: function(){
      const selectedArr = [];
      for(const e of document.querySelectorAll(".sub-donuts-title input[type='checkbox']")){
        e.checked && selectedArr.push(e.value);
      }
      if(selectedArr.length !== 0){
        this.$http.post("/portfolio/removePortfolios", {params: selectedArr})
          .then(res => this.getPortfolios())
          .catch(err => console.log(err));
      }
    }, 
    ChangeColor: function(action, color){
      this.Setting = false; //차트 다시 그려지는 현상 막기 위함
      let fileName = `${action}_${color}`;
      this.btnSet[action] = require(`@/assets/img/btnImg/SubPortfolio/${fileName}.png`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Portfolios/Sub.scss";
</style>