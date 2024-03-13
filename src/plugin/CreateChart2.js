export default {
    install(Vue) {
        // 순서대로 색상 입혀진 후, d3에서 자동으로 큰 순서대로 재배열함
        const Colors = ["green", "blue", "yellow", "red", "blue", "lemon"];

        Vue.config.globalProperties.$Donut_Chart =
            function(DATA, container) { 
                const WIDTH  = Number(window.getComputedStyle(document.querySelector(container)).width.replace('px', '')),
                      HEIGHT = Number(window.getComputedStyle(document.querySelector(container)).width.replace('px', '')),
                      MARGIN = 10,
                      RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
                      
                // append the svg object to the div
                const svg = d3.select(container)
                              .append("svg")
                              .attr("width", WIDTH)
                              .attr("height", HEIGHT)
                              .append("g")
                              .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");
                                
                // set the color scale
                Colors.slice(0, Object.keys(DATA).length);
                const color = d3.scaleOrdinal().range(Colors)
                
                // Compute the position of each group on the pie:
                const pie = d3.pie().value(d => d[1]);
                const data_ready = pie(Object.entries(DATA));
                
                var arc = d3.arc()
                            .innerRadius(60)  // This is the size of the donut hole
                            .outerRadius(RADIUS);
              
                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg.selectAll('whatever')
                   .data(data_ready)
                   .enter()
                   .append('path')
                       .attr("class", "saved-donut")
                       .attr('d', arc)
                       .attr('fill', d => color(d.data[0]) )
                       .attr("stroke", "#171a1e")
                       .style("stroke-width", "1.0px");
            }
        // $Donut_Chart
        Vue.config.globalProperties.$Donut_Chart_With_Detail =
            function() {
                console.log('as');
            }
        // $Donut_Chart_With_Detail
        Vue.config.globalProperties.$Horizontal_Bar_Chart =
            function() {
                console.log('as');
            }
        // $Horizontal_Bar_Chart
    }
}