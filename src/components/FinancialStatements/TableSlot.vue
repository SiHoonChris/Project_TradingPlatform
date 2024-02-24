<template>
  <div id="table-slot">

    <p>
      <slot name="header">title</slot>
    </p>

    <slot name="balance">
      <div id="balance-sheet-table">
        <table>
          <thead>
            <tr>
              <th></th><th>2024</th><th>2023</th><th>2022</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Assets</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Cash</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Investment</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Others</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;&emsp;Total Assets</td><td></td><td></td><td></td></tr>
            <tr><td>Liabilities</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Short-term</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Long-term</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;&emsp;Total-Liabilities</td><td></td><td></td><td></td></tr>
            <tr><td>Equity</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Deposit</td><td></td><td></td><td></td></tr>
            <tr><td>&emsp;Retained Earnings</td><td></td><td></td><td></td></tr>
            <tr><td>Total Liabilities and Equity</td><td></td><td></td><td></td></tr>
            <tr><td>Debt Rate</td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </slot>
    
    <slot name="income">
      <div id="income-statement-table">
        <table>
          <thead>
            <tr>
              <th></th><th>2024</th><th>2023</th><th>2022</th>
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
    </slot>

  </div>
</template>

<style scoped>
p {
  color: white;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin: 6vh 0 3vh 0;
}
#table-slot div{
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

</style>
