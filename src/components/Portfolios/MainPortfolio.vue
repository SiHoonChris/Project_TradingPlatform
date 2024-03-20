<template>
  <div id="main-portfolio">
    <p id="portfolio-name"></p>
    <div id="main-donut">
      <div id="main-donut-chart" style="width: 100%; height: 361px;"></div>
      <p id="evalutaion">Evaluation</p>
    </div>
    <div id="assets-in-portfolio">
      <label v-for="(d,i) in Object.keys(this.Data)" :key="i">
        <input type="checkbox" name="color-section" disabled/>
        <div class="asset-label">
          <span>{{d}}</span>
          <span>{{((this.Data[d]/this.Sum)*100).toFixed(4)}}%</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['MainPortfolioData'],
  data() {
    return {
      Data: {"": 0},
      Sum: 1
    }
  },
  mounted(){
    this.Data = this.MainPortfolioData.ASSETS;
    this.Sum = Object.values(this.Data).reduce((a, b)=> a + b, 0);
  },
  watch: {
    MainPortfolioData: function(d){
      this.Data = d.ASSETS;
      this.Sum = Object.values(this.Data).reduce((a, b)=> a + b, 0);
    }
  }
}
</script>

<style scoped>
  #main-portfolio {
    height: 76%;
    width: 64%;
    border: 0.5px solid gray;
    padding: 2% 3%;
    display: flex;
    flex-direction: column;
  }
  #main-portfolio:hover {
    border: 1px solid white;
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
    height: 76%;
    display: flex;
    flex-direction: column;
  }

  #evalutaion {
    color: white;
    text-align: center;
    margin: 0;
    border-bottom: 1px solid gray;
  }

  #assets-in-portfolio {
    width: 100%;
    height: 18%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
  }
  #assets-in-portfolio label {
    width: 50%;
    height: 30%;
    margin: 1% 0%;
    display: flex;
    align-items: center;
    color: white;
  }
  .asset-label {
    display: flex;
    justify-content: space-between;
    width: 70%;
    padding: 0% 5%;
  }
  #assets-in-portfolio input[type="checkbox"] {
    width: 14%;
    height: 100%;
    margin: 0;
    border-radius: 25%;
    appearance: none;
    background-color: none;
  }

</style>