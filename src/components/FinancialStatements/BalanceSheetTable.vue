<template>
  <div>
    <p>Balance Sheets</p>
    <div id="balance-sheet-table">
      <table>        
        <thead>
          <tr>
            <th>{{this.Macro}}</th>
            <th v-for="(d, i) in DATA" :key="i" @click="periodChange(DATA[i].PERIOD)">{{DATA[i].PERIOD}}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Assets</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Cash</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].CASH.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Investment</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].INVESTMENT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Others</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].OTHERS.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Assets</td>
            <td v-for="(d, i) in DATA" :key="i"> <!-- 쿼리문에서 계산 예정 -->
              {{(DATA[i].CASH + DATA[i].INVESTMENT + DATA[i].OTHERS).toLocaleString()}}
            </td>
          </tr>
          <tr><td>Liabilities</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Short-term</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].SHORT_TERM_LIABILITIES.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Long-term</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].LONG_TERM_LIABILITIES.toLocaleString()}}</td></tr>
          <tr><td>&emsp;&emsp;Total Liabilities</td>
            <td v-for="(d, i) in DATA" :key="i"> <!-- 쿼리문에서 계산 예정 -->
              {{(DATA[i].SHORT_TERM_LIABILITIES + DATA[i].LONG_TERM_LIABILITIES).toLocaleString()}}
            </td>
          </tr>
          <tr><td>Equity</td><td v-for="(d, i) in DATA" :key="i"></td></tr>
          <tr><td>&emsp;Deposit</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].DEPOSIT.toLocaleString()}}</td></tr>
          <tr><td>&emsp;Retained Earnings</td><td v-for="(d, i) in DATA" :key="i">{{DATA[i].RETAINED_EARNINGS.toLocaleString()}}</td></tr>
          <tr><td>Total Liabilities and Equity</td>
            <td v-for="(d, i) in DATA" :key="i"> <!-- 쿼리문에서 계산 예정 -->
              {{
                ( DATA[i].SHORT_TERM_LIABILITIES
                + DATA[i].LONG_TERM_LIABILITIES
                + DATA[i].DEPOSIT
                + DATA[i].RETAINED_EARNINGS ).toLocaleString()
              }}
            </td>
          </tr>
          <tr><td>Debt Rate</td>
            <td v-for="(d, i) in DATA" :key="i"> <!-- 쿼리문에서 계산 예정 -->
              {{
                (
                  (DATA[i].SHORT_TERM_LIABILITIES + DATA[i].LONG_TERM_LIABILITIES)
                  /(DATA[i].DEPOSIT + DATA[i].RETAINED_EARNINGS)
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
import BS_3_Year_Data from "@/assets/balance_sheets/3-Year.json"
import BS_All_Quarter_Data from "@/assets/balance_sheets/2023-All-Quarter.json"
import BalanceSheet_4Q_Data from "@/assets/balance_sheets/2023-4th-Quarter.json"

export default {
  data() {
    return {
      Macro: null,
      DATA: BS_3_Year_Data,
      Per_Year: BS_3_Year_Data,
      Per_Quarter: BS_All_Quarter_Data,
      Per_Month: BalanceSheet_4Q_Data
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
