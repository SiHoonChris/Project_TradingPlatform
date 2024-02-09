<template>
  <div id="header-left">
    <div id="global-indexes">
      <div class="indexes">
        <p>index 1</p>
        <p>N,NNN.DD ▲xx.xx +x.xx%</p>
      </div>
      <div class="indexes">
        <p>index 2</p>
        <p>N,NNN.DD ▲xx.xx +x.xx%</p>
      </div>
      <div class="indexes">
        <p>index 3</p>
        <p>N,NNN.DD ▲xx.xx +x.xx%</p>
      </div>
      <div class="indexes">
        <p>index 4</p>
        <p>N,NNN.DD ▲xx.xx +x.xx%</p>
      </div>
      <div class="indexes">
        <p>index 5</p>
        <p>N,NNN.DD ▲xx.xx +x.xx%</p>
      </div>
      <div class="indexes"></div>
    </div>
  </div>
</template>

<style scoped>

@keyframes scroll {
    0% {transform: translateY(0);}
    100% {transform: translateY(calc(-7.9vh * 5));}
}

#header-left {
  width: calc(100vw * 0.24);
  height: 100%;
  overflow: hidden;
}
#global-indexes {
  height: calc(7.9vh * 5);
  width: 58%;
  animation: scroll 10s linear infinite;
}
.indexes {
  width: 100%;
  height: 7.9vh;
}
p {
  height: 50%;
  margin: 0;
  text-align: center;
  color: white;
  font-weight: bold;
}
p:nth-child(1) {
  font-size: 1.2vw;
  vertical-align: text-bottom;
}
p:nth-child(2) {
  font-size: 1vw;
  vertical-align: text-top;
}

</style>