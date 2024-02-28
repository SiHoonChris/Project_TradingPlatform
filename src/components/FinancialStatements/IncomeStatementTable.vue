<template>
  <div>
    <p>Income Statements</p>
    <div id="income-statement-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(d, i) in DATA" :key="i">{{DATA[i].YEAR}}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Revenue</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;Marginal Profit</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;Dividend, Interest</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;&emsp;Total Revenue</td><td></td><td></td><td></td></tr>
          <tr><td>Net Income</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;Marginal Profit</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;Dividend, Interest</td><td></td><td></td><td></td></tr>
          <tr><td>&emsp;&emsp;Total Net Income</td><td></td><td></td><td></td></tr>
          <tr><td>Profit Margin Rate</td><td></td><td></td><td></td></tr>
          <tr><td>ROE</td><td></td><td></td><td></td></tr>
          <tr><td>Net Income / Long-term Liab.</td><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Income_Statement_Data from "@/assets/income_statements.json"

export default {
  data() {
    return {
      DATA: Income_Statement_Data
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
