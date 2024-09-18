<template>
  <div id="chart_table">
    <div id="chart"></div>
    <div id="table">
      <div id="flow-tbl"></div>
      <div id="static-tbl"></div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
  #chart_table {
    width: calc(100vw - 70px);
    height: calc(100vh - 40px);
    border-left: 1px solid #232323;

    #chart {
      width: 100%;
      height: 50%;
      background: yellow;
    }
    #table {
      width: 100%;
      height: 50%;
      display: flex;

      #flow-tbl {
        width: 50%;
        height: 100%;
        background: #d32312;
      }
      #static-tbl {
        width: 50%;
        height: 100%;
        background: green;
      }
    }
  }  
</style>