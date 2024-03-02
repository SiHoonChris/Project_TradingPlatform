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
import BS_3_Year_Data from "@/assets/balance_sheets/3-Year.json"
import BS_All_Quarter_Data from "@/assets/balance_sheets/2023-All-Quarter.json"
import BalanceSheet_4Q_Data from "@/assets/balance_sheets/2023-4th-Quarter.json"

export default {
  data() {
    return {
      WidePeriod: null,
      PeriodCategory: 'YEAR',
      YearValue: null,
      DATA: BS_3_Year_Data,
      // 아래는 기능 구현용 데이터(서버 구성 완료시 제거)
      Per_Year: BS_3_Year_Data,
      Per_Quarter: BS_All_Quarter_Data,
      Per_Month: BalanceSheet_4Q_Data
    }
  },
  methods: { // 아래는 기능 구현용 함수임. 실제 기능은 서버와의 통신으로 구현(함수명은 동일)
    setPeriodAsc(){
      switch(this.PeriodCategory) {
        case 'QUARTER': // FROM: quarter, To: year ( Query-Parameter: null )
          this.PeriodCategory = 'YEAR';
          this.DATA = this.Per_Year;
          this.WidePeriod = null;
        break;
        case 'MONTH': // FROM: month, To: quarter ( Query-Parameter: YEAR )
          this.PeriodCategory = 'QUARTER';
          alert('YEAR : ' + this.YearValue); // YEAR: this.YearValue
          this.DATA = this.Per_Quarter; // 서버로 Parameter 전송(axios), 결과값 Return
          this.WidePeriod = this.YearValue; 
        break;
      }
    },
    setPeriodDesc(d){
      switch(this.PeriodCategory) {
        case 'YEAR': // FROM: year, To: quarter ( Query-Parameter: YEAR )
          this.PeriodCategory = 'QUARTER';
          alert('YEAR : ' + d); // YEAR: d
          this.DATA = this.Per_Quarter; // 서버로 Parameter 전송(axios), 결과값 Return
          this.WidePeriod = d;
        break;
        case 'QUARTER': // FROM: quarter, To: month ( Query-Parameter: YEAR, QUARTER )
          this.PeriodCategory = 'MONTH';
          this.YearValue = this.WidePeriod; 
          alert(`YEAR : ${this.YearValue} , QUARTER : ${d[0]}`); // YEAR: this.YearValue, QUARTER: d[0]
          this.DATA = this.Per_Month; // 서버로 Parameter 전송(axios), 결과값 Return
          this.WidePeriod = d;
        break;
      }
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
