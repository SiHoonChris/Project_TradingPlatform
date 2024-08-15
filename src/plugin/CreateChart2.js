export default {
    install(Vue) {
        // 순서대로 색상 입혀진 후, d3에서 자동으로 큰 순서대로 재배열함
        const color_palette = ["#233253", "#7fa224", "#ff1595", "#0673c5", "#c8bdb9", "#f6f5fa"];
        
        Vue.config.globalProperties.$Donut_Chart =
            function(DATA, container) { 
                if(document.querySelectorAll(`${container} > svg`).length !== 0){
                    document.querySelector(`${container} > svg`).remove();
                }

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
                                
                let Colors = color_palette;
                if(Colors.length < Object.keys(DATA).length){ 
                    for(let i=0; i<Math.ceil(Object.keys(DATA).length/Colors.length); i++){
                        Colors.push(...color_palette);
                    }
                }
                Colors.slice(0, Object.keys(DATA).length);
                const color = d3.scaleOrdinal().range(Colors);
                
                // Compute the position of each group on the pie:
                const pie = d3.pie().value(d => d[1]);
                const data_ready = pie(Object.entries(DATA));
                
                let arc = d3.arc()
                            .innerRadius(MARGIN*4)
                            .outerRadius(RADIUS);
              
                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg.selectAll('whatever')
                   .data(data_ready)
                   .enter()
                   .append('path')
                       .attr("class", "SP_Portion")
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
                if(document.querySelectorAll(`${container} > svg`).length !== 0){
                    document.querySelector(`${container} > svg`).remove();
                }

                const NAME_OF_PORTFOLIO = DATA.NAME,
                      ASSETS_IN_PORTFOLIO = DATA.CHART_DATA;

                document.querySelector("#main-portfolio > #portfolio-name").textContent = NAME_OF_PORTFOLIO;
                
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
                
                let Colors = color_palette;
                if(Colors.length < Object.keys(ASSETS_IN_PORTFOLIO).length){ 
                    for(let i=0; i<Math.ceil(Object.keys(ASSETS_IN_PORTFOLIO).length/Colors.length); i++){
                        Colors.push(...color_palette);
                    }
                }
                Colors.slice(0, Object.keys(ASSETS_IN_PORTFOLIO).length);
                const color = d3.scaleOrdinal().range(Colors);
                
                const pie = d3.pie().value(d => d[1]);
                const data_ready = pie(Object.entries(ASSETS_IN_PORTFOLIO));
                
                var arc = d3.arc().innerRadius(MARGIN*4).outerRadius(RADIUS);
              
                /* Tooltip */
                let Tooltip =
                    d3.select(container)
                        .append("div")
                        .attr("id", "portfolio-tooltip")
                        .style("position", "absolute")
                        .style("padding", "4px")
                        .style("border", "solid")
                        .style("border-color", "white")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("background-color", "black")
                        .style("opacity", 0)
                        .style("color", "white")
                        .style("font-size", "12px");

                svg.selectAll('whatever')
                    .data(data_ready)
                    .enter()
                    .append('path')
                        .attr("class", "MP_Portion")
                        .attr('d', arc)
                        .attr('fill', d => color(d.data[0]))
                        .attr("stroke", "#171a1e")
                        .style("stroke-width", "1.0px")
                    .transition()
                        .duration(1400)
                        .attrTween('d', function(d) {
                            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                            return function(t) {
                                return arc(interpolate(t));
                            };
                        })
                    .on("end", function(){
                        svg.selectAll('.MP_Portion')
                            .on('mouseover', function(evt, d) {
                                d3.select(this)
                                    .attr("stroke", "whitesmoke")
                                    .attr("stroke-width", "3.0px");
                                Tooltip.style("opacity", 0.8);
                                }
                            )
                            .on('mousemove', function(evt, d) {
                                d3.select(this)
                                    .attr("stroke", "whitesmoke")
                                    .attr("stroke-width", "3.0px");
                                Tooltip /* Price(화폐표시), 한국 주식은 소수점 표시X, 전 종목 세자리 단위 쉼표 */
                                    .html(`
                                        <b>${d.data[0]}</b>
                                        <br><br>
                                        Price($): ${(1234.56).toFixed(4)}
                                        <br>
                                        Total(₩): ${Math.round(d.data[1]).toLocaleString()}
                                    `)
                                    .style("left", `${evt.pageX+5}px`)
                                    .style("top", `${evt.pageY+3}px`);
                                }
                            )
                            .on('mouseout', function(evt, d) {
                                d3.select(this).transition()
                                    .attr("stroke", "#171a1e")
                                    .attr("stroke-width", "1.0px");
                                Tooltip.style("opacity", 0);
                                }
                            )
                    });

            }
        // $Donut_Chart_With_Detail

        Vue.config.globalProperties.$Color_Tag = 
            function() {
                const ColorTags = document.querySelectorAll("input[name='color-section']");
                
                let Colors = color_palette;
                if(Colors.length < ColorTags.length){ 
                    for(let i=0; i<Math.ceil(ColorTags.length/Colors.length); i++){
                        Colors.push(...color_palette);
                    }
                }
                
                for(let i=0 ; i < ColorTags.length ; i++) {ColorTags[i].style.backgroundColor = Colors[i];}
            }
        // $Color_Tag

    }
}