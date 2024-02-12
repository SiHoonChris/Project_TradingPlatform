<template>
  <div id="header-left">
    <div id="global-indexes">
      <div v-for="(data, i) in Object.keys(DATAS[DATAS.length-1])" :key="i" class="result">
        <p class="index-key">{{data}}</p>
        <p class="index-values">
          <span>
            {{
              Number( DATAS[DATAS.length-1][data] ).toLocaleString()
            }}
          </span>
          <span>
            {{
              Number( 
                (DATAS[DATAS.length-1][data] - DATAS[DATAS.length-2][data]).toFixed(2) 
              ).toLocaleString()
            }}</span>
          <span>
            {{
              Number( 
                ((DATAS[DATAS.length-1][data] - DATAS[DATAS.length-2][data]) / DATAS[DATAS.length-2][data] * 100).toFixed(2)
              ).toLocaleString()
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import global_indexes from "@/assets/global_indexes.json"

export default {
  data () {
    return {
      DATAS: global_indexes
    }
  },
  mounted(){
    const CLONE = document.querySelector('#global-indexes').cloneNode(true);
    CLONE.id = "global-indexes-clone";
    document.querySelector("#global-indexes").appendChild(CLONE);

    for(const I of document.querySelectorAll(".index-values > span:nth-child(3)")) {
      if (Number(I.textContent) === 0) {
        I.className = "zero";
        I.previousSibling.className = "zero";
        I.textContent = "";
        I.previousSibling.textContent = "";
      } else if (Number(I.textContent) > 0) {
        I.className = "plus";
        I.previousSibling.className = "plus";
      } else {
        I.className = "minus"
        I.previousSibling.className = "minus";
      };
    }
  }
}
</script>

<style scoped>
@keyframes slider {
  0% {transform: translateY(0);}
  100% {transform: translateY(calc(-7.9vh*10));}
}

#header-left {
  width: calc(100vw * 0.24);
  height: 100%;
  overflow: hidden;
}
#global-indexes {
  width: 58%;
  padding-left: 4%;
  animation: slider 18s linear infinite;
}
.result {
  height: 7.9vh;
}
p {
  height: 50%;
  margin: 0;
  color: white;
  font-weight: bold;
}
.index-key {
  font-size: 1.3vw;
}
.index-values span:nth-child(1) {
  font-size: 1.1vw;
  margin-right: 0.5vw;
}
.index-values span:nth-child(2) {
  font-size: 0.8vw;
  margin-right: 0.4vw;
}
.index-values span:nth-child(3) {
  font-size: 0.8vw;
}

.plus { color: green; }
.plus:nth-child(2)::before { content: "▲"; }
.plus:nth-child(3)::before { content: "+"; }
.minus { color: red; }
.minus:nth-child(2)::before { content: "▼"; }
.plus:nth-child(3)::after, .minus:nth-child(3)::after { content: "%"; }

</style>