<template>
  <div id="transaction-table">
    
    <div id="table-sort">
      <select>
        <option>All</option>
        <option>Deposit</option>
        <option>Withdraw</option>
        <option>Buy</option>
        <option>Sell</option>
        <option>Dividend</option>
      </select>
      <input type='text' placeholder="Search"/>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>NAME</th>
          <th>Transaction</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td><td></td><td></td><td></td>
        </tr>
      </tbody>
    </table>
    
    <div id="pagination">
      <p>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
      </p>
      <span>[ Total : XXX ]</span>
    </div>

  </div>
</template>

<style scoped>
  #transaction-table {
    width: 88%;
    height: 90%;
  }

  #table-sort {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: left;
    align-items: flex-end;
  }
  #table-sort select {
    background: #1a1a1a;
    color: white;
    margin-right: 1%;
    margin-bottom: 1%;
    font-weight: bold;
    width: 6vw;
    height: 3vh;
  }
  #table-sort input {
    height: 3vh;
    border: 1px solid gray;
    background: #0a0a0a;
    color: white;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 1%;
  }

  table {
    width: 100%;
    height: 85%;
    border-collapse: collapse;
    color: white;
  }
  thead {
    height: 12%;
  }
  th:nth-child(1) { width: 10%; }
  th:nth-child(2) { width: 14%; }
  th:nth-child(3) { width: 16%; }
  th:nth-child(4) { width: 60%; }
  th, td {
    padding: 0.4% 1.4%;
    border: 1px solid gray;
  }

  #pagination {
    width: 100%;
    height: 4.6%;
    padding-top: 0.4%;
    display: flex;
    justify-content: right;
    color: gray;
  }
  #pagination > p {
    width: 50%;
    height: 100%;
    margin: 0 5%;
    display: flex;
    justify-content: center;
  }
  #pagination > p > span {
    margin: 0 1.4%;
  }
  #pagination > p > span:hover {
    cursor: pointer;
    font-weight: bold;
    color: whitesmoke;
  }
  #pagination > p > span:last-child {
    content: '>';
  }
  #pagination > span {
    width: 20%;
    height: 100%;
    text-align: right;
  }

</style>