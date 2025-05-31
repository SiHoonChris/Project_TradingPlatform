<template>
  <div :id="chartId" class="pl-chart"></div>
</template>

<script>
export default {
  data() {
    return {
      data: [ // beforeExpense : 매도 합계 + 배당 수익 + 이자 수익 
        { date: '2024-01-01', beforeExpense: 2010584.52, afterExpense: 1376984.13 },
        { date: '2024-02-01', beforeExpense: 5983149.38, afterExpense: 4562023.17 },
        { date: '2024-03-01', beforeExpense: 3958204.26, afterExpense: 2579132.09 },
        { date: '2024-04-01', beforeExpense: 1558207.49, afterExpense: 820304.77 },
        { date: '2024-05-01', beforeExpense: 282913.86, afterExpense: 129054.12 },
        { date: '2024-06-01', beforeExpense: 3850376.73, afterExpense: 2983056.45 },
        { date: '2024-07-01', beforeExpense: 5793842.94, afterExpense: 4738923.81 },
        { date: '2024-08-01', beforeExpense: 948328.00, afterExpense: 603874.88 },
        { date: '2024-09-01', beforeExpense: 2283842.65, afterExpense: 1172042.53 },
        { date: '2024-10-01', beforeExpense: 1347523.33, afterExpense: 872031.77 },
        { date: '2024-11-01', beforeExpense: 4938752.46, afterExpense: 3302851.13 },
        { date: '2024-12-01', beforeExpense: 3672143.58, afterExpense: 2145394.96 }
      ],
      chartId: 'profit-only'
    }
  },
  mounted() {
    this.createAreaChartOfProfit(this.data, this.chartId);
  },
  methods: {
    createAreaChartOfProfit : function (data, elementId) {
      if(document.getElementById(elementId).hasChildNodes()){
        document.getElementById(elementId).querySelector("svg").remove();
      }

      const M = // Margin
        { T: 20, R: 25, B: 35, L: 45 }; // Top - Right - Bottom - Left
      const W  = // Width
        window.getComputedStyle(document.getElementById(elementId)).width.replace('px', '') - M.L - M.R;
      const H = // Height
        window.getComputedStyle(document.getElementById(elementId)).height.replace('px', '') - M.T - M.B;

      const parsedData = data.map(d => ({
        date: d3.timeParse('%Y-%m-%d')(d.date),
        beforeExpense: d.beforeExpense,
        afterExpense: d.afterExpense
      }));

      const svg = d3.select('#'+elementId)
        .append('svg')
        .attr('width', W + M.L + M.R)
        .attr('height', H + M.T + M.B)
        .append('g')
        .attr('transform', `translate(${M.L}, ${M.T})`);

      const x = d3.scaleTime()
        .domain(d3.extent(parsedData, d => d.date))
        .range([0, W]);

      const y = d3.scaleLinear()
        .domain([
          0,
          d3.max(parsedData, d => Math.max(d.beforeExpense, d.afterExpense)) * 1.14
        ])
        .range([H, 0]);

      const areaBefore = d3.area()
        .x(d => x(d.date))
        .y0(H)
        .y1(d => y(d.beforeExpense))
        .curve(d3.curveMonotoneX);

      const areaAfter = d3.area()
        .x(d => x(d.date))
        .y0(H)
        .y1(d => y(d.afterExpense))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(parsedData)
        .attr('fill', 'steelblue')
        .attr('opacity', 0.5)
        .attr('d', areaBefore);

      svg.append('path')
        .datum(parsedData)
        .attr('fill', 'seagreen')
        .attr('opacity', 0.5)
        .attr('d', areaAfter);

      svg.append('g')
        .attr('transform', `translate(0, ${H})`)
        .attr('color', '#333232')
        .attr("stroke", "#b8b8b8")
        .call(d3.axisBottom(x).ticks(3).tickFormat(d3.timeFormat('%Y.%m')));

      svg.append('g')
        .attr('color', '#333232')
        .attr('stroke', '#b8b8b8')
        .call(
          d3.axisLeft(y)
            .ticks(4)
            .tickFormat(d => {
              const format = n => Number.isInteger(n) ? n : n.toFixed(2);
              if (Math.abs(d) >= 1_000_000_000) return format(d / 1_000_000_000) + 'B';
              if (Math.abs(d) >= 1_000_000) return format(d / 1_000_000) + 'M';
              if (Math.abs(d) >= 1_000) return format(d / 1_000) + 'T';
              return format(d);
            })
        );
    }
  }
}
</script>

<style scoped>
  @import "@/assets/css/ProfitLoss/Components/Chart/CommonStyleForPLCharts.scss";
</style>
