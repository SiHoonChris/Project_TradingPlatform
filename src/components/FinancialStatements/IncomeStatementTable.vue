<template>
  <div>
    <p>Income Statements</p>
    <div id="income-statement-table">
      <table>        
        <thead>
          <tr>
            <th @click="setPeriodAsc()" :class="PeriodCategory">{{this.WidePeriod}}</th>
            <th v-for="(d, i) in DATA" :key="i" :class="PeriodCategory" @click="setPeriodDesc(DATA[i].PERIOD)">{{DATA[i].PERIOD}}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Revenue</td>                       <td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Marginal Profit</td>         <td v-for="(d, i) in DATA" :key="i">{{DATA[i].MARGINAL_PROFIT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Dividend, Interest</td>      <td v-for="(d, i) in DATA" :key="i">{{DATA[i].DIVIDEND_INTEREST.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Revenue</td>     <td v-for="(d, i) in DATA" :key="i">{{DATA[i].TOTAL_REVENUE.toLocaleString()}}</td></tr>
          <tr><td>Net Income</td>                    <td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Marginal Profit</td>         <td v-for="(d, i) in DATA" :key="i">{{DATA[i].NET_MARGINAL_PROFIT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Dividend, Interest</td>      <td v-for="(d, i) in DATA" :key="i">{{DATA[i].NET_DIVIDEND_INTEREST.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Net Income</td>  <td v-for="(d, i) in DATA" :key="i">{{DATA[i].TOTAL_NET_INCOME.toLocaleString()}}</td></tr>
          <tr><td>Profit Margin Rate</td>            <td v-for="(d, i) in DATA" :key="i">{{DATA[i].PROFIT_MARGIN_RATE.toFixed(2).toLocaleString()}}%</td></tr>
          <tr><td>ROE</td>                           <td v-for="(d, i) in DATA" :key="i">{{DATA[i].ROE.toFixed(2).toLocaleString()}}</td></tr>
          <tr><td>Net Income / Long-term Liab.</td>  <td v-for="(d, i) in DATA" :key="i">{{DATA[i].NET_INCOME_LONG_TERM_LIAB.toFixed(4)}}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      WidePeriod: null,
      PeriodCategory: 'YEAR',
      YearValue: null,
      DATA: null
    }
  },
  created(){
    this.getISdataPerYear();
  },
  methods: { 
    setPeriodAsc(){
      switch(this.PeriodCategory) {
        case 'QUARTER': // FROM: quarter, To: year ( Query-Parameter: null )
          this.PeriodCategory = 'YEAR';
          this.getISdataPerYear();
          this.WidePeriod = null;
        break;
        case 'MONTH': // FROM: month, To: quarter ( Query-Parameter: YEAR )
          this.PeriodCategory = 'QUARTER';
          this.getISdataPerQuarter(this.YearValue);
          this.WidePeriod = this.YearValue; 
        break;
      }
    },
    setPeriodDesc(d){
      switch(this.PeriodCategory) {
        case 'YEAR': // FROM: year, To: quarter ( Query-Parameter: YEAR )
          this.PeriodCategory = 'QUARTER';
          this.getISdataPerQuarter(d);
          this.WidePeriod = d;
        break;
        case 'QUARTER': // FROM: quarter, To: month ( Query-Parameter: YEAR, QUARTER )
          this.PeriodCategory = 'MONTH';
          this.YearValue = this.WidePeriod; 
          this.getISdataPerMonth(this.YearValue, d[0]);
          this.WidePeriod = d;
        break;
      }
    },
    getISdataPerYear(){
      this.$http.get("/income-statements/per-year")
      .then(res => this.DATA = res.data)
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    },
    getISdataPerQuarter(param_year){
      this.$http.get("/income-statements/per-quarter", {params: { YEAR: param_year }})
      .then(res => this.DATA = res.data)
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    },
    getISdataPerMonth(param_year, param_quarter){
      this.$http.get("/income-statements/per-month", {params: { YEAR: param_year , QUARTER: param_quarter }})
      .then(res => this.DATA = res.data)
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    }
  }
}

</script>

<style scoped>
p {
  color: white;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin: 6vh 0 3vh 0;
}
#income-statement-table {
  display: flex;
  justify-content: center;
}
table {
  width: 90%;
  border-collapse: collapse;
  color: white;
}
th, td {
  padding: 0.4% 1.4%;
  border: 1px solid white;
}
th:first-child {
  width: 36%;
}
th.YEAR:not(:first-child), .QUARTER, th.MONTH:first-child {
  cursor: pointer;
}
td:not(:first-child) {
  text-align: right;
}

</style>
