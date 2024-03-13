<template>
  <div id="sub-portfolio">
    <div id="sub-portfolio-charts">
      <div v-for="(d, i) in Data" :key="i" class="sub-donuts"></div>
    </div>
    <div id="sub-portfolio-btns">
      <div id="btn-set">
        <button>+</button>
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
  },
  mounted(){ 
    for(const i in document.querySelectorAll(".sub-donuts")) {
      this.$Donut_Chart(this.Data[i], `.sub-donuts:nth-of-type(${Number(i)+1})`);
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
    border: 1px solid gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .sub-donuts {
    width: calc(100% / 3 - 1px);
    height: calc(100% / 2);
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    color: white;
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