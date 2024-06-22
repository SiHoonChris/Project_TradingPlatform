<template>
  <div>
    <p>Income Statements</p>
    <div id="income-statement-table">
      <table>
        <thead>
          <tr>
            <th @click="this.$setPeriodAsc('/income-statements')" 
                :class="PeriodCategory">
                  {{this.WidePeriod}}
            </th>
            <th v-for="(d, i) in DATA" :key="i" :class="PeriodCategory" 
                @click="this.$setPeriodDesc('/income-statements', DATA[i].PERIOD)">
                  {{DATA[i].PERIOD}}
            </th>
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
    this.$getDatasPerYear("/income-statements/per-year");
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/FinancialStatements/Table.scss";
</style>
