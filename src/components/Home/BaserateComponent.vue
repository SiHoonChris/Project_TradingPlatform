<template>
  <div id="component-base-rate">
    <div :id="listPart"></div>
    <div :id="chartPart"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listPart: "base-rate-list",
        chartPart: "base-rate-chart",
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
      this.setBaseRateList(this.dummyLastBaseRate, this.dummyPreviousBaseRate);
      this.setBaseRateChart('South Korea', this.dummyLastBaseRate, this.dummyPreviousBaseRate)
    },
    methods: {
      setBaseRateList: function (lastData, prevData) {
        const countryList = lastData.map((e) => {
          const { Country } = e;
          return { Country };
        });
        
        const app = document.getElementById(this.listPart);
        const gridElement = document.createElement('div');
        const grid = canvasDatagrid({
          parentNode: gridElement,
          data: countryList,
          showRowHeaders: false,
          showRowNumbers: false,
          hoverMode: 'row',
          selectionMode: 'row',
          style: {
            /* 0. Grid */
            gridBackgroundColor: "#000000",
            gridBorderColor: "#bbbbbb",
            gridBorderWidth: 0,
            /* 1. Column Header */
            cornerCellBackgroundColor: '#000000', // numbering-side
            cornerCellBorderColor: "#bbbbbb",
            columnHeaderCellBackgroundColor : '#000000',
            columnHeaderCellColor : '#bbbbbb',
            columnHeaderCellBorderWidth: 0,
            columnHeaderCellHorizontalAlignment : "center",
            columnHeaderCellVerticalAlignment : "center",
            columnHeaderCellCapBackgroundColor : "#000000", // scroll-bar-side
            columnHeaderCellCapBorderWidth: 0,
            columnHeaderCellCapBorderColor : "#bbbbbb",
              /* mouse-event */
              columnHeaderCellHoverBackgroundColor : '#000000',
              columnHeaderCellHoverColor : '#bbbbbb',
              activeColumnHeaderCellColor : "#bbbbbb",
              activeColumnHeaderCellBackgroundColor : "#000000",
            /* 3. Scroll-Bar */
            scrollBarCornerBackgroundColor : "#000000",
            scrollBarBackgroundColor : "#000000",
            /* 4. Cell */
            cellBorderWidth: 0,
            cellBorderColor: '#000000',
            cellBackgroundColor : '#000000',
            cellColor : '#bbbbbb',
            cellHorizontalAlignment : "left",
            cellVerticalAlignment : "center", 
            /* mouse-event */
              cellSelectedBackgroundColor : "#0d431c",
              selectionOverlayBorderColor : '#0d431c',
              cellSelectedColor : "#bbbbbb",
              cellHoverBackgroundColor : "#0d431c",
              cellHoverColor : "#bbbbbb",
              activeCellBackgroundColor : "#0d431c",
              activeCellSelectedColor : "#bbbbbb",
              activeCellColor : "#bbbbbb",
              activeCellSelectedBackgroundColor : "#0d431c",
              activeCellBorderColor : "#bbbbbb",
              activeCellHoverColor : "#000000",
              activeCellOverlayBorderColor: "#bbbbbb",
          }
        });

        app.append(gridElement);

        grid.style.width = getComputedStyle(document.getElementById(this.listPart)).width;
        grid.style.height = getComputedStyle(document.getElementById(this.listPart)).height;
        grid.setColumnWidth(0, getComputedStyle(document.getElementById(this.listPart)).width.replace('px',''));
        grid.style.overflowX = 'hidden';

        grid.addEventListener('click', (event) => {
          const cell = event.cell;
          if (cell) {this.setBaseRateChart(cell.value, lastData, prevData);}
        });
      },
      setBaseRateChart: function (country, lastData, prevData) {
        // 1. Data-setting
        const LastRate = lastData.find(item => item.Country === country)?.Rate;
        const PrevRate = prevData.find(item => item.Country === country)?.Rate;
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
               Margin = { top: 20, right: 30, bottom: 40, left: 40 };

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
                    .domain([0, d3.max(ChartData, d => d.y)])
                    .nice()
                    .range([Height - Margin.bottom, Margin.top]);

        svg.selectAll(".bar") // Draw the bars
            .data(ChartData)
            .join("rect")
            .attr("fill", "#0d431c")
            .attr("class", "bar")
            .attr("x", d => xAxis(d.x))
            .attr("y", d => yAxis(d.y))
            .attr("width", xAxis.bandwidth())
            .attr("height", d => yAxis(0) - yAxis(d.y));

        svg.append("g") // Add the x-axis
            .attr("transform", `translate(0,${Height - Margin.bottom})`)
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr("class", "axis-label")
            .attr("stroke", "white");

        svg.append("g") // Add the y-axis
            .attr("transform", `translate(${Margin.left},0)`)
            .call(d3.axisLeft(yAxis))
            .selectAll("text")
            .attr("class", "axis-label")
            .attr("stroke", "white");

        svg.selectAll(".label") // Add labels on the bars
            .data(ChartData)
            .join("text")
            .attr("class", "label")
            .attr("x", d => xAxis(d.x) + xAxis.bandwidth() / 2)
            .attr("y", d => yAxis(d.y) - 5)
            .attr("text-anchor", "middle")
            .attr("stroke", "white")
            .text(d => d.y);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Baserate.scss";
</style>
