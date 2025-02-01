<template>
  <div id="component-expense-chart">
    <div id="chart-header">
      <div id="chart-setting">
        <div id="set-period">
          <span class="label">Period</span>
          <TransactionCalendar/>
        </div>
        <div id="set-transaction">
          <span class="label">Transaction</span>
          <select v-model="transactionType">
            <option v-for="(e, i) in this.transaction_list" :key="i" :value="e">{{e}}</option>
          </select>
        </div>
        <div id="set-button">
          <button @click="getTransactionHistoryDataForChart()">
            <img :src="btn.img" :alt="btn.fn">
          </button>
        </div>
      </div>
      <div id="result-num">
        <span>num:</span>&nbsp;<span>{{(data.length).toLocaleString()}}</span>
      </div>
    </div>
    <div id="chart-result">
      <div id="chart-svg"></div>
    </div>
  </div>
</template>

<script>
import TransactionCalendar from '@/components/Expense/ExpenseCalendar.vue' /* 수정 필요 */

export default {
  /* 기본 연도 세팅은 1년전 ~ 오늘 */
  /* 국내주식, 해외주식, 가상화폐 색상 구분 */
  /* 캘린더 가장 최초 데이터는 첫 데이터, 마지막 데이터는 오늘 */
  components: { TransactionCalendar },
  data() {
    return {
      btn: {fn:'search', img:require("@/assets/img/btnImg/Expense/magnify_glass.png")},
      data: [],
      transactionType: '전체',
      transaction_list: []
    }
  },
  mounted() {
    this.$http.get("/getTransactionTypeList")
      .then(res => {
        this.transaction_list = res.data.map(list => list.transaction_type);
        this.transaction_type = this.transaction_list[0];
        this.getTransactionHistoryDataForChart();
      })
      .catch(err => console.log(err));
  },
  methods: {
    getTransactionHistoryDataForChart : function () {
      let t  = this.transactionType === '전체' ? '' : this.transactionType,
          df = document.getElementById("dateFrom").textContent.replaceAll(".", "-"),
          dt = document.getElementById("dateTo").textContent.replaceAll(".", "-");

      this.$http.get("/getTransactionHistoryDataForChart", {
          params: { 
            Transaction: t,
            DateFrom   : df,
            DateTo     : dt
          }
        }).then(res => {
          this.data = res.data;
          this.setScatterPlotChart(res.data, 'chart-svg');

          // this.$emit('sendTransaction', tD); // TransactionsView.vue
        }).catch(err => console.log(err));

        // document.getElementById('period-date-from').value = '';
        // document.getElementById('period-date-to').value = '';
      },
      setScatterPlotChart: function (data, elementId) {
        if(document.getElementById(elementId).hasChildNodes()){
          document.getElementById(elementId).querySelector("svg").remove();
        }

        // Specify the chart’s dimensions.
        const Width = window.getComputedStyle(document.getElementById(elementId)).width.replace('px', '');
        const Height = window.getComputedStyle(document.getElementById(elementId)).height.replace('px', '');
        const margin = { Top: 10, Right: 20, Bottom: 30, Left: 20 }

        // Create the SVG container.
        const svg = 
          d3.select(`#${elementId}`)
            .append("svg")
              .attr("width", Width)
              .attr("height", Height)
            .append("g")
              .attr("transform", `translate(${margin.Left}, ${margin.Top})`);

        // Add X axis
        const xScale = /* x축의 tick 개수는 6개로 고정*/
          d3.scaleUtc()
            .domain([d3.min(data, d => new Date(d["Date"])), d3.max(data, d => new Date(d["Date"]))])
            .range([margin.Left, Width - (margin.Left + margin.Right)]);
        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0, ${Height - margin.Bottom})`)
            .attr('color', '#333232')
            .attr("stroke", "#b8b8b8")
            .call(d3.axisBottom(xScale).ticks(6).tickSizeInner(0).tickSizeOuter(0));

        // Add Y axis
        const yScale = /* y축의 tick 개수는 5개로 고정(data가 없을 시 yMax=1, yMin=0) */
          d3.scaleLinear()
            .domain([0, d3.max(data, d => d["Expense"])])
            .range([Height - margin.Bottom, margin.Top]);
        svg.append("g")
            .attr("class", "yAxis")
            .attr("transform", `translate(${margin.Left}, 0)`)
            .attr('color', '#333232')
            .attr("stroke", "#b8b8b8")
            .call(d3.axisLeft(yScale).ticks(5).tickSizeInner(0).tickSizeOuter(0));

        // Add dots
        const dot = 
          svg.append("g")
              .attr("fill", "none")
              .attr("stroke", "purple")
              .attr("stroke-width", 1.8)
              .selectAll("circle")
              .data(data)
              .join("circle")
              .attr("transform", d => `translate(${xScale(new Date(d["Date"]))},${yScale(d["Expense"])})`)
              .attr("r", 2.2);

        // Brush
        svg.call(
          d3.brush()
            .extent([[margin.Left, margin.Top], [Width-(margin.Right+margin.Left), Height-margin.Bottom]])
            .on("end", function() {
                let selectedArea = d3.brushSelection(this);
                
                if(selectedArea !== null) {
                  let dateFrom = new Date(xScale.invert(selectedArea[0][0])).toLocaleString('ja-JP'),
                      dateTo   = new Date(xScale.invert(selectedArea[1][0])).toLocaleString('ja-JP'),
                      expenseMin = yScale.invert(selectedArea[1][1]),
                      expenseMax = yScale.invert(selectedArea[0][1]);
                    
                  document.getElementById('period-date-from').value = dateFrom.replaceAll('/', '.');
                  document.getElementById('period-date-to').value   = dateTo.replaceAll('/', '.');
                  setExpense['expenseMin'] = expenseMin;
                  setExpense['expenseMax'] = expenseMax;

                  setTimeout(() => document.getElementById('createTblButton').click(), 100);
                }
            })
        );

        // Brush - rect.selection
        d3.select('rect.selection')
          .attr('fill', '#56ae77')
          .attr("fill-opacity", 0.2)
          .attr('stroke', '#41915f');
      }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/Components/Chart.scss";
</style>