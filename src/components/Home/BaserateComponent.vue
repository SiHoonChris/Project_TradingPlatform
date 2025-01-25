<template>
  <div id="component-base-rate">
    <div :id="listPart" style="border-right: 1px solid #333333;">
      <div id="base-rate-title" style="border-bottom: 1px solid #333333;">
        <p>Base Rate</p>
      </div>
      <ul id="base-rate-list">
        <li v-for="(data, idx) in dummyLastBaseRate" :key="idx"
            @click="selectCountry(data.Country)"
            :class="{'selected': selectedCountry === data.Country}">
          <p>{{data.Country}}</p>
        </li>
      </ul>
    </div>
    <div :id="chartPart"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listPart: 'base-rate-list',
        chartPart: 'base-rate-chart',
        selectedCountry: 'South Korea',
        dummyLastBaseRate: [
          {Country:"Japan", Rate: 0.25},
          {Country:"Switzerland", Rate: 0.5},	
          {Country:"Singapore", Rate: 2.31},
          {Country:"South Korea", Rate: 3},
          {Country:"China", Rate: 3.1},
          {Country:"Euro Area", Rate: 3.15},
          {Country:"Canada", Rate: 3.25},
          {Country:"Australia", Rate: 4.35},
          {Country:"United States", Rate: 4.5},
          {Country:"United Kingdom", Rate: 4.75},
          {Country:"Saudi Arabia", Rate: 5},
          {Country:"Indonesia", Rate: 6},
          {Country:"India", Rate: 6.5},
          {Country:"South Africa", Rate: 7.75},
          {Country:"Mexico", Rate: 10},
          {Country:"Brazil", Rate: 12.25},
          {Country:"Russia", Rate: 21},
          {Country:"Argentina", Rate: 32},	
          {Country:"Turkey", Rate: 47.5}
        ],
        dummyPreviousBaseRate: [
          {Country:"Japan", Rate: 0.25},
          {Country:"Switzerland", Rate: 1},	
          {Country:"Singapore", Rate: 2.56},
          {Country:"South Korea", Rate: 3.25},
          {Country:"China", Rate: 3.1},
          {Country:"Euro Area", Rate: 3.4},
          {Country:"Canada", Rate: 3.75},
          {Country:"Australia", Rate: 4.35},
          {Country:"United States", Rate: 4.75},
          {Country:"United Kingdom", Rate: 4.75},
          {Country:"Saudi Arabia", Rate: 5.25},
          {Country:"Indonesia", Rate: 6},
          {Country:"India", Rate: 6.5},
          {Country:"South Africa", Rate: 8},
          {Country:"Mexico", Rate: 10.25},
          {Country:"Brazil", Rate: 11.25},
          {Country:"Russia", Rate: 21},
          {Country:"Argentina", Rate: 35},	
          {Country:"Turkey", Rate: 50}
        ]
      }
    },
    mounted(){        
      this.selectCountry(this.selectedCountry)
    },
    methods: {
      selectCountry(country) {
        this.selectedCountry = country; // Update selected country
        this.setBaseRateChart(country); // Update the chart
      },
      setBaseRateChart: function (country) {
        // 1. Data-setting
        const LastRate = this.dummyLastBaseRate.find(item => item.Country === country)?.Rate;
        const PrevRate = this.dummyPreviousBaseRate.find(item => item.Country === country)?.Rate;
        const ChartData = [
          {x:'Last', y: LastRate},
          {x:'Prev', y: PrevRate}
        ];
        
        // 2. Remove Previous Chart
        const PreviousChart = document.querySelector(`#${this.chartPart} svg`);
        if (PreviousChart) { PreviousChart.remove(); }

        // 3. Create New Chart
        const  Width  = document.getElementById(this.chartPart).offsetWidth,
               Height = document.getElementById(this.chartPart).offsetHeight,
               Margin = { top: 24, right: 20, bottom: 30, left: 44 };

        const svg = d3.select('#'+this.chartPart)
                      .append("svg")
                      .attr("width", Width)
                      .attr("height", Height)
                      .append("g")
                      .attr("transform", `translate(${Width * 0}, ${Height * 0})`);

        const xAxis = d3.scaleBand()
                    .domain(ChartData.map(d => d.x))
                    .range([Margin.left, Width - Margin.right])
                    .padding(0.1);

        const yAxis = d3.scaleLinear()
                    .domain([0, d3.max(ChartData, d => d.y * 1.2)])
                    .nice()
                    .range([Height - Margin.bottom, Margin.top]);

        svg.selectAll(".bar") // Draw the bars
            .data(ChartData)
            .join("rect")
            .attr("fill", d => 
              d.x === "Last" && LastRate > PrevRate ? "#de1c1c" : 
                d.x === "Prev" && PrevRate > LastRate ? "#de1c1c" : "#0d431c"
            )
            .attr("class", "bar")
            .attr("x", d => xAxis(d.x))
            .attr("y", d => yAxis(d.y))
            .attr("width", xAxis.bandwidth()*0.75)
            .attr("height", d => yAxis(0) - yAxis(d.y))
            .attr("transform", `translate(${xAxis.bandwidth()*0.125},0)`);

        svg.append("g") // Add the x-axis
           .attr("transform", `translate(0,${Height - Margin.bottom})`)
           .call(d3.axisBottom(xAxis))
           .attr("class", "x-axis")
           .selectAll("text")
           .attr("fill", "#e2e2e2")
           .attr("opacity", 0.9);

        svg.append("g") // Add the y-axis
           .attr("transform", `translate(${Margin.left},0)`)
           .call(d3.axisLeft(yAxis).ticks(3))
           .attr("class", "y-axis")
           .selectAll("text")
           .attr("fill", "#e2e2e2")
           .attr("opacity", 0.9);

        // Change axis lines and tick colors to white
        svg.selectAll(".x-axis path, .x-axis .tick line, .y-axis path, .y-axis .tick line")
           .attr("stroke", "#e2e2e2")
           .attr("opacity", 0.6);

        svg.selectAll(".label") // Add labels on the bars
           .data(ChartData)
           .join("text")
           .attr("class", "label")
           .attr("x", d => xAxis(d.x) + xAxis.bandwidth() / 2)
           .attr("y", d => yAxis(d.y) - 6)
           .attr("text-anchor", "middle")
           .style("fill", "white") 
           .style("font-weight", "400")
           .style("font-size", "13px")
           .text(d => d.y);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Baserate.scss";
</style>
