<template>
  <div id="component-portfolio">
    <div :id="portfolioPart"></div>
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
      // this.setPortfolioChart(this.data, this.portfolioPart);
    },
    methods: {
      // setPortfolioChart: function(data, container){
      //   if(document.querySelectorAll(`#${container} > svg`).length !== 0) {
      //     document.querySelector(`#${container} > svg`).remove();
      //   }

      //   const ASSETS_IN_PORTFOLIO = DATA.CHART_DATA,
      //         FOR_TOOLTIP_DATA    = DATA.DATAS;
                
      //   const WIDTH  = document.querySelector(container).offsetWidth,
      //         HEIGHT = document.querySelector(container).offsetWidth,
      //         MARGIN = WIDTH * 0.05,
      //         RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
                      
      //   const svg = d3.select(container)
      //                 .append("svg")
      //                 .attr("width", WIDTH)
      //                 .attr("height", HEIGHT)
      //                 .append("g")
      //                 .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");
        
      //   let Colors = color_palette;
      //   if(Colors.length < Object.keys(ASSETS_IN_PORTFOLIO).length){ 
      //       for(let i=0; i<Math.ceil(Object.keys(ASSETS_IN_PORTFOLIO).length/Colors.length); i++){
      //           Colors.push(...color_palette);
      //       }
      //   }
      //   Colors.slice(0, Object.keys(ASSETS_IN_PORTFOLIO).length);
      //   const color = d3.scaleOrdinal().range(Colors);
        
      //   const pie = d3.pie().value(d => d[1]);
      //   const data_ready = pie(Object.entries(ASSETS_IN_PORTFOLIO));
        
      //   var arc = d3.arc().innerRadius(MARGIN*4).outerRadius(RADIUS);
      
      //   /* Tooltip */
      //   let Tooltip =
      //       d3.select(container)
      //           .append("div")
      //           .attr("id", "portfolio-tooltip")
      //           .style("position", "absolute")
      //           .style("padding", "4px")
      //           .style("border", "solid")
      //           .style("border-color", "white")
      //           .style("border-width", "2px")
      //           .style("border-radius", "5px")
      //           .style("background-color", "black")
      //           .style("opacity", 0)
      //           .style("color", "white")
      //           .style("font-size", "12px");

      //   svg.selectAll('whatever')
      //       .data(data_ready)
      //       .enter()
      //       .append('path')
      //           .attr("class", "mainChart_Portion")
      //           .attr('d', arc)
      //           .attr('fill', d => color(d.data[0]))
      //           .attr("stroke", "#171a1e")
      //           .style("stroke-width", "1.0px")
      //       .transition()
      //           .duration(1400)
      //           .attrTween('d', function(d) {
      //               var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
      //               return function(t) {
      //                   return arc(interpolate(t));
      //               };
      //           })
      //       .on("end", function(){
      //           svg.selectAll('.mainChart_Portion')
      //               .on('mouseover', function(evt, d) {
      //                   d3.select(this)
      //                       .attr("stroke", "whitesmoke")
      //                       .attr("stroke-width", "3.0px");
                        
      //                   document.querySelector(`#of_${d.data[0]} input`).style.border 
      //                       = "1.6px whitesmoke solid";
      //                   for(const e of document.querySelectorAll(`#of_${d.data[0]} span`)) {
      //                       e.style.fontWeight = 'bold';
      //                   }

      //                   Tooltip.style("opacity", 0.8);
      //                   }
      //               )
      //               .on('mousemove', function(evt, d) {
      //                   d3.select(this)
      //                       .attr("stroke", "whitesmoke")
      //                       .attr("stroke-width", "3.0px");
                        
      //                   document.querySelector(`#of_${d.data[0]} input`).style.border 
      //                       = "1.6px whitesmoke solid";
      //                   for(const e of document.querySelectorAll(`#of_${d.data[0]} span`)) {
      //                       e.style.fontWeight = 'bold';
      //                   }

      //                   Tooltip
      //                       .html(`
      //                           <b>${d.data[0]}</b>
      //                           <br><br>
      //                           Price(${ currency_symbol[ FOR_TOOLTIP_DATA[d.data[0]].MARKET ] }): 
      //                           ${(FOR_TOOLTIP_DATA[d.data[0]].PRICE).toLocaleString()}
      //                           <br>
      //                           Total(₩): ${Math.round(d.data[1]).toLocaleString()}
      //                       `)
      //                       .style("left", `${evt.pageX+5}px`)
      //                       .style("top", `${evt.pageY+3}px`);
      //                   }
      //               )
      //               .on('mouseout', function(evt, d) {
      //                   d3.select(this).transition()
      //                       .attr("stroke", "#171a1e")
      //                       .attr("stroke-width", "1.0px");
                        
      //                   document.querySelector(`#of_${d.data[0]} input`).style.border 
      //                       = "none";
      //                   for(const e of document.querySelectorAll(`#of_${d.data[0]} span`)) {
      //                       e.style.fontWeight = 'normal';
      //                   }

      //                   Tooltip.style("opacity", 0);
      //                   }
      //               )
      //       });
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Portfolio.scss";
</style>
