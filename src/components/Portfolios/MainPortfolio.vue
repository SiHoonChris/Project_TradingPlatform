<template>
  <div id="main-portfolio">
    <p id="portfolio-name">TITLE</p>
    <div id="main-donut">
      <svg style="background:lightseagreen; width:100%; height: 361;"></svg>
      <p id="evalutaion">Evaluation</p>
    </div>
    <div id="assets-in-portfolio"></div>
  </div>
</template>

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
    background: green;
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
    background: lightgreen;
  }
</style>