export default {
    install(Vue) {
        // 순서대로 색상 입혀진 후, d3에서 자동으로 큰 순서대로 재배열함
        const Colors = ["#233253", "#7fa224", "#ff1595", "#0673c5", "#c8bdb9", "#f6f5fa"];

        Vue.config.globalProperties.$Donut_Chart =
            function(DATA, container) { 
                const WIDTH  = document.querySelector(container).offsetWidth,
                      HEIGHT = document.querySelector(container).offsetWidth,
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
                // 데이터 가공
                const NAME_OF_PORTFOLIO = DATA.NAME,
                      ASSETS_IN_PORTFOLIO = DATA.ASSETS;

                // 포트폴리오 타이틀 출력
                document.querySelector("#main-portfolio > #portfolio-name").textContent = NAME_OF_PORTFOLIO;
                
                // 도넛 차트 생성
                const WIDTH  = document.querySelector(container).offsetWidth,
                      HEIGHT = document.querySelector(container).offsetWidth,
                      MARGIN = WIDTH * 0.05,
                      RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
                      
                const svg = d3.select(container)
                              .append("svg")
                              .attr("width", WIDTH)
                              .attr("height", HEIGHT)
                              .append("g")
                              .attr("transform", "translate(" + WIDTH / 2 + "," + HEIGHT / 2 + ")");
                                
                Colors.slice(0, Object.keys(ASSETS_IN_PORTFOLIO).length);
                const color = d3.scaleOrdinal().range(Colors);
                
                const pie = d3.pie().value(d => d[1]);
                const data_ready = pie(Object.entries(ASSETS_IN_PORTFOLIO));
                
                var arc = d3.arc().innerRadius(MARGIN*4).outerRadius(RADIUS);
              
                svg.selectAll('whatever')
                   .data(data_ready)
                   .enter()
                   .append('path')
                       .attr("class", "portions")
                       .attr('d', arc)
                       .attr('fill', d => color(d.data[0]))
                       .attr("stroke", "#171a1e")
                       .style("stroke-width", "1.0px")
                   .on('mouseover', function(d, i) {
                       d3.select(this)
                         .attr("stroke", "whitesmoke")
                         .attr("stroke-width", "3.0px")})
                   .on('mouseout', function(d, i) {
                       d3.select(this).transition()
                         .attr("stroke", "#171a1e")
                         .attr("stroke-width", "1.0px")}) 
                   .transition()
                         .duration(1400)
                         .attrTween('d', function(d) {
                             var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                             return function(t) {
                                 return arc(interpolate(t));
                             };
                        });
            }
        // $Donut_Chart_With_Detail

        Vue.config.globalProperties.$Color_Tag = 
            function() {
                const ColorTags = document.querySelectorAll("input[name='color-section']");
                for(let i=0 ; i < ColorTags.length ; i++) {ColorTags[i].style.backgroundColor = Colors[i];}
            }
        // $Color_Tag

        Vue.config.globalProperties.$Remove_Donut_Chart = 
            function(svg) {
                document.querySelector(svg).remove();
            }
        // $Remove_Donut_Chart
    }
}