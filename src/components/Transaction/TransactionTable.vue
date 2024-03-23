<template>
  <div id="transaction-table">

    <div id="table-sort">
      <select>
        <option v-for="(d, i) in transaction_list" :key="i">{{d}}</option>
      </select>
      <input type='text' placeholder="Search"/>
    </div>
    
    <div id="transaction-list">
      <div id="transaction-list-thead">
        <table>
          <thead>
            <tr>
              <th rowspan="2">Date</th>
              <th>Transaction</th>
              <th rowspan="2">Name</th>
              <th>Price or FX-Rate</th>
              <th>Currency</th>
            </tr>
            <tr>
              <th>Detail</th>
              <th>Amount</th>
              <th>Value</th>
            </tr>
          </thead>
        </table>
      </div>
      <div id="transaction-list-tbody">
        <table>
          <tbody>
            <template v-for="(e,i) in Data" :key="i">
              <tr>
                <td rowspan="2">{{e.Date}}</td>
                <td>{{e.Transaction}}</td>
                <td rowspan="2">{{e.Name}}</td>
                <td>{{e.Transaction !== "Banking"  ?  e.Price === 0 ? e.FX_Rate.toFixed(4) : e.Price.toFixed(4)  :  0}}</td>
                <td>{{e.Currency}}</td>
              </tr>
              <tr>
                <td>{{e.Detail}}</td>
                <td>{{e.Transaction !== 'Banking' ? Number(e.Amount).toLocaleString() : 0}}</td>
                <td>{{Number(e.Value).toLocaleString()}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    
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
      <span>[ Total : {{this.Data.length}} ]</span>
    </div>

  </div>
</template>

<script>
import SampleTransactionList from "@/assets/SampleTransactionList.json"

export default {
  data() {
    return {
      Data: null,
      Settlement: null,
      transaction_list: [ 
        "All", 
        "Banking", 
        "Exchange", 
        "Trading",
        "Deposit",
        "Withdraw",
        "Dividend",
        "Exchange-Buy",
        "Exchange-Sell",
        "Buy",
        "Sell"
      ]
    }
  },
  created(){
    this.Data = SampleTransactionList;
  }
}
</script>

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

  #transaction-list {
    width: 100%;
    height: 85%;
  }
  #transaction-list-thead { 
    height: 12%; 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 1px solid gray;
  }
  #transaction-list-thead table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  #transaction-list-tbody { 
    height: calc(88% - 0.4% * 2); 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    overflow-y: scroll;
  }
  #transaction-list-tbody table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  th {
    padding: 0.4% 1.0%;
    border-bottom: 1px solid gray;
  }
  th:nth-child(1) { width: 12%; border-right: 1px solid gray; }
  th:nth-child(2) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(4) { width: 24%; border-left: 1px solid gray; }
  th:nth-child(5) { width: 24%; border-left: 1px solid gray; }
  tr:nth-child(odd) > th:nth-child(1) , tr:nth-child(odd) > th:nth-child(3) { vertical-align: middle; }
  tr:nth-child(odd) > th:nth-child(2) , tr:nth-child(odd) > th:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: top; }
  tr:nth-child(even) > th { vertical-align: top; }
  #transaction-list-thead > table > thead > tr:nth-child(2) > th:nth-child(3) { border-right: none; }
  td {
    padding: 0.4% 1.0%;
    border-bottom: 1px solid gray;
  }
  td:nth-child(1) { width: 12%; border-right: 1px solid gray; }
  td:nth-child(2) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(4) { width: 24%; border-left: 1px solid gray; }
  td:nth-child(5) { width: 23.2%; border-left: 1px solid gray; }
  tr:nth-child(odd) > td:nth-child(1) , tr:nth-child(odd) > td:nth-child(3) { vertical-align: middle; text-align: center; }
  tr:nth-child(odd) > td:nth-child(2) , tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: top; }
  tr:nth-child(even) > td { vertical-align: top; }
  tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) , 
  tr:nth-child(even) > td:nth-child(2) , tr:nth-child(even) > td:nth-child(3) { text-align: right; }
  #transaction-list-tbody > table > tbody > tr > td:nth-child(5) { border-right: 1px solid gray; }
  tr:nth-child(4n+1) > td , tr:nth-child(4n+2) > td {background:#1a1a1a;}

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
  #pagination > p > span:nth-child(10) {
    content: '>';
  }
  #pagination > span {
    width: 20%;
    height: 100%;
    text-align: right;
  }

</style>