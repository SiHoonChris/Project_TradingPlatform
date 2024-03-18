export default {
    install(Vue) {
        // 순서대로 색상 입혀진 후, d3에서 자동으로 큰 순서대로 재배열함
        const Colors = ["#233253", "#7fa224", "#ff1595", "#0673c5", "#c8bdb9", "#f6f5fa"];

        Vue.config.globalProperties.$Donut_Chart =
            function(DATA, container) { 
                const WIDTH  = Number(window.getComputedStyle(document.querySelector(container)).width.replace('px', '')),
                      HEIGHT = Number(window.getComputedStyle(document.querySelector(container)).width.replace('px', '')),
                      MARGIN = WIDTH * 0.05,
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
                const color = d3.scaleOrdinal().range(Colors);
                
                // Compute the position of each group on the pie:
                const pie = d3.pie().value(d => d[1]);
                const data_ready = pie(Object.entries(DATA));
                
                var arc = d3.arc()
                            .innerRadius(MARGIN*4)  // This is the size of the donut hole
                            .outerRadius(RADIUS);
              
                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg.selectAll('whatever')
                   .data(data_ready)
                   .enter()
                   .append('path')
                       .attr("class", "portions")
                       .attr('d', arc)
                       .attr('fill', d => color(d.data[0]) )
                       .attr("stroke", "#171a1e")
                       .style("stroke-width", "1.0px")
                    .transition()
                        .duration(1400)
                        .attrTween('d', function(d) {
                            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                            return function(t) {
                                return arc(interpolate(t));
                            };
                        });

            }
        // $Donut_Chart

        Vue.config.globalProperties.$Donut_Chart_With_Detail =
            function(DATA, container) {
                this.$Donut_Chart(DATA, container);
                for(const path of document.querySelectorAll('path')){
                    path.addEventListener("mouseover", e => {
                        path.style.strokeWidth = "2px";
                        path.style.stroke = "whitesmoke";
                    });
                    path.addEventListener("mouseout", e => {
                        path.style.strokeWidth = "1px";
                        path.style.stroke = "#171a1e";
                    });
                }
            }
        // $Donut_Chart_With_Detail

        Vue.config.globalProperties.$Remove_Donut_Chart = 
            function(svg) {
                document.querySelector(svg).remove();
            }
        // $Remove_Donut_Chart

        Vue.config.globalProperties.$Horizontal_Bar_Chart =
            function() {
                console.log('as');
            }
        // $Horizontal_Bar_Chart
    }
}