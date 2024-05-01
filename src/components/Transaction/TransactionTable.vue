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
              <tr v-if="i >= pageNo * listCountPerPage && i < pageNo * listCountPerPage + listCountPerPage">
                <td rowspan="2">{{(new Date(e.Date)).toLocaleString('ja-JP')}}</td>
                <td>{{e.Transaction}}</td>
                <td rowspan="2">{{e.Name}}</td>
                <td>{{e.Transaction !== "Banking"  ?  e.Price === 0 ? e.Fx_Rate.toFixed(4) : e.Price.toFixed(4)  :  0}}</td>
                <td>{{e.Currency}}</td>
              </tr>
              <tr v-if="i >= pageNo * listCountPerPage && i < pageNo * listCountPerPage + listCountPerPage">
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
        <span v-if="pgnNo > 0" 
              class="previous" 
              @click="setPagination(pgnNo, 'prev')">
          &lt;
        </span>
        <template v-for="(e, i) in Data.filter((el, idx) => idx % listCountPerPage === 0)" :key="i">
          <span v-if="i >= pgnRange * pgnNo  &&  i < pgnRange * (pgnNo + 1) "
                class="number" @click="pageNum(i)">
            {{i+1}}
          </span>
        </template>
        <span v-if="activeNext" 
              class="later" 
              @click="setPagination(pgnNo, 'later')">
          &gt;
        </span>
      </p>
      <span>[ Total : {{Data.length}} ]</span>
    </div>

  </div>
</template>

<script>
import { ref, toRefs, onUpdated, watch } from 'vue';
import axios from 'axios';

export default {
  props: ['dateFrom', 'dateTo'],
  setup(props) {
    /* Define Variables */
    const Data = ref(null);
    const pageNo = ref(0);
    const listCountPerPage = 15;
    const pgnRange = 10;
    const pgnNo = ref(0);
    const activeNext = ref(false);
    const transaction_list = [ 
      "All", 
      "Banking", "Exchange", "Trading",
      "Deposit", "Withdraw", "Dividend",
      "Exchange-Buy", "Exchange-Sell",
      "Buy", "Sell"
    ];
    const ParamValue = ref('All');
    const ParamInput = ref('');
    const ParamDateFrom = toRefs(props).dateFrom;
    const ParamDateTo = toRefs(props).dateTo;
    
    /* Define Functions */
    const getTransactionHistory = (pv, pi, pdf, pdt) => {   
      axios.get("/getTransactionHistory", {params: { Option: pv, Input: pi, DateFrom: pdf, DateTo: pdt }})
        .then(res => Data.value = res.data)
        .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
    }
    const pageNum = (n) => {
      pageNo.value = n;
      onThisPage(n % pgnRange);
    }
    const onThisPage = (n) => {
      const PAGES = document.querySelectorAll("#pagination p span.number");
      for(const e of PAGES) {e.classList.remove("on");}
      PAGES[n].classList.add("on");
    }
    const setPagination = (n, cond) => {
      pgnNo.value = cond === 'later' ? ++n : --n;
      pageNum(pgnNo.value * pgnRange);
    }

    /* LifeCycle Hook - Updated */
    onUpdated(()=>{
      onThisPage(pageNo.value % pgnRange);
      activeNext.value = 
        document.querySelectorAll("#pagination span.number").length === pgnRange
        ? true : false;
    });
    /* watch */
    watch(
      [ ParamValue, ParamInput, ParamDateFrom, ParamDateTo ], 
      ( [pv, pi, df, dt] ) => {
        getTransactionHistory(pv === "All" ? '' : pv, pi, df, dt);
        pageNum(0);
        pgnNo.value = 0;
      }
    );

    return {
      Data, ParamValue, ParamInput, transaction_list, 
      pageNo, listCountPerPage, pgnRange, pgnNo, activeNext,
      pageNum, setPagination
    };
  }
}
</script>

<style lang="scss" scoped>
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

  select {
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
  input {
    width: 12vw;
    height: 3vh;
    border: 1px solid gray;
    background: #0a0a0a;
    color: white;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 1%;
  }
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
  
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  
    thead > tr:nth-child(2) > th:nth-child(3) { border-right: none; }
  }
}
#transaction-list-tbody { 
  height: calc(88% - 0.4% * 2); 
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  overflow-y: scroll;

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  
    tbody > tr > td:nth-child(5) { border-right: 1px solid gray; }
  }
}
th {
  padding: 0.4% 1.0%;
  border-bottom: 1px solid gray;

  &:nth-child(1) { width: 12%; border-right: 1px solid gray; }
  &:nth-child(2) { width: 20%; border-right: 1px solid gray; }
  &:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  &:nth-child(4) { width: 24%; border-left: 1px solid gray; }
  &:nth-child(5) { width: 24%; border-left: 1px solid gray; }
}
td {
  padding: 0.4% 1.0%;
  border-bottom: 1px solid gray;

  &:nth-child(1) { width: 12%;   border-right: 1px solid gray; }
  &:nth-child(2) { width: 20%;   border-right: 1px solid gray; }
  &:nth-child(3) { width: 20%;   border-right: 1px solid gray; }
  &:nth-child(4) { width: 24%;   border-left:  1px solid gray; }
  &:nth-child(5) { width: 23.2%; border-left:  1px solid gray; }
}
tr {
  &:nth-child(odd) {
    & > th {
      &:nth-child(1), &:nth-child(3) { vertical-align: middle; }
      &:nth-child(2), &:nth-child(4), &:nth-child(5) { vertical-align: top; }
    }
    & > td {
      vertical-align: middle;

      &:nth-child(1), &:nth-child(3) { text-align: center; }
      &:nth-child(4), &:nth-child(5) { text-align: right; }
    }
  }
  &:nth-child(even) {
    & > th { vertical-align: top; }
    & > td { 
      vertical-align: middle;
      
      &:nth-child(2), &:nth-child(3) { text-align: right; }
    }
  }
  &:nth-child(4n+1) > td, &:nth-child(4n+2) > td {
    background:#1a1a1a;
  }
}
  
#pagination {
  width: 100%;
  height: 4.6%;
  padding-top: 0.4%;
  display: flex;
  justify-content: right;
  color: gray;

  & > p {
    width: 50%;
    height: 100%;
    margin: 0 5%;
    display: flex;
    justify-content: center;

    & > span {
      margin: 0 1.4%;
      cursor: pointer;

      &.on {
        font-weight: bold;
        color: whitesmoke;
      }
      &.previous:hover, &.later:hover {
        color: whitesmoke;
        font-weight: bold;
      }
    }
  }
  & > span {
    width: 20%;
    height: 100%;
    text-align: right;
  }
}

</style>
