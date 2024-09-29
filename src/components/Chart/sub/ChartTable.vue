<template>
  <div id="chart_table">
    <div id="chart">
      <p><span>{{this.$route.params.ticker}}</span></p>
      <div id="chart-container">
        <ul id="analytics">
          <li id="flow-analytics-menu">
            <span @click="menuSelectBtn(true)">
              Flow
            </span>
          </li>
          <li id="static-analytics-menu">
            <span @click="menuSelectBtn(false)">
              Static
            </span>
          </li>
        </ul>
        <ul v-if="flowAnalyticsDisp" id="flow-analytics-sub-menu">
          <li v-for="(d, i) in flowAnalyticsSubMenu" :key="i">
            <span @click="subMenuSelectBtn('flow', i)">{{d}}</span>
          </li>
        </ul>
        <ul v-else id="static-analytics-sub-menu">
          <li v-for="(d, i) in staticAnalyticsSubMenu" :key="i">
            <span @click="subMenuSelectBtn('static', i)">{{d}}</span>
          </li>
        </ul>
        <div id="ct-content"></div>
      </div>
    </div>
    <div id="table">
      <div id="table-container">
        <div id="tbl-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      flowAnalyticsDisp: true,
      flowAnalyticsSubMenu: ['Earnings 1', 'Earnings 2'],
      staticAnalyticsSubMenu: ['Composition', 'Quality', 'Capital'],
      ctStaticData: [
        // 1) Compos.1 절대량 비교(커런트, 논커런트 전부) & Compos.2 상대량 비교(커런트, 논커런트 전부) - 막대그래프
        // 2) TL/TE , CA/CL , CL/NCL - 라인 그래프
        // 3) Div. Yield - 라인 그래프, Market Cap - 막대 그래프. 
      ],
      ctFlowData: [
        // 1) NI/R , NI/NCL , ROE - 라인 그래프
        // 2) EPS - 막대 그래프, PER - 라인 그래프
      ],
      tblData: [
        {"Fiscal Year": 2012, "Revenue": 100000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2013, "Revenue": 200000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2014, "Revenue": 300000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2015, "Revenue": 400000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2016, "Revenue": 500000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2017, "Revenue": 600000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2018, "Revenue": 700000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2019, "Revenue": 800000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2020, "Revenue": 900000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2021, "Revenue": 100000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
        {"Fiscal Year": 2022, "Revenue": 200000, "Operating Income": 50000, "Net Income":10000, "Operating Cashflow":13000, "Total Assets": 20000000, "Current Assets": 10000000, "Cash & Cash Equiv.":200000, "Non-current Assets" : 10000000, "Total Liabilities":10000000 , "Current Liabilities":5000000 , "Non-current Liabilities":5000000, "Total Equity" : 10000000, "Retained Earnings":2000000, "Dividend":100, "Stock Outstanding":100000, "Price(Q-close or Y-close)":300},
      ]
    }
  },
  mounted(){
    this.$Create_Table (
      this.tblData, 
      "table", 
      getComputedStyle(document.getElementById('tbl-content')).width,
      getComputedStyle(document.getElementById('tbl-content')).height,
      false
    );
    document.getElementById('table-container').nextSibling.style.position='absolute';
    this.menuSelectBtn(true);
  },
  beforeUnmount(){
    document.getElementById('table-container').nextSibling.remove();
  },
  methods: {
    menuSelectBtn(bool){
      this.flowAnalyticsDisp=bool;
      document.getElementById(`${bool?'flow':'static'}-analytics-menu`).style.background = '#00c38e';
      document.getElementById(`${!bool?'flow':'static'}-analytics-menu`).style.background = 'none';
    },
    subMenuSelectBtn(type, idx){
      let subMenus = document.getElementById(`${type}-analytics-sub-menu`).querySelectorAll('li');
      for(let e of subMenus) { e.style.borderBottomColor = '#595959'; }
      subMenus[idx].style.borderBottomColor = '#00c38e';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Chart/sub/ChartTable.scss";
</style>