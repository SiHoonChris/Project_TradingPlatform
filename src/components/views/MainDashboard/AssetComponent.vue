<template>
  <div id="asset-component">
    <p id="period-setter-candle">
      <input
        v-for="p in ['Y', 'Q', 'M', 'W']"
        :key="p"
        type="button"
        :value="p"
        @click="this.getAssetSizeGrowthData(p)"
      >
    </p>
    <div id="asset-size-chart">
      <div :id="chartPart"></div>
      <div id="tooltip" class="tooltip" style="position: absolute; opacity: 0;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        chartPart: 'candle-chart-area'
      }
    },
    mounted() {
      this.getAssetSizeGrowthData('M');
    },
    methods: {
      getAssetSizeGrowthData : function (p) {
        this.$http.get("/getAssetSizeGrowthData", {
          params: { Period: p }
        }).then(
          res => this.createAssetSizeCandleChart(res.data)
        ).catch(err => console.log(err));
      },
      createAssetSizeCandleChart : function (DATA) {
        const margin = { top: 0, right: 40, bottom: 50, left: 0 };
        const width  = document.getElementById(this.chartPart).offsetWidth - margin.left - margin.right;
        const height = document.getElementById(this.chartPart).offsetHeight - margin.top - margin.bottom;

        const svgContainer = d3.select(`#${this.chartPart}`);
        svgContainer.selectAll("*").remove(); // 기존 차트 제거

        const svg = svgContainer.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
          .domain(DATA.map(d => d.date))
          .range([0, width])
          .padding(0.3);

        const y = d3.scaleLinear()
          .domain([
            d3.min(DATA, d => d.low) * 0.98,
            d3.max(DATA, d => d.high) * 1.02
          ])
          .range([height, 0]);

        svg.append("g") // X축 배경선
          .attr("class", "grid-x")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .attr("stroke-opacity", 0.5);

        svg.append("g") // Y축 배경선
          .attr("class", "grid-y")
          .call(d3.axisLeft(y).ticks(4).tickSize(-width).tickFormat(""))
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .attr("stroke-opacity", 0.5);

        svg.append("g") // X축
          .attr("transform", `translate(0,${height})`)
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")));

        svg.append("g") // Y축
          .attr("class", "y-axis")
          .attr("transform", `translate(${width},0)`)
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .call(d3.axisRight(y).ticks(4));

        svg.selectAll("line.stem") // 꼬리 (wick)
          .data(DATA)
          .enter()
          .append("line")
          .attr("class", "stem")
          .attr("x1", d => x(d.date) + x.bandwidth() / 2)
          .attr("x2", d => x(d.date) + x.bandwidth() / 2)
          .attr("y1", d => y(d.high))
          .attr("y2", d => y(d.low))
          .attr("stroke", d => d.close > d.open ? "green" : "red")
          .attr("stroke-width", 2);

        const tooltip = d3.select("#tooltip");
        
        svg.selectAll("rect.candle") // 몸통 (candle body)
          .data(DATA)
          .enter()
          .append("rect")
          .attr("class", "candle")
          .attr("x", d => x(d.date))
          .attr("y", d => y(Math.max(d.open, d.close)))
          .attr("width", x.bandwidth())
          .attr("height", d => Math.max(1, Math.abs(y(d.open) - y(d.close))))
          .attr("fill", d => d.close > d.open ? "green" : "red")
          .on("mouseover", function (event, d) {
            tooltip
              .style("opacity", 1)
              .html(`
                <strong>${d3.timeFormat("%Y-%m-%d")(d.date)}</strong><br>
                Open: ${d.open}<br>
                High: ${d.high}<br>
                Low: ${d.low}<br>
                Close: ${d.close}
              `);
          })
          .on("mousemove", function (event) {
            tooltip
              .style("left", (event.pageX + 8) + "px")
              .style("top", (event.pageY - 54) + "px");
          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/AssetComponent.scss";
</style>
