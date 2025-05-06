<template>
  <div :id="chartId" class="pl-chart"></div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { date: '2024-01-01', beforeExpense: 5320543.27, afterExpense: 3021861.45 },
        { date: '2024-02-01', beforeExpense: 1726599.13, afterExpense: -543247.61 },
        { date: '2024-03-01', beforeExpense: 359183.92, afterExpense: -1644238.27 },
        { date: '2024-04-01', beforeExpense: -65217.34, afterExpense: 5162003.77 },
        { date: '2024-05-01', beforeExpense: 256733.56, afterExpense: 1099287.91 },
        { date: '2024-06-01', beforeExpense: -1719936.42, afterExpense: -178894.83 },
        { date: '2024-07-01', beforeExpense: 2958280.58, afterExpense: 4930067.48 },
        { date: '2024-08-01', beforeExpense: 5567488.94, afterExpense: -934058.25 },
        { date: '2024-09-01', beforeExpense: -1765099.12, afterExpense: 1679286.73 },
        { date: '2024-10-01', beforeExpense: 4100348.73, afterExpense: 5923001.15 },
        { date: '2024-11-01', beforeExpense: -55304.36, afterExpense: 3035987.21 },
        { date: '2024-12-01', beforeExpense: 1698423.98, afterExpense: -1928820.55 }
      ],
      chartId: 'profit-plus-loss'
    }
  },
  mounted() {
    this.createAreaChartOfProfitPlusLoss(this.data, this.chartId);
  },
  methods: {
    createAreaChartOfProfitPlusLoss : function (data, elementId) {
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

      const yMin = Math.min(0, d3.min(parsedData, d => Math.min(d.beforeExpense, d.afterExpense))) * 1.1;
      const yMax = Math.max(0, d3.max(parsedData, d => Math.max(d.beforeExpense, d.afterExpense))) * 1.1;

      const y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([H, 0]);

      const areaBefore = d3.area()
        .x(d => x(d.date))
        .y0(d => y(0))
        .y1(d => y(d.beforeExpense))
        .curve(d3.curveMonotoneX);

      const areaAfter = d3.area()
        .x(d => x(d.date))
        .y0(d => y(0))
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
        .call(d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%Y.%m')));

      svg.append('g')
        .attr('color', '#333232')
        .attr('stroke', '#b8b8b8')
        .call(
          d3.axisLeft(y)
            .ticks(5)
            .tickFormat(d => {
              const format = n => Number.isInteger(n) ? n : n.toFixed(2);
              if (Math.abs(d) >= 1_000_000_000) return format(d / 1_000_000_000) + 'B';
              if (Math.abs(d) >= 1_000_000) return format(d / 1_000_000) + 'M';
              if (Math.abs(d) >= 1_000) return format(d / 1_000) + 'T';
              return format(d);
            })
        );

      svg.append("line")
        .attr("x1", 0)
        .attr("x2", W)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", "#b8b8b8")
        .attr("opacity", 0.4);
    }
  }
}
</script>

<style scoped>
  @import "@/assets/css/ProfitLoss/Components/Chart/CommonStyleForPLCharts.scss";
</style>
