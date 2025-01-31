<template>
  <div id="component-portfolio">
    <div :id="portfolioPart">
      <div id="chart-display"></div>
      <div id="chart-detail">
        <table>
          <tbody>
            <tr>
              <td>Total Invested, KRW</td>
              <td id="total-invested">{{(Math.floor(this.totalPurchased)).toLocaleString()}}</td>
            </tr>
            <tr>
              <td>Number of assets</td>
              <td id="number-of-assets">{{this.portfolioData.length}}</td>
            </tr>
            <tr>
              <td>Yield Rate, %</td>
              <td id="yield-rate">{{((this.totalValued - this.totalPurchased) / this.totalPurchased * 100).toFixed(4)}}</td>
            </tr>
            <tr>
              <td>Expected Dividend Rate, %</td>
              <td id="expected-divident-rate">{{(3.123426).toFixed(4)}}</td>
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
        <li v-for="(elem, idx) in portfolioData" :key="idx">
          <p>
            <span @click="this.$moveToChartPage_Click(elem.ticker)">{{elem.ticker}}</span>
            <span>{{(elem.valued / this.totalValued * 100).toFixed(2)}}%</span>
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
        portfolioData: [],
        totalPurchased: 0,
        totalValued: 0
      }
    },
    mounted () {
      this.$http.get("/getPortfolioData")
        .then(
          res => {
            this.portfolioData = res.data;
            this.portfolioData.sort((a, b) => (b.valued) - (a.valued));
            this.totalPurchased = this.portfolioData.reduce((sum, elem) => sum + elem.purchased, 0);
            this.totalValued = this.portfolioData.reduce((sum, elem) => sum + elem.valued, 0);
          }
        ).then(
          done => this.setPortfolioChart(this.portfolioData, `#${this.portfolioPart} > #chart-display`)
        ).catch(
          err => console.log(err)
        );
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
          data.sort((a, b) => b.valued - a.valued);

        // Extract top 8 assets
        let topAssets = sortedData.slice(0, 9);

        // Sum remaining assets into "Others"
        let othersValued = sortedData.slice(9).reduce((sum, item) => sum + item.valued, 0);
        
        // Add "Others" as the last element if necessary
        if (sortedData.length > 10) {
          topAssets.push({ ticker: "Others", valued: othersValued });
        }

        // Ensure "Others" is always last in the chart order
        const pie = d3.pie()
          .sort(null)  // Disable automatic sorting
          .value(d => d.valued);

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
          .attr("class", "portion")
          .attr("d", arc)
          .attr("fill", d => color(d.data.ticker))
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
        svg.selectAll(".portion")
          .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1);
            d3.select(this).style("opacity", 0.7);
          })
          .on("mousemove", function(event, d) {
            tooltip
              .html(d.data.ticker)
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
