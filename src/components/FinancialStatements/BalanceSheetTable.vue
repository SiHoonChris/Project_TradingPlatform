<template>
  <div>
    <p>Balance Sheets</p>
    <div id="balance-sheet-table">
      <table>        
        <thead>
          <tr>
            <th>{{this.Macro}}</th>
            <th v-for="(d, i) in DATA" :key="i" @click="periodChange(DATA[i].DATE)">{{DATA[i].DATE}}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Assets</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Cash</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.CASH}}</td></tr>
          <tr><td>&emsp;Investment</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.INVESTMENT}}</td></tr>
          <tr><td>&emsp;Others</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.OTHERS}}</td></tr>
          <tr><td>&emsp;&emsp;Total Assets</td>
            <td v-for="(d, i) in DATA" :key="i">
              {{DATA[i].DATA.CASH + DATA[i].DATA.INVESTMENT + DATA[i].DATA.OTHERS}}
            </td>
          </tr>
          <tr><td>Liabilities</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Short-term</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.SHORT_TERM_LIABILITIES}}</td></tr>
          <tr><td>&emsp;Long-term</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.LONG_TERM_LIABILITIES}}</td></tr>
          <tr><td>&emsp;&emsp;Total-Liabilities</td>
            <td v-for="(d, i) in DATA" :key="i">
              {{DATA[i].DATA.SHORT_TERM_LIABILITIES + DATA[i].DATA.LONG_TERM_LIABILITIES}}
            </td>
          </tr>
          <tr><td>Equity</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Deposit</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.DEPOSIT}}</td></tr>
          <tr><td>&emsp;Retained Earnings</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DATA.RETAINED_EARNINGS}}</td></tr>
          <tr><td>Total Liabilities and Equity</td>
            <td v-for="(d, i) in DATA" :key="i">
              {{
                DATA[i].DATA.SHORT_TERM_LIABILITIES
                + DATA[i].DATA.LONG_TERM_LIABILITIES
                + DATA[i].DATA.DEPOSIT
                + DATA[i].DATA.RETAINED_EARNINGS
              }}
            </td>
          </tr>
          <tr><td>Debt Rate</td>
            <td v-for="(d, i) in DATA" :key="i">
              {{
                (
                  (DATA[i].DATA.SHORT_TERM_LIABILITIES + DATA[i].DATA.LONG_TERM_LIABILITIES)
                  /(DATA[i].DATA.DEPOSIT + DATA[i].DATA.RETAINED_EARNINGS)
                  *100
                ).toFixed(2)
              }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BalanceSheet_Year_Data from "@/assets/balance_sheets/per_year.json"
import BalanceSheet_2023Quarter_Data from "@/assets/balance_sheets/per_2023quarter.json"
import BalanceSheet_4Q_Data from "@/assets/balance_sheets/per_4th_Quarter.json"

export default {
  data() {
    return {
      Macro: null,
      DATA: BalanceSheet_Year_Data,
      Per_Year: BalanceSheet_Year_Data,
      Per_Quarter: BalanceSheet_2023Quarter_Data,
      Per_Month: BalanceSheet_4Q_Data
      // Per_... 에 해당하는 파일들은 테스트용임 - 실제 기능 시에는 쿼리문에 파라미터 전송해서 가져올 것
    }
  },
  methods: {
    periodChange(d){
      this.DATA = this.Per_Quarter;
      this.Macro = d;
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
th:hover {
  cursor: pointer;
}
th:first-child {
  width: 36%;
}
td:not(:first-child) {
  text-align: right;
}

</style>
