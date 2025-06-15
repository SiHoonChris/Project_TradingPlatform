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
          res => ['Y', 'Q'].includes(p) ? 
            this.createAssetSizeCandleChart(res.data, p) : this.createAssetSizeLineChart(res.data)
        ).catch(err => console.log(err));
      },
      createAssetSizeCandleChart : function (DATA, PERIOD) {
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

        const yMin = d3.min(DATA, d => d.low);
        const yMax = d3.max(DATA, d => d.high);
        const yMarginRatio = 0.05; // 5% 여유

        const y = d3.scaleLinear()
          .domain([
            yMin - (yMax - yMin) * yMarginRatio,
            yMax + (yMax - yMin) * yMarginRatio
          ])
          .range([height, 0]);

        let tickValues = [];

        if (PERIOD === 'Y') {
          tickValues = DATA.map(d => d.date); // 전체 날짜
        } else {
          const interval = Math.ceil(DATA.length / 5);
          tickValues = DATA.map((d, i) => (i % interval === 0 ? d.date : null)).filter(d => d);
        }

        svg.append("g") // X축 배경선
          .attr("class", "grid-x")
          .attr("transform", `translate(0,${height})`)
          .call(
            d3.axisBottom(x)
              .tickValues(tickValues)
              .tickSize(-height)
              .tickFormat("")
          )
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .attr("stroke-opacity", 0.5);

        svg.append("g") // X축
          .attr("transform", `translate(0,${height})`)
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .call(
            d3.axisBottom(x)
              .tickValues(tickValues)
        );

        svg.append("g") // Y축
          .attr("class", "y-axis")
          .attr("transform", `translate(${width},0)`)
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .call(d3.axisRight(y).ticks(4).tickFormat(d => `${d / 1000000}M`));

        svg.append("g") // Y축 배경선
          .attr("class", "grid-y")
          .call(d3.axisLeft(y).ticks(4).tickSize(-width).tickFormat(""))
          .attr('color', '#333232')
          .attr("stroke", "#b8b8b8")
          .attr("stroke-opacity", 0.5);

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
        const formatNumber = d3.format(",");  // Adds commas

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
                <strong>${d.date}</strong><br>
                <table style="font-size: 12px; margin-top: 4px;">
                  <tr><td style="padding-right: 4px;">Open:</td><td style="text-align: right;">${formatNumber(d.open)}</td></tr>
                  <tr><td style="padding-right: 4px;">High:</td><td style="text-align: right;">${formatNumber(d.high)}</td></tr>
                  <tr><td style="padding-right: 4px;">Low:</td><td style="text-align: right;">${formatNumber(d.low)}</td></tr>
                  <tr><td style="padding-right: 4px;">Close:</td><td style="text-align: right;">${formatNumber(d.close)}</td></tr>
                </table>
              `);
          })
          .on("mousemove", function (event) {
            const chartRect = document.getElementById("asset-size-chart").getBoundingClientRect();
            const cursorX = event.clientX;
            const tooltipWidth = 154;
            const tooltipOffset = 8;

            let tooltipLeft;

            if (cursorX > chartRect.left + chartRect.width / 2) {
              tooltipLeft = event.pageX - tooltipWidth + 3 * tooltipOffset;
            } else {
              tooltipLeft = event.pageX + tooltipOffset;
            }

            tooltip
              .style("left", tooltipLeft + "px")
              .style("top", (event.pageY - 72) + "px");
          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
          });
      },
      createAssetSizeLineChart: function (DATA, PERIOD) {
        const margin = { top: 0, right: 40, bottom: 50, left: 0 };
        const width = document.getElementById(this.chartPart).offsetWidth - margin.left - margin.right;
        const height = document.getElementById(this.chartPart).offsetHeight - margin.top - margin.bottom;

        const svgContainer = d3.select(`#${this.chartPart}`);
        svgContainer.selectAll("*").remove();

        const svg = svgContainer.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint()
          .domain(DATA.map(d => d.date))
          .range([0, width])
          .padding(0.3);

        const yMin = d3.min(DATA, d => d.close);
        const yMax = d3.max(DATA, d => d.close);
        const yMarginRatio = 0.05;

        const y = d3.scaleLinear()
          .domain([
            yMin - (yMax - yMin) * yMarginRatio,
            yMax + (yMax - yMin) * yMarginRatio
          ])
          .range([height, 0]);

        // Area under the line
        const area = d3.area()
          .x(d => x(d.date))
          .y0(height)
          .y1(d => y(d.close));

        // Line path
        const line = d3.line()
          .x(d => x(d.date))
          .y(d => y(d.close));

        // Add area
        svg.append("path")
          .datum(DATA)
          .attr("fill", "rgba(100, 149, 237, 0.14)")
          .attr("d", area);

        // Add line
        svg.append("path")
          .datum(DATA)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.6)
          .attr("d", line);

        // X axis
        const tickValues = (() => {
          if (PERIOD === 'Y') return DATA.map(d => d.date);
          const interval = Math.ceil(DATA.length / 5);
          return DATA.map((d, i) => (i % interval === 0 ? d.date : null)).filter(d => d);
        })();

        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x).tickValues(tickValues))
          .attr("stroke", "#b8b8b8")
          .attr("color", "#333232");

        // Y axis
        svg.append("g")
          .attr("transform", `translate(${width},0)`)
          .call(d3.axisRight(y).ticks(4).tickFormat(d => `${d / 1000000}M`))
          .attr("stroke", "#b8b8b8")
          .attr("color", "#333232");

        // Add left vertical border line
        svg.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", height)
          .attr("stroke", "#b8b8b8")
          .attr("stroke-width", 1)
          .attr("opacity", 0.2);

        // Add top horizontal border line
        svg.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", width)
          .attr("y2", 0)
          .attr("stroke", "#b8b8b8")
          .attr("stroke-width", 1)
          .attr("opacity", 0.2);

        // Crosshair lines
        const crosshairLine = svg.append("line")
          .attr("stroke", "gray")
          .attr("stroke-width", 1)
          .attr("y1", 0)
          .attr("y2", height)
          .style("opacity", 0);

        const horizontalLine = svg.append("line")
          .attr("stroke", "gray")
          .attr("stroke-width", 1)
          .attr("x1", 0)
          .attr("x2", width)
          .style("opacity", 0);

        // Circle indicator
        const focusCircle = svg.append("circle")
          .attr("r", 3.6)
          .attr("fill", "steelblue")
          .style("opacity", 0);

        // Tooltip
        const tooltip = d3.select("#tooltip");
        const formatNumber = d3.format(",");

        let tooltipVisible = false;

        const overlay = svg.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "transparent")
          .on("mousemove", function (event) {
            const [mouseX] = d3.pointer(event);
            const index = Math.floor(DATA.length * mouseX / width);
            const d = DATA[Math.max(0, Math.min(DATA.length - 1, index))];
            const xPos = x(d.date);
            const yPos = y(d.close);

            // Show tooltip only once
            if (!tooltipVisible) {
              tooltip.style("opacity", 1);
              tooltipVisible = true;
            }

            // Update crosshair and focus circle
            crosshairLine
              .attr("x1", xPos)
              .attr("x2", xPos)
              .style("opacity", 1);

            horizontalLine
              .attr("y1", yPos)
              .attr("y2", yPos)
              .style("opacity", 1);

            focusCircle
              .attr("cx", xPos)
              .attr("cy", yPos)
              .style("opacity", 1);

            // Tooltip position & content
            const chartRect = document.getElementById("asset-size-chart").getBoundingClientRect();
            const tooltipWidth = 154;
            const tooltipOffset = 8;
            const cursorX = event.clientX;

            const tooltipLeft = (cursorX > chartRect.left + chartRect.width / 2)
              ? event.pageX - tooltipWidth + 3 * tooltipOffset
              : event.pageX + tooltipOffset;

            tooltip
              .style("left", tooltipLeft + "px")
              .style("top", (event.pageY - 72) + "px")
              .html(`
                <strong>${d.date}</strong><br>
                <table style="font-size: 12px; margin-top: 4px;">
                  <tr><td style="padding-right: 4px;">Open:</td><td style="text-align: right;">${formatNumber(d.open)}</td></tr>
                  <tr><td style="padding-right: 4px;">High:</td><td style="text-align: right;">${formatNumber(d.high)}</td></tr>
                  <tr><td style="padding-right: 4px;">Low:</td><td style="text-align: right;">${formatNumber(d.low)}</td></tr>
                  <tr><td style="padding-right: 4px;">Close:</td><td style="text-align: right;">${formatNumber(d.close)}</td></tr>
                </table>
              `);
          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
            tooltipVisible = false;
            crosshairLine.style("opacity", 0);
            horizontalLine.style("opacity", 0);
            focusCircle.style("opacity", 0);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/components/MainDashboard/AssetComponent.scss";
</style>
