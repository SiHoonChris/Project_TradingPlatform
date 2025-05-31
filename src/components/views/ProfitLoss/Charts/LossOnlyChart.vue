<template>
  <div :id="chartId" class="pl-chart"></div>
</template>

<script>
export default {
  data() {
    return {
      data: [ // beforeExpense : 매수 합계 
        { date: '2024-01-01', beforeExpense: -183209.42, afterExpense: -127305.67 },
        { date: '2024-02-01', beforeExpense: -1792032.85, afterExpense: -1283723.11 },
        { date: '2024-03-01', beforeExpense: -1293482.19, afterExpense: -832193.87 },
        { date: '2024-04-01', beforeExpense: -594832.45, afterExpense: -302184.33 },
        { date: '2024-05-01', beforeExpense: -923845.76, afterExpense: -671392.40 },
        { date: '2024-06-01', beforeExpense: -1748320.03, afterExpense: -1329038.72 },
        { date: '2024-07-01', beforeExpense: -1348293.88, afterExpense: -1093823.55 },
        { date: '2024-08-01', beforeExpense: -213847.30, afterExpense: -98213.76 },
        { date: '2024-09-01', beforeExpense: -1652839.67, afterExpense: -1139201.29 },
        { date: '2024-10-01', beforeExpense: -1203948.22, afterExpense: -732194.03 },
        { date: '2024-11-01', beforeExpense: -584738.59, afterExpense: -329382.18 },
        { date: '2024-12-01', beforeExpense: -1482739.46, afterExpense: -1029384.17 }
      ],
      chartId: 'loss-only'
    }
  },
  mounted() {
    this.createAreaChartOfLoss(this.data, this.chartId);
  },
  methods: {
    createAreaChartOfLoss(data, elementId) {
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

      const svg = d3.select('#' + elementId)
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
          d3.min(parsedData, d => Math.min(d.beforeExpense, d.afterExpense)) * 1.14,
          0
        ])
        .range([H, 0]);

      const areaBefore = d3.area()
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.beforeExpense))
        .curve(d3.curveMonotoneX);

      const areaAfter = d3.area()
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.afterExpense))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(parsedData)
        .attr('fill', 'indianred')
        .attr('opacity', 0.6)
        .attr('d', areaBefore);

      svg.append('path')
        .datum(parsedData)
        .attr('fill', 'salmon')
        .attr('opacity', 0.6)
        .attr('d', areaAfter);

      svg.append('g')
        .attr('transform', `translate(0, 0)`)
        .attr('color', '#333')
        .attr("stroke", "#b8b8b8")
        .call(d3.axisTop(x).ticks(3).tickFormat(d3.timeFormat('%Y.%m')));

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
