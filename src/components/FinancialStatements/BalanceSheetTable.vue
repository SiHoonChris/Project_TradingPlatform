<template>
  <div>
    <p>Balance Sheets</p>
    <div id="balance-sheet-table">
      <table>
        <thead>
          <tr>
            <th @click="this.$setPeriodAsc('/balance-sheets')" 
                :class="PeriodCategory">
                  {{this.WidePeriod}}
            </th>
            <th v-for="(d, i) in DATA" :key="i" :class="PeriodCategory" 
                @click="this.$setPeriodDesc('/balance-sheets', DATA[i].PERIOD)">
                  {{DATA[i].PERIOD}}
            </th>
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
//import { setPeriodAsc , setPeriodDesc } from '../../assets/js/FinancialStatements/DataGetter.js'
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
    this.$getDatasPerYear("/balance-sheets/per-year");
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/FinancialStatements/Table.scss";
</style>
