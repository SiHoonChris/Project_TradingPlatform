<template>
  <div id="expense-frequency-chart">
    <button id="createDetailFrequencyChartButton" style="display: none;" @click="getTransactionHistoryDataForDetailFrequencyChart()"></button>
    <div :id="chartPart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data : [],
      chartPart: 'detail-frequency-chart'
    }
  },
  methods: {
    getTransactionHistoryDataForDetailFrequencyChart : function () {
      this.$http.get("/getTransactionHistoryDataForDetailFrequencyChart", {
          params: { 
            ExpenseMin : this.$store.state.expenseMin,
            ExpenseMax : this.$store.state.expenseMax,
            DateFrom   : this.$store.state.dateFrom,
            DateTo     : this.$store.state.dateTo
          }
        }).then(res => {
          this.data = [];

          if(res.data.length !== 0) {
            const transformedData = Object.entries(res.data[0]).map(([type, value]) => ({type, value}));

            switch (this.$store.state.transactionType) { // filter
              case '매수': this.data = transformedData.filter(e => e.type === '매수'); break;
              case '매도': this.data = transformedData.filter(e => e.type === '매도'); break;
              case '입금': this.data = transformedData.filter(e => e.type === '입금'); break;
              case '출금': this.data = transformedData.filter(e => e.type === '출금'); break;
              case '배당': this.data = transformedData.filter(e => e.type === '배당'); break;
              case '매매': this.data = transformedData.filter(e => ['매수', '매도'].includes(e.type)); break;
              case '입출금': this.data = transformedData.filter(e => ['입금', '출금'].includes(e.type)); break;
              default: this.data = transformedData;
            }
          }
        }).then(done => {
          // 0. Remove Previous Chart
          const PreviousChart = document.querySelector(`#${this.chartPart} svg`);
          if (PreviousChart) { PreviousChart.remove(); }

          // 1. Create New Chart
          const Width  = document.getElementById(this.chartPart).offsetWidth,
                Height = document.getElementById(this.chartPart).offsetHeight,
                Margin = { top: 16, right: 12, bottom: 18, left: 24 };

          const svg = d3.select('#'+this.chartPart)
                        .append("svg")
                        .attr("width", Width)
                        .attr("height", Height)
                        .append("g")
                        .attr("transform", `translate(${Margin.left / 2}, ${Height * 0})`);

          const xAxis = d3.scaleBand()
                          .domain(this.data.map(d => d.type))
                          .range([Margin.left, Width - Margin.right])
                          .padding(0.1);

          const yAxis = d3.scaleLinear()
                          .domain([0, d3.max(this.data, d => d.value * 1.2)])
                          .nice()
                          .range([Height - Margin.bottom, Margin.top]);

          // Remove previous tooltip if exists
          d3.selectAll(".frequency-chart-tooltip").remove();
          // Create tooltip element (only once)
          const tooltip = d3.select("body")
            .append("div")
            .attr("class", "frequency-chart-tooltip")
            .style("position", "absolute")
            .style("background", "#333")
            .style("color", "#fff")
            .style("padding", "6px 10px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("font-family", "Tahoma")
            .style("pointer-events", "none")
            .style("opacity", 0);

          svg.selectAll(".bar") // Draw the bars
              .data(this.data)
              .join("rect")
              .attr("fill", 'red')
              .attr("fill", d => {
                if (d.type === '매수') return "#106ec8";
                else if (d.type === '매도') return "#049bd9";
                else if (d.type === '입금') return "#09d0dc";
                else if (d.type === '출금') return "#14dea5";
                else if (d.type === '배당') return "#7ecc66";
              })
              .attr("class", "bar")
              .attr("x", d => xAxis(d.type))
              .attr("y", d => yAxis(d.value))
              .attr("width", xAxis.bandwidth()*0.75)
              .attr("height", d => yAxis(0) - yAxis(d.value))
              .attr("transform", `translate(${xAxis.bandwidth()*0.125},0)`)
              .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("opacity", 0.95);
                tooltip.html(new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(d.value));
              })
              .on("mousemove", event => {
                tooltip
                  .style("left", (event.pageX + 10) + "px")
                  .style("top", (event.pageY - 28) + "px");
              })
              .on("mouseout", () => {
                tooltip.transition().duration(300).style("opacity", 0);
              });

          svg.selectAll(".hit-area") // Add invisible hit areas for better tooltip interaction
            .data(this.data)
            .join("rect")
            .attr("class", "hit-area")
            .attr("x", d => xAxis(d.type))
            .attr("y", d => {
              const barTop = yAxis(d.value);
              const paddedTop = Math.max(barTop - 12, Margin.top); // 16px 위까지 허용
              return paddedTop;
            })
            .attr("width", xAxis.bandwidth())
            .attr("height", d => {
              const barBottom = yAxis(0);
              const barTop = yAxis(d.value);
              const height = barBottom - barTop;
              return Math.max(height + 12, 20); // 최소 높이 설정
            })
            .attr("fill", "transparent")
            .on("mouseover", (event, d) => {
              tooltip.transition().duration(200).style("opacity", 0.95);
              tooltip.html(new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(d.value));
            })
            .on("mousemove", event => {
              tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
              tooltip.transition().duration(300).style("opacity", 0);
            });

          svg.append("g") // Add the x-axis
              .attr("transform", `translate(0,${Height - Margin.bottom})`)
              .call(d3.axisBottom(xAxis))
              .attr("class", "x-axis")
              .selectAll("text")
              .attr("font-family", "Tahoma")
              .attr("fill", "#e2e2e2")
              .attr("opacity", 0.9);

          svg.append("g") // Add the y-axis
              .attr("transform", `translate(${Margin.left},0)`)
              .call(
                d3.axisLeft(yAxis)
                  .ticks(3)
                  .tickFormat(d => {
                    if      (d >= 1000000000) return (d / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
                    else if (d >= 1000000) return (d / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
                    else if (d >= 1000) return (d / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
                    else return d;
                  })
              )
              .attr("class", "y-axis")
              .selectAll("text")
              .attr("fill", "#e2e2e2")
              .attr("opacity", 0.9);

          // Change axis lines and tick colors to white
          svg.selectAll(".x-axis path, .x-axis .tick line, .y-axis path, .y-axis .tick line")
             .attr("stroke", "#e2e2e2")
             .attr("opacity", 0.6);
        }).catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/ExpenseComponent/DetailChart/DetailFrequencyChart.scss";
</style>