<template>
  <div ref="chartContainer2"></div>
</template>

<script>
export default {
  name: 'AreaChart',
  data() {
    return {
      data: [
        { date: '2024-01-01', beforeTax: 5.2, afterTax: 4.1 },
        { date: '2024-02-01', beforeTax: 5.5, afterTax: 4.3 },
        { date: '2024-03-01', beforeTax: 6.0, afterTax: 4.8 },
        { date: '2024-04-01', beforeTax: 5.7, afterTax: 4.4 },
        { date: '2024-05-01', beforeTax: 5.9, afterTax: 4.6 }
      ]
    }
  },
  mounted() {
    const margin = { top: 30, right: 30, bottom: 30, left: 50 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const parsedData = this.data.map(d => ({
      date: d3.timeParse('%Y-%m-%d')(d.date),
      beforeTax: d.beforeTax,
      afterTax: d.afterTax
    }))

    const svg = d3.select(this.$refs.chartContainer2)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleTime()
      .domain(d3.extent(parsedData, d => d.date))
      .range([0, width])

    const y = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.beforeTax)])
      .range([height, 0])

    const areaBefore = d3.area()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.beforeTax))
      .curve(d3.curveMonotoneX)

    const areaAfter = d3.area()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.afterTax))
      .curve(d3.curveMonotoneX)

    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'steelblue')
      .attr('opacity', 0.5)
      .attr('d', areaBefore)

    svg.append('path')
      .datum(parsedData)
      .attr('fill', 'seagreen')
      .attr('opacity', 0.5)
      .attr('d', areaAfter)

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%b %Y')))

    svg.append('g')
      .call(d3.axisLeft(y))

    // Legend
    svg.append('text')
      .attr('x', width - 100)
      .attr('y', 20)
      .style('fill', 'steelblue')
      .text('Before Tax')

    svg.append('text')
      .attr('x', width - 100)
      .attr('y', 40)
      .style('fill', 'seagreen')
      .text('After Tax')
  }
}
</script>

<style scoped>
/* Optional chart styling */
</style>
