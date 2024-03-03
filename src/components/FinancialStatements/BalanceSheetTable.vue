<template>
  <div>
    <p>Balance Sheets</p>
    <div id="balance-sheet-table">
      <table>        
        <thead>
          <tr>
            <th @click="setPeriodAsc()" :class="PeriodCategory">{{this.WidePeriod}}</th>
            <th v-for="(d, i) in DATA" :key="i" :class="PeriodCategory" @click="setPeriodDesc(DATA[i].PERIOD)">{{DATA[i].PERIOD}}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Assets</td>                        <td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Cash</td>                    <td v-for="(d, i) in DATA" :key="i">{{DATA[i].CASH.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Investment</td>              <td v-for="(d, i) in DATA" :key="i">{{DATA[i].INVESTMENT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Others</td>                  <td v-for="(d, i) in DATA" :key="i">{{DATA[i].OTHERS.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Assets</td>      <td v-for="(d, i) in DATA" :key="i">{{DATA[i].TOTAL_ASSETS.toLocaleString()}}</td></tr>
          <tr><td>Liabilities</td>                   <td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Short-term</td>              <td v-for="(d, i) in DATA" :key="i">{{DATA[i].SHORT_TERM_LIABILITIES.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Long-term</td>               <td v-for="(d, i) in DATA" :key="i">{{DATA[i].LONG_TERM_LIABILITIES.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Liabilities</td> <td v-for="(d, i) in DATA" :key="i">{{DATA[i].TOTAL_LIABILITIES.toLocaleString()}}</td></tr>
          <tr><td>Equity</td>                        <td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Deposit</td>                 <td v-for="(d, i) in DATA" :key="i">{{DATA[i].DEPOSIT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Retained Earnings</td>       <td v-for="(d, i) in DATA" :key="i">{{DATA[i].RETAINED_EARNINGS.toLocaleString()}}</td></tr>
          <tr><td>Total Liabilities and Equity</td>  <td v-for="(d, i) in DATA" :key="i">{{DATA[i].TOTAL_LIABILITIES_AND_EQUITY.toLocaleString()}}</td></tr>
          <tr><td>Debt Rate</td>                     <td v-for="(d, i) in DATA" :key="i">{{DATA[i].DEBT_RATE.toFixed(2)}}%</td></tr>
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
  created() {
    this.getBSdataPerYear();
  },
  methods: { 
    setPeriodAsc(){
      switch(this.PeriodCategory) {
        case 'QUARTER': // Quarter > Year
          this.PeriodCategory = 'YEAR';
          this.getBSdataPerYear();
          this.WidePeriod = null;
        break;
        case 'MONTH': // Month > Quarter
          this.PeriodCategory = 'QUARTER';
          this.getBSdataPerQuarter(this.YearValue);
          this.WidePeriod = this.YearValue; 
        break;
      }
    },
    setPeriodDesc(d){
      switch(this.PeriodCategory) {
        case 'YEAR': // Year > Quarter
          this.PeriodCategory = 'QUARTER';
          this.getBSdataPerQuarter(d);
          this.WidePeriod = d;
        break;
        case 'QUARTER': // Quarter > Month
          this.PeriodCategory = 'MONTH';
          this.YearValue = this.WidePeriod; 
          this.getBSdataPerMonth(this.YearValue, d[0]);
          this.WidePeriod = d;
        break;
      }
    },
    getBSdataPerYear(){
      this.$http.get("/balance-sheets/per-year")
      .then(res => this.DATA = res.data)
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    },
    getBSdataPerQuarter(param_year){
      this.$http.get("/balance-sheets/per-quarter", {params: { YEAR: param_year }})
      .then(res => this.DATA = res.data)
      .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    },
    getBSdataPerMonth(param_year, param_quarter){
      this.$http.get("/balance-sheets/per-month", {params: { YEAR: param_year , QUARTER: param_quarter }})
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
#balance-sheet-table {
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
