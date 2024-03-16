<template>
  <div id="main-portfolio">
    <p id="portfolio-name">{{this.Title}}</p>
    <div id="main-donut">
      <div id="main-donut-chart" style="width:100%; height: 361;"></div>
      <p id="evalutaion">Evaluation</p>
    </div>
    <div id="assets-in-portfolio">
      <p v-for="(d,i) in Object.keys(this.Data[0].ASSETS)" :key="i">
        <span>{{d}}</span>
        <span>{{this.Data[0].ASSETS[d]}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import SamplePortionData from "@/assets/SamplePortionData.json";

export default {
  data() {
    return {
      Data: null,
      Title: null
    }
  },
  created() {
    this.Data = SamplePortionData;
    this.Title = this.Data[0].NAME;
  },
  mounted(){ 
    this.$Donut_Chart_With_Detail(this.Data[0].ASSETS, '#main-donut-chart');
  }
}
</script>

<style scoped>
  #main-portfolio {
    height: 76%;
    width: 64%;
    border: 1px solid gray;
    padding: 2% 3%;
    display: flex;
    flex-direction: column;
  }

  #portfolio-name {
    color: white;
    text-align: center;
    margin: 0;
    font-size: 24px;
    height: 8%;
    font-weight: bold;
  }

  #main-donut {
    width: 100%;
    height: 78%;
    display: flex;
    flex-direction: column;
  }

  #evalutaion {
    background: lavender;
    text-align: center;
    margin: 0;
  }

  #assets-in-portfolio {
    width: 100%;
    height: 18%;
    overflow-y: scroll;
  }
  #assets-in-portfolio p {
    display: flex;
    justify-content: space-between;
    color: white;
    margin: 0;
  }

</style>