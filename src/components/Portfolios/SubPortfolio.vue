<template>
  <div id="sub-portfolio">
    <div id="sub-portfolio-charts">
      <div v-for="(d, i) in Data" :key="i" class="sub-donuts" @click="Change_Donut_Chart(i)">
        <div class="sub-donuts-title">
          <span>{{d.NAME}}</span>
        </div>
        <div class="sub-donuts-chart"></div>
      </div>
    </div>
    <div id="sub-portfolio-btns">
      <div id="btn-set">
        <button @click="PopupOn()">+</button>
        <button>-</button>
      </div>
    </div>
  </div>
</template>

<script>
import SamplePortionData from "@/assets/SamplePortionData.json";

export default {
  data() {
    return {
      Data: null
    }
  },
  created() {
    this.Data = SamplePortionData;
    this.$emit('portfolioData', this.Data[0]);
  },
  mounted(){ 
    for(let i=0 ; i < document.querySelectorAll(".sub-donuts-chart").length ; i++) {
      if(Number(i) === 0) this.$Donut_Chart_With_Detail(this.Data[i], '#main-donut-chart');
      this.$Donut_Chart(this.Data[i].ASSETS, `.sub-donuts:nth-of-type(${Number(i)+1}) > .sub-donuts-chart`);
    }
  },
  methods: {
    Change_Donut_Chart: function(i){
      this.$Remove_Donut_Chart("#main-donut-chart > svg");
      this.$emit('portfolioData', this.Data[i]);
      this.$Donut_Chart_With_Detail(this.Data[i], '#main-donut-chart');
    },
    PopupOn: function(){
      this.$emit("PopupSwitchOn", true);
    }
  }
}
</script>

<style scoped>
  #sub-portfolio {
    height: 80%;
    width: 80%;
    display: flex;
  }

  #sub-portfolio-charts {
    width: 96%;
    height: 100%;
    border: 0.5px solid gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .sub-donuts {
    width: 33.1%;
    height: 49.99%;
    border: 0.5px solid gray;
    color: white;
  }
  .sub-donuts:hover {
    border: 1px solid white;
    cursor: pointer;
  }
  .sub-donuts-title {
    width: 100%;
    height: 10%;
    color: white;
    display: flex;
    justify-content: center;
  }
  .sub-donuts-chart {
    width: 100%;
    height: 90%;
  }
  #sub-portfolio-btns {
    width: 4%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  #btn-set {
    height: 11%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  button {
    width: 1.6vw;
    height: 1.6vw;
    background: none;
    border: 1px solid gray;
    color: gray;
    font-size: 20px;
  }
  button:hover {
    cursor: pointer;
  }
</style>