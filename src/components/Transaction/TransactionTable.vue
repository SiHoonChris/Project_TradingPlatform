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
  @import "@/assets/css/Transactions/Table.scss";
</style>