<template>
  <div id="main-portfolio">
    <p id="portfolio-name">{{this.Title}}</p>
    <div id="main-donut">
      <div id="main-donut-chart" style="width:100%; height: 361;"></div>
      <p id="evalutaion">Evaluation</p>
    </div>
    <div id="assets-in-portfolio">
      <label v-for="(d,i) in Object.keys(this.Data.ASSETS)" :key="i">
        <input type="checkbox" name="show-color"/>
        <div class="asset-label">
          <span>{{d}}</span>
          <span>{{this.Data.ASSETS[d]}}</span>
        </div>
      </label>
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
    this.Data = SamplePortionData[0];
    this.Title = this.Data.NAME;
  },
  mounted(){ 
    this.$Donut_Chart_With_Detail(this.Data.ASSETS, '#main-donut-chart');
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
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }
  #assets-in-portfolio label {
    width: 48%;
    display: flex;
    color: white;
    margin: 0;
  }
  .asset-label {
    display: flex;
    justify-content: space-between;
    width: 70%;
    padding: 0% 5%;
  }
  #assets-in-portfolio input {
    width: 20%;
    margin: 0;
  }

</style>