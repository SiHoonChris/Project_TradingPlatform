<template>
  <div id="transaction-table">
    <div id="table-info">
      <div id="tbl-period">
        <span class="label">Period in detail</span>
        <div id="period-result">
          <input type="text" readonly :value="
            new Date(transactionData[0].Date).toLocaleString('ja-JP').replaceAll('/', '.')
          "/>
          <span style="color:#ffffff; margin:0 4px; font-size:13px;">~</span>
          <input type="text" readonly :value="
            new Date(transactionData[transactionData.length-1].Date).toLocaleString('ja-JP').replaceAll('/', '.')
          "/>
        </div>
      </div>
      <div id="tbl-result">
        <span class="label">Expense in total</span>
        <div id="expense-result">
          <input type="text" readonly :value="(expenseTotal).toLocaleString()"/> <!-- 서버 단에서 계산해서 결과 전송 -->
          <span style="color:#ffffff; margin-left:2px; font-size:13px;">(\)</span>
        </div>
      </div>
    </div>
    <div id="table-result">
      <div id="table-canvas"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactionData : [
  {
    "Date": "2024-03-25T04:07:25.000Z",
    "Transaction": "Exchange-Sell",
    "Name": "",
    "Price": 0,
    "FX": 986.19,
    "Amount": 3765.21,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "SGD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-20T23:06:55.000Z",
    "Transaction": "Sell",
    "Name": "D05",
    "Price": 34.9,
    "FX": 0,
    "Amount": 100,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "SGD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-15T02:05:06.000Z",
    "Transaction": "Dividend",
    "Name": "MSFT",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 18,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-13T23:07:11.000Z",
    "Transaction": "Buy",
    "Name": "NVDA",
    "Price": 875,
    "FX": 0,
    "Amount": 2,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-13T23:07:11.000Z",
    "Transaction": "Buy",
    "Name": "AMD",
    "Price": 200.57,
    "FX": 0,
    "Amount": 5,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-07T05:46:46.000Z",
    "Transaction": "Dividend",
    "Name": "IEF",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 21.44,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-03-06T01:20:24.000Z",
    "Transaction": "Dividend",
    "Name": "JNJ",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 10.71,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-15T23:07:56.000Z",
    "Transaction": "Buy",
    "Name": "NVDA",
    "Price": 711.3,
    "FX": 0,
    "Amount": 1,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-15T23:07:56.000Z",
    "Transaction": "Buy",
    "Name": "MSFT",
    "Price": 406.7,
    "FX": 0,
    "Amount": 3,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-15T23:07:56.000Z",
    "Transaction": "Buy",
    "Name": "KO",
    "Price": 59.82,
    "FX": 0,
    "Amount": 10,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-15T23:07:56.000Z",
    "Transaction": "Buy",
    "Name": "GOOGL",
    "Price": 145.79,
    "FX": 0,
    "Amount": 1,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-15T23:07:56.000Z",
    "Transaction": "Buy",
    "Name": "GOOGL",
    "Price": 145.7899,
    "FX": 0,
    "Amount": 6,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-12T23:08:07.000Z",
    "Transaction": "Buy",
    "Name": "NVDA",
    "Price": 680.43,
    "FX": 0,
    "Amount": 1,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-12T23:08:06.000Z",
    "Transaction": "Buy",
    "Name": "KO",
    "Price": 59.845,
    "FX": 0,
    "Amount": 4,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-12T23:08:06.000Z",
    "Transaction": "Buy",
    "Name": "AMD",
    "Price": 168.8,
    "FX": 0,
    "Amount": 1,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-12T23:08:06.000Z",
    "Transaction": "Buy",
    "Name": "ADBE",
    "Price": 611.9,
    "FX": 0,
    "Amount": 1,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-07T23:06:32.000Z",
    "Transaction": "Buy",
    "Name": "MSFT",
    "Price": 407.4,
    "FX": 0,
    "Amount": 2,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-07T23:06:32.000Z",
    "Transaction": "Buy",
    "Name": "JPM",
    "Price": 174.08,
    "FX": 0,
    "Amount": 7,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-07T23:06:32.000Z",
    "Transaction": "Buy",
    "Name": "GS",
    "Price": 384.69,
    "FX": 0,
    "Amount": 2,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-07T23:06:32.000Z",
    "Transaction": "Buy",
    "Name": "GOOGL",
    "Price": 145.1599,
    "FX": 0,
    "Amount": 5,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-07T07:07:57.000Z",
    "Transaction": "Dividend",
    "Name": "IEF",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 20.29,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-04T23:06:15.000Z",
    "Transaction": "Sell",
    "Name": "TLT",
    "Price": 96.84,
    "FX": 0,
    "Amount": 87,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-02-04T23:06:15.000Z",
    "Transaction": "Buy",
    "Name": "GOOGL",
    "Price": 142.85,
    "FX": 0,
    "Amount": 8,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-24T23:06:59.000Z",
    "Transaction": "Buy",
    "Name": "NVDA",
    "Price": 601.882,
    "FX": 0,
    "Amount": 2,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-24T23:06:59.000Z",
    "Transaction": "Buy",
    "Name": "AMD",
    "Price": 170,
    "FX": 0,
    "Amount": 5,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-24T23:06:59.000Z",
    "Transaction": "Buy",
    "Name": "ADBE",
    "Price": 616.7599,
    "FX": 0,
    "Amount": 4,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-18T00:54:54.000Z",
    "Transaction": "Withdraw",
    "Name": "",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 0,
    "Withdraw": 1006602,
    "Dividend": 0,
    "Currency": "KRW", 
    "Expense": 10
  },
  {
    "Date": "2024-01-13T16:52:19.000Z",
    "Transaction": "Deposit",
    "Name": "",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 7774,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "KRW", 
    "Expense": 10
  },
  {
    "Date": "2024-01-11T23:07:00.000Z",
    "Transaction": "Buy",
    "Name": "MSFT",
    "Price": 371.9,
    "FX": 0,
    "Amount": 3,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-11T23:07:00.000Z",
    "Transaction": "Buy",
    "Name": "KO",
    "Price": 59.98,
    "FX": 0,
    "Amount": 34,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-11T23:06:59.000Z",
    "Transaction": "Buy",
    "Name": "GOOGL",
    "Price": 139.38,
    "FX": 0,
    "Amount": 15,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-09T23:06:08.000Z",
    "Transaction": "Sell",
    "Name": "SHY",
    "Price": 81.9,
    "FX": 0,
    "Amount": 103,
    "Deposit": 0,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "USD", 
    "Expense": 10
  },
  {
    "Date": "2024-01-06T05:05:11.000Z",
    "Transaction": "Deposit",
    "Name": "",
    "Price": 0,
    "FX": 0,
    "Amount": 0,
    "Deposit": 1000000,
    "Withdraw": 0,
    "Dividend": 0,
    "Currency": "KRW", 
    "Expense": 10
  }
],
      expenseTotal:134890
    }
  },
  mounted(){
    this.$Create_Table (
      this.transactionData, 
      "table-result", 
      getComputedStyle(document.getElementById('table-canvas')).width,
      getComputedStyle(document.getElementById('table-canvas')).height,
      false
    );
    document.getElementById('table-canvas').nextSibling.style.position='absolute';
  },
  // props: ['dateFrom', 'dateTo'],
  // setup(props) {
  //   /* Define Variables */
  //   // const Data = ref(null);

  //   const Data = null;
  //   const pageNo = ref(0);
  //   const listCountPerPage = 15;
  //   const pgnRange = 10;
  //   const pgnNo = ref(0);
  //   const activeNext = ref(false);
  //   const transaction_list = [ 
  //     "All", 
  //     "Banking", "Exchange", "Trading",
  //     "Deposit", "Withdraw", "Dividend",
  //     "Exchange-Buy", "Exchange-Sell",
  //     "Buy", "Sell"
  //   ];
  //   const ParamValue = ref('All');
  //   const ParamInput = ref('');
  //   const ParamDateFrom = toRefs(props).dateFrom;
  //   const ParamDateTo = toRefs(props).dateTo;
    
  //   /* Define Functions */
  //   // const getTransactionHistory = (pv, pi, pdf, pdt) => {   
  //   //   axios.get("/getTransactionHistory", {params: { Option: pv, Input: pi, DateFrom: pdf, DateTo: pdt }})
  //   //     .then(res => Data.value = res.data)
  //   //     .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
  //   // }
  //   const pageNum = (n) => {
  //     pageNo.value = n;
  //     onThisPage(n % pgnRange);
  //   }
  //   const onThisPage = (n) => {
  //     const PAGES = document.querySelectorAll("#pagination p span.number");
  //     for(const e of PAGES) {e.classList.remove("on");}
  //     PAGES[n].classList.add("on");
  //   }
  //   const setPagination = (n, cond) => {
  //     pgnNo.value = cond === 'later' ? ++n : --n;
  //     pageNum(pgnNo.value * pgnRange);
  //   }

  //   /* LifeCycle Hook - Updated */
  //   onUpdated(()=>{
  //     onThisPage(pageNo.value % pgnRange);
  //     activeNext.value = 
  //       document.querySelectorAll("#pagination span.number").length === pgnRange
  //       ? true : false;
  //   });
  //   /* watch */
  //   // watch(
  //   //   [ ParamValue, ParamInput, ParamDateFrom, ParamDateTo ], 
  //   //   ( [pv, pi, df, dt] ) => {
  //   //     getTransactionHistory(pv === "All" ? '' : pv, pi, df, dt);
  //   //     pageNum(0);
  //   //     pgnNo.value = 0;
  //   //   }
  //   // );

  //   return {
  //     Data, ParamValue, ParamInput, transaction_list, 
  //     pageNo, listCountPerPage, pgnRange, pgnNo, activeNext,
  //     pageNum, setPagination
  //   };
  // }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Table.scss";
</style>