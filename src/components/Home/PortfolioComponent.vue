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
      // 보유종목 테이블에서 불러오기
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

      this.data.sort((a, b) => (b.price * b.amount) - (a.price * a.amount));

      this.totalValue = this.data.reduce((sum, element) => sum + element.price * element.amount, 0);
      this.setPortfolioChart(this.data, `#${this.portfolioPart} > #chart-display`);
    },
    methods: {
      setPortfolioChart: function(data, container) {
        const WIDTH  = document.querySelector(container).offsetWidth;
        const HEIGHT = document.querySelector(container).offsetWidth;
        const MARGIN = WIDTH * 0.05;
        const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;

        const Color_Palette = [
          "#19234c", "#920e0c", "#f2edfa", "#286096", "#e9be3b", 
          "#dbc3d7", "#f92f10", "#b4dff4", "#0aaf3f", "#9e7dd6"
        ];

        // Sort data by total value (desc)
        let sortedData = 
          data.map(item => ({
            name: item.name,
            total: item.price * item.amount
          }))
          .sort((a, b) => b.total - a.total);

        // Extract top 8 assets
        let topAssets = sortedData.slice(0, 9);

        // Sum remaining assets into "Others"
        let otherTotal = sortedData.slice(9).reduce((sum, item) => sum + item.total, 0);
        
        // Add "Others" as the last element if necessary
        if (sortedData.length > 10) {
          topAssets.push({ name: "Others", total: otherTotal });
        }

        // Ensure "Others" is always last in the chart order
        const pie = d3.pie()
          .sort(null)  // Disable automatic sorting
          .value(d => d.total);

        const color = d3.scaleOrdinal().domain(topAssets.map(d => d.name)).range(Color_Palette);

        // Remove previous chart
        if (document.querySelector(`${container} > svg`)) {
          document.querySelector(`${container} > svg`).remove();
        }

        // Create SVG container
        const svg = d3
          .select(container)
          .append("svg")
          .attr("width", WIDTH)
          .attr("height", HEIGHT)
          .append("g")
          .attr("transform", `translate(${WIDTH / 2}, ${HEIGHT / 2})`);

        const dataReady = pie(topAssets);
        const arc = d3.arc().innerRadius(MARGIN * 4).outerRadius(RADIUS);

        // Tooltip
        const tooltip = d3.select(container)
          .append("div")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.7)")
          .style("color", "#fff")
          .style("padding", "6px 12px")
          .style("border", "1px solid #fff")
          .style("border-radius", "5px")
          .style("font-size", "12px")
          .style("font-family", "Tahoma")
          .style("pointer-events", "none")
          .style("opacity", 0);

        // Draw the chart
        svg
          .selectAll("path")
          .data(dataReady)
          .enter()
          .append("path")
          .attr("class", "mainChart_Portion")
          .attr("d", arc)
          .attr("fill", d => color(d.data.name))
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

        // Tooltip Events
        svg.selectAll(".mainChart_Portion")
          .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1);
            d3.select(this).style("opacity", 0.7);
          })
          .on("mousemove", function(event, d) {
            tooltip
              .html(d.data.name)
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 20}px`);
          })
          .on("mouseout", function() {
            tooltip.style("opacity", 0);
            d3.select(this).style("opacity", 1);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Portfolio.scss";
</style>
