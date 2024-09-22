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
  data(){
    return {
      flowTblData: [ /* Revenue , Operating Income , Net Income
                        EPS , Operating Income , Dividend */
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" }
      ],
      staticTblData: [ /* Total Assets , Current Assets , Cash & Cash Equiv. , 
                          Non-current Assets , Total Liabilities , Current Liabilities , 
                          Non-current Liabilities , Total Equity , Retained Earnings , 
                          Stock Outstanding , Market Cap. */
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" },
        { "col1": "foo", "col2": 0, "col3": "a" },
        { "col1": "bar", "col2": 1, "col3": "b" },
        { "col1": "baz", "col2": 2, "col3": "c" }
      ],
    }
  },
  mounted(){
    this.$Create_Table(this.flowTblData, "flow-tbl", "500px", "400px");
    this.$Create_Table(this.staticTblData, "static-tbl", "500px", "400px");
  }
}
</script>

<style lang="scss" scoped>
  #chart_table {
    width: 80vw;
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
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #static-tbl {
        width: 50%;
        height: 100%;
        background: green;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }  
</style>