<template>
  <div id="OrderHistory">
    <div id="select-order-history">
      <select>
        <option>Open Orders</option>
        <option>Order History</option>
        <option>Trade History</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td><td></td><td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  #OrderHistory {
    width: 100%;
    height: 100%;
  }
  #select-order-history {
    height: 15%;
    width: 100%;
  }
  #select-order-history select {
    color: white;
    background: #1a1a1a;
    margin-left: 2%;
  }
  table {
    color: white;
    width: 100%;
    height: 85%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid gray;
  }
</style>