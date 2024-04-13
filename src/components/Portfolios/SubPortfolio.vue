<template>
  <div id="sub-portfolio">
    <div id="sub-portfolio-charts">
      <div v-for="(d, i) in Data" :key="i" class="sub-donuts" @click="Change_Donut_Chart(i)">
        <div class="sub-donuts-title">
          <input v-if="Rmv" type="checkbox" :value="d.NAME">
          <input type="text" :value="d.NAME" readonly>
        </div>
        <div class="sub-donuts-chart"></div>
      </div>
    </div>
    <div id="sub-portfolio-btns">
      <div id="btn-set">
        <button v-if="!Rmv" @click="PopupOn()">+</button>
        <button v-if="!Rmv" @click="RemoveMode(true)">-</button>
        <button v-if="Rmv" @click="RemovePortfolio()">REMOVE</button>
        <button v-if="Rmv" @click="RemoveMode(false)">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Data: null,
      Rmv: false
    }
  },
  created() {
    this.$http.get("/portfolio/getPortfolioData")
      .then(
        res => {
          this.Data = res.data;
          this.$emit('portfolioData', this.Data[0]);
        }
      )
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
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
    },
    RemovePortfolio: function(){
      const selectedArr = [];
      for(const e of document.querySelectorAll(".sub-donuts-title input[type='checkbox']")){
        e.checked && selectedArr.push(e.value);
      }
      this.$http.post("/portfolio/removePortfolios", {params: { RemoveThem: selectedArr }})
        .then(
          res => {
            this.Data = res.data;
            this.RemoveMode(false);
          }
        )
        .catch(
          err => {if(err.message.indexOf('Network Error') > -1) alert('Error')}
        );
    },
    RemoveMode: function(v){
      this.Rmv = v;
      for(const e of document.querySelectorAll(".sub-donuts-title")) {
        e.style.justifyContent = v ? "left" : "center";
      }
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
  .sub-donuts-title input[type="checkbox"] {
    width: 8%;
    margin: 0% 1%;
  }
  .sub-donuts-title input[type="text"] {
    width: 80%;
    text-align: center;
    color: white;
    font-weight: bold;
    background: black;
    border: none;
    padding: 0;
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