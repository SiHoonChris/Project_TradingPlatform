<template>
  <div id="transaction-table">

    <div id="table-sort">
      <select v-model="ParamValue">
        <option v-for="(d, i) in transaction_list" :key="i" :value="d">{{d}}</option>
      </select>
      <input type='text' placeholder="Search" v-model="ParamInput"/>
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
              <tr v-if="i >= this.pageNo * this.listCountPerPage && i < this.pageNo * this.listCountPerPage + this.listCountPerPage">
                <td rowspan="2">{{(new Date(e.Date)).toLocaleString('ja-JP')}}</td>
                <td>{{e.Transaction}}</td>
                <td rowspan="2">{{e.Name}}</td>
                <td>{{e.Transaction !== "Banking"  ?  e.Price === 0 ? e.Fx_Rate.toFixed(4) : e.Price.toFixed(4)  :  0}}</td>
                <td>{{e.Currency}}</td>
              </tr>
              <tr v-if="i >= this.pageNo * this.listCountPerPage && i < this.pageNo * this.listCountPerPage + this.listCountPerPage">
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
        <span v-if="this.pgnNo > 0" 
              class="previous" 
              @click="setPagination(this.pgnNo, 'prev')">
          &lt;
        </span>
        <template v-for="(e, i) in Data.filter((el, idx) => idx % this.listCountPerPage === 0)" :key="i">
          <span v-if="i >= this.pgnRange * this.pgnNo  &&  i < this.pgnRange * (this.pgnNo + 1) "
                class="number" @click="pageNum(i)">
            {{i+1}}
          </span>
        </template>
        <span v-if="activeNext" 
              class="later" 
              @click="setPagination(this.pgnNo, 'later')">
          &gt;
        </span>
      </p>
      <span>[ Total : {{this.Data.length}} ]</span>
    </div>

  </div>
</template>

<script>
export default {
  props: ['dateFrom', 'dateTo'],
  data() {
    return {
      Data: null,
      pageNo: 0,
      listCountPerPage: 15,
      pgnRange: 10,
      pgnNo: 0,
      activeNext: false,
      Settlement: null,
      transaction_list: [ 
        "All", 
        "Banking", "Exchange", "Trading",
        "Deposit", "Withdraw", "Dividend",
        "Exchange-Buy", "Exchange-Sell",
        "Buy", "Sell"
      ], 
      ParamValue: "All", 
      ParamInput: '',
      ParamDateFrom: '',
      ParamDateTo: ''
    }
  },
  created(){
    let today = new Date();   
    let dateInit = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.getTransactionHistory(
      this.ParamValue === "All" ? '' : this.ParamValue , 
      this.ParamInput, dateInit, dateInit
    );
  },
  updated(){
    this.onThisPage(this.pageNo % this.pgnRange);
    this.activeNext = 
      document.querySelectorAll("#pagination span.number").length === this.pgnRange
      ? true : false;
  },
  watch: { // 이거 나중에 setup - composition API였나? 그거 써서 하나로 합쳐
    ParamValue: function(val){
      this.getTransactionHistory(val === "All" ? '' : val, this.ParamInput, this.dateFrom, this.dateTo);
      this.pageNum(0);
    },
    ParamInput: function(val) {
      this.getTransactionHistory(this.ParamValue === "All" ? '' : this.ParamValue, val, this.dateFrom, this.dateTo);
      this.pageNum(0);
    },
    dateFrom: function(val) {
      this.getTransactionHistory(this.ParamValue === "All" ? '' : this.ParamValue, this.ParamInput, val, this.dateTo);
      this.pageNum(0);
    },
    dateTo: function(val) {
      this.getTransactionHistory(this.ParamValue === "All" ? '' : this.ParamValue,  this.ParamInput, this.dateFrom, val);
      this.pageNum(0);
    }
  },
  methods: {
    getTransactionHistory(pv, pi, pdf, pdt){
      this.$http.get("/getTransactionHistory", {params: { Option: pv, Input: pi, DateFrom: pdf, DateTo: pdt }})
        .then(res => this.Data = res.data) // res.data가 null 일 때의 처리 필요
        .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    },
    pageNum(n) {
      this.pageNo = n;
      this.onThisPage(n % this.pgnRange);
    },
    onThisPage(n) {
      const PAGES = document.querySelectorAll("#pagination p span.number");
      for(const e of PAGES) {e.classList.remove("on");}
      PAGES[n].classList.add("on");
    },
    setPagination(n, cond){
      this.pgnNo = cond === 'later' ? ++n : --n;
      this.pageNum(this.pgnNo * this.pgnRange);
    }
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
    padding-top: 1px;
    padding-bottom: 1px;
    font-weight: bold;
    width: 8vw;
    height: 3vh;
  }
  #table-sort input {
    width: 12vw;
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
  tr:nth-child(odd) > td:nth-child(2) , tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: middle; }
  tr:nth-child(even) > td { vertical-align: middle; }
  tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) , 
  tr:nth-child(even) > td:nth-child(2) , tr:nth-child(even) > td:nth-child(3) { text-align: right; }
  #transaction-list-tbody > table > tbody > tr > td:nth-child(5) { border-right: 1px solid gray; }
  tr:nth-child(4n+1) > td , tr:nth-child(4n+2) > td { background:#1a1a1a; }

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
    cursor: pointer;
  }
  #pagination > p > span.on {
    font-weight: bold;
    color: whitesmoke;
  }
  #pagination > p > span.previous:hover, #pagination > p > span.later:hover {
    color: whitesmoke;
    font-weight: bold;
  }
  #pagination > span {
    width: 20%;
    height: 100%;
    text-align: right;
  }

</style>