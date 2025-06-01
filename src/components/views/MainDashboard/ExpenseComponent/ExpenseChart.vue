<template>
  <div id="component-expense-chart">
    <div id="chart-header">
      <div id="chart-setting">
        <div id="set-period">
          <span class="label">Period</span>
          <div id="select-period">
            <div id="date-from">
              <select v-model="fromDate.Year">
                <option v-for="year in fromYearRange" :key="year" :value="year">{{year}}</option>
              </select>
              <span>&nbsp;.&nbsp;</span>
              <select v-model="fromDate.Month">
                <option v-for="n in 12" :key="n" :value="n">{{n}}</option>
              </select>
              <span>&nbsp;.&nbsp;</span>
              <select v-model="fromDate.Date">
                <option v-for="day in fromDaysInMonth" :key="day" :value="day">{{day}}</option>
              </select>
            </div>
            <div>&nbsp;~&nbsp;</div>
            <div id="date-to">
              <select v-model="toDate.Year">
                <option v-for="year in toYearRange" :key="year" :value="year">{{year}}</option>
              </select>
              <span>&nbsp;.&nbsp;</span>
              <select v-model="toDate.Month">
                <option v-for="n in 12" :key="n" :value="n">{{n}}</option>
              </select>
              <span>&nbsp;.&nbsp;</span>
              <select v-model="toDate.Date">
                <option v-for="day in toDaysInMonth" :key="day" :value="day">{{day}}</option>
              </select>
            </div>
          </div>
        </div>
        <div id="set-transaction">
          <span class="label">Transaction</span>
          <select v-model="transactionType">
            <option v-for="(e, i) in this.transaction_list" :key="i" :value="e">{{e}}</option>
          </select>
        </div>
        <div id="set-button">
          <button @click="func_setButtion()">
            <img :src="btn.img" :alt="btn.fn">
          </button>
        </div>
      </div>
      <div id="result-number">
        <span>num: {{(data.length).toLocaleString()}}</span>
        <span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;</span>
        <span>expense in total: {{(Math.round(expenseInTotal)).toLocaleString()}} (KRW)</span>
      </div>
    </div>
    <div id="chart-result">
      <div id="chart-svg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btn: {fn:'search', img:require("@/assets/img/btnImg/Expense/magnify_glass.png")},
      data: [],
      startDate: { Year: 0, Month: 0, Date: 0 },
      endDate: { Year: 0, Month: 0, Date: 0 },
      fromDate: { Year: 0, Month: 0, Date: 0 },
      toDate: { Year: 0, Month: 0, Date: 0 },
      transactionType: '전체',
      transaction_list: [],
      expenseInTotal: 0
    }
  },
  computed: {
    fromYearRange() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: currentYear - this.startDate.Year + 1 }, (_, i) => this.startDate.Year + i);
    },
    toYearRange() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: currentYear - this.startDate.Year + 1 }, (_, i) => this.startDate.Year + i);
    },
    fromDaysInMonth() {
      const fromDate = new Date(this.fromDate.Year, this.fromDate.Month, 0);
      return Array.from({ length: fromDate.getDate() }, (_, i) => i + 1);
    },
    toDaysInMonth() {
      const toDate = new Date(this.toDate.Year, this.toDate.Month, 0);
      return Array.from({ length: toDate.getDate() }, (_, i) => i + 1);
    }
  },
  mounted() {
    this.setInitDate();
    this.$http.get("/getTransactionTypeList")
      .then(res => {
        this.transaction_list = res.data.map(list => list.transaction_type);
        this.transaction_type = this.transaction_list[0];
        this.getTransactionHistoryDataForChart();
      })
      .then(done => { // send data to table-component right after chart-component mounted
        this.setSelectedPeriod(
          `${this.fromDate.Year}.${this.fromDate.Month}.${this.fromDate.Date} 0:00:00`, 
          `${this.toDate.Year}.${this.toDate.Month}.${this.toDate.Date} 23:59:59`
        );
        this.updateTransactionConditionAndUpdateTable(
          `${this.fromDate.Year}-${this.fromDate.Month}-${this.fromDate.Date} 0:00:00`, 
          `${this.toDate.Year}-${this.toDate.Month}-${this.toDate.Date} 23:59:59`, 
          0, 
          Number.MAX_SAFE_INTEGER, 
          ''
        );
      })
      .catch(err => console.log(err));
  },
  methods: {
    func_setButtion: function() {
      this.getTransactionHistoryDataForChart();
      this.setSelectedPeriod(
        `${this.fromDate.Year}.${this.fromDate.Month}.${this.fromDate.Date} 0:00:00`, 
        `${this.toDate.Year}.${this.toDate.Month}.${this.toDate.Date} 23:59:59`
      );
      this.updateTransactionConditionAndUpdateTable(
        `${this.fromDate.Year}-${this.fromDate.Month}-${this.fromDate.Date} 0:00:00`, 
        `${this.toDate.Year}-${this.toDate.Month}-${this.toDate.Date} 23:59:59`, 
        0, 
        Number.MAX_SAFE_INTEGER, 
        this.transactionType === '전체' ? '' : this.transactionType
      );
    },
    setInitDate : function () { 
      this.$http.get("/getTransactionFirstDay")
        .then(res => {
          this.startDate = {
            Year: res.data.Year, 
            Month: res.data.Month, 
            Date: res.data.Date
          };
        })
        .catch(err => console.log(err));

      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setDate(today.getDate() - 364);

      this.fromDate = { 
        Year: oneYearAgo.getFullYear(), 
        Month: oneYearAgo.getMonth() + 1, 
        Date: oneYearAgo.getDate()
      };
      this.toDate = {
        Year: today.getFullYear(), 
        Month: today.getMonth() + 1, 
        Date: today.getDate()
      };
      this.endDate = {
        Year: today.getFullYear(), 
        Month: today.getMonth() + 1, 
        Date: today.getDate()
      };
    },
    getTransactionHistoryDataForChart : function () {
      /* Parameter Setting */
      let Transaction = this.transactionType === '전체' ? '' : this.transactionType;
      let DateFrom = `${this.fromDate.Year}-${String(this.fromDate.Month).padStart(2, '0')}-${String(this.fromDate.Date).padStart(2, '0')}`,
          DateTo   = `${this.toDate.Year}-${String(this.toDate.Month).padStart(2, '0')}-${String(this.toDate.Date).padStart(2, '0')}`;
      let [D_From, D_To] = [new Date(DateFrom), new Date(DateTo)];

      if(D_From > D_To) {
        DateFrom = `${this.startDate.Year}-${String(this.startDate.Month).padStart(2, '0')}-${String(this.startDate.Date).padStart(2, '0')}`;
        DateTo   = `${this.endDate.Year}-${String(this.endDate.Month).padStart(2, '0')}-${String(this.endDate.Date).padStart(2, '0')}`;
      }
      
      this.$http.get("/getTransactionHistoryDataForChart", {
          params: { 
            Transaction: Transaction,
            DateFrom   : DateFrom,
            DateTo     : DateTo
          }
        }).then(res => {
          this.data = res.data;
          this.setScatterPlotChart([DateFrom, DateTo], res.data, 'chart-svg');
          this.expenseInTotal = this.data.reduce((sum, elem) => sum + elem.Expense, 0);
        }).catch(err => console.log(err));
    },
    setSelectedPeriod: function(from, to) {
      document.getElementById('period-date-from').value = from;
      document.getElementById('period-date-to').value   = to;
    },
    updateTransactionConditionAndUpdateTable: function(dateFrom, dateTo, expenseMin, expenseMax, transactionType) {
      this.$store.commit("updateTransactionCondition", {
        dateFrom: dateFrom, 
        dateTo: dateTo, 
        expenseMin: expenseMin, 
        expenseMax: expenseMax, 
        transactionType: transactionType
      });

      setTimeout(() => {
        document.getElementById('createTblButton').click();
        document.getElementById('createDetailFrequencyChartButton').click();
        document.getElementById('createDetailAmountChartButton').click();
      }, 100);
    },
    setScatterPlotChart: function (periodArr, data, elementId) {
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
        const xScale = /* x축의 tick 개수는 6개로 고정 */
          d3.scaleUtc()
            .domain([
              new Date(periodArr[0]).setHours(0, 0, 0, 0), 
              new Date(periodArr[1]).setHours(23, 59, 59, 999)
            ])
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
              .selectAll("circle")
              .data(data)
              .join("circle")
              .attr("transform", d => `translate(${xScale(new Date(d["Date"]))},${yScale(d["Expense"])})`)
              .attr("r", 2.2)
              .attr("fill", "none")
              .attr("stroke", d => d["Color"])
              .attr("stroke-width", 1.8);

        const self = this;
        // Brush
        svg.call(
          d3.brush()
            .extent([[margin.Left, margin.Top], [Width-(margin.Right+margin.Left), Height-margin.Bottom]])
            .on("end", function() {
                let selectedArea = d3.brushSelection(this);
                
                if(selectedArea !== null) {
                  let 
                    /* coordinate : Top-Left */
                    dateFrom   = new Date(xScale.invert(selectedArea[0][0])).toLocaleString('ja-JP'),
                    expenseMax = yScale.invert(selectedArea[0][1]),
                    /* coordinate : Bottom-Right */
                    dateTo     = new Date(xScale.invert(selectedArea[1][0])).toLocaleString('ja-JP'),
                    expenseMin = yScale.invert(selectedArea[1][1]);
                    
                  self.setSelectedPeriod(dateFrom.replaceAll('/', '.'), dateTo.replaceAll('/', '.'));
                  self.updateTransactionConditionAndUpdateTable(
                    dateFrom.replaceAll('/', '-'), 
                    dateTo.replaceAll('/', '-'), 
                    expenseMin, 
                    expenseMax, 
                    self.transactionType === '전체' ? '' : self.transactionType
                  );
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
  @import "@/assets/css/components/MainDashboard/ExpenseComponent/Components/Chart.scss";
</style>