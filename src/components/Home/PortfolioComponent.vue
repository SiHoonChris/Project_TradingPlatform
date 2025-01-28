<template>
  <div id="component-portfolio">
    <div :id="portfolioPart">
      <div id="chart-display"></div>
      <div id="chart-detail">
        <table>
          <tbody>
            <tr>
              <td>Total Invested, KRW</td>
              <td id="total-invested">{{(123224563).toLocaleString()}}</td>
            </tr>
            <tr>
              <td>Number of assets</td>
              <td id="number-of-assets">{{this.data.length}}</td>
            </tr>
            <tr>
              <td>Yield Rate, %</td>
              <td id="yield-rate">{{(123.123426).toFixed(4)}}</td>
            </tr>
            <tr>
              <td>Expected Dividend Rate, %</td>
              <td id="expected-divident-rate">{{(123.123426).toFixed(4)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div :id="informationPart">
      <div id="portfolio-title" style="border-bottom: 1px solid #333333;">
        <p>In-portfolio</p>
      </div>
      <ul id="portfolio-list">
        <li v-for="(element, idx) in data" :key="idx">
          <p>
            <span @click="this.$moveToChartPage_Click(element.name)">{{element.name}}</span>
            <span>{{((element.price * element.amount) / this.totalValue * 100).toFixed(2)}}%</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        portfolioPart: 'portfolio-chart',
        informationPart: 'portfolio-information',
        data: [],
        totalValue: 0
      }
    },
    mounted () {
      this.data = [
        {name:'AAPL', price:100, amount:10},
        {name:'TSLA', price:103, amount:12},
        {name:'CRM', price:90, amount:18},
        {name:'LLY', price:160, amount:38},
        {name:'NVDA', price:130, amount:24},
        {name:'MSFT', price:104, amount:16},
        {name:'GOOGL', price:100, amount:456},
        {name:'PG', price:111, amount:10},
        {name:'XOM', price:104, amount:54},
        {name:'META', price:101, amount:123},
        {name:'005930', price:190, amount:13},
        {name:'AAPLa', price:163, amount:70},
        {name:'TSLAa', price:160, amount:10},
        {name:'CRMa', price:10, amount:18},
        {name:'LLYa', price:750, amount:10},
        {name:'NVDAa', price:10, amount:19},
        {name:'MSFTa', price:132, amount:10},
        {name:'GOOGLa', price:10, amount:54},
        {name:'PGa', price:230, amount:2},
        {name:'XOMa', price:104, amount:23},
        {name:'METAa', price:130, amount:31},
        {name:'005930a', price:40, amount:23}
      ];
      this.totalValue = this.data.reduce((sum, element) => sum + element.price * element.amount, 0);
      this.setPortfolioChart(this.data, `#${this.portfolioPart} > #chart-display`);
    },
    methods: {
      setPortfolioChart: function(data, container) {
        const WIDTH = document.querySelector(container).offsetWidth;
        const HEIGHT = document.querySelector(container).offsetWidth;
        const MARGIN = WIDTH * 0.05;
        const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;

        const Color_Palette = ["#233253", "#7fa224", "#ff1595", "#0673c5", "#c8bdb9", "#f6f5fa"];

        // Transform the data
        const transformedData = data.map(item => ({
          name: item.name,
          total: item.price * item.amount
        }));

        // Extend the color palette if needed
        while (Color_Palette.length < transformedData.length) {
          Color_Palette.push(...Color_Palette);
        }

        const color = d3.scaleOrdinal().domain(transformedData.map(d => d.name)).range(Color_Palette);

        // Remove previous chart if it exists
        if (document.querySelector(`${container} > svg`)) {
          document.querySelector(`${container} > svg`).remove();
        }

        const svg = d3
          .select(container)
          .append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT)
          .append("g")
          .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

        const pie = d3.pie().value(d => d.total); // Use the `total` field for pie slices
        const dataReady = pie(transformedData);

        const arc = d3.arc().innerRadius(MARGIN * 4).outerRadius(RADIUS);

        // Draw the chart
        svg
          .selectAll("path")
          .data(dataReady)
          .enter()
          .append("path")
          .attr("class", "mainChart_Portion")
          .attr("d", arc)
          .attr("fill", d => color(d.data.name)) // Use `d.data.name` for color
          .attr("stroke", "#171a1e")
          .style("stroke-width", "1px")
          .transition()
          .duration(1400)
          .attrTween("d", function(d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
              return arc(interpolate(t));
            };
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Portfolio.scss";
</style>
