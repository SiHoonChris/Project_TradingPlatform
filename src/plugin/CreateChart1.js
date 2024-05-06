export default {
    install(Vue) {
        Vue.config.globalProperties.$Basic_Candle = 
            function(DATA, svgCont, yAxisBgSelec, yAxisSelec, chartSelec){ 
                let width  = window.getComputedStyle(document.querySelector(svgCont))
                                .width.replace('px', ''),
                    height = window.getComputedStyle(document.querySelector(svgCont))
                                .height.replace('px', '') - 6; /* 하단 스크롤바 높이 */
                    
                let yAxisBgSVG = d3.select(yAxisBgSelec)
                                    .attr("width", width * 0.05)
                                    .attr("height", height),
                    yAxisSVG   = d3.select(yAxisSelec)
                                    .attr("width", width * 0.05)
                                    .attr("height", height),
                    chartSVG   = d3.select(chartSelec)
                                    .attr("width", width * 2)
                                    .attr("height", height);

                let xScale = d3.scaleBand()
                                .range([0, width*2-width*.05])
                                .padding(0.16)
                                .domain(DATA.map((d) => 
                                    new Intl.DateTimeFormat('ja-JP').format(new Date(d.Date)))
                                ),
                    yScale = d3.scaleLinear()
                                .range([height * 0.97, 0])
                                .domain(
                                    d3.extent([
                                        d3.max(DATA, (d) => d.High * 1.05),
                                        d3.min(DATA, (d) => d.Low * 0.95)
                                    ])
                                );
    
                let xLabels = xScale.domain().filter(function(d, i){
                    if(i!==0 && i%40===0) return d;
                });
    
                let xAxis = d3.axisBottom(xScale).tickValues(xLabels),
                    yAxis = d3.axisRight(yScale).ticks(5);

                /* 고정된 y축 생성 */
                let g1 = yAxisSVG.append("g");
                
                g1.append("g") /* y-axis */
                    .attr("class", "y-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.2)
                    .call(yAxis.tickSizeInner(0).tickSizeOuter(0));

                let g2 = yAxisBgSVG.append("g");
                
                g2.append("rect") /* y-axis Bg */
                    .attr("fill", 'black')
                    .attr("width", `${width * 0.05}`)
                    .attr("height", height);

                /* x축, y축 가로 그리드, 캔들 생성 */                
                let g3 = chartSVG.append("g");

                /* crosshair x */
                let horizontalLine = g3.append("line")
                                        .attr("opacity", 0)
                                        .attr("x1", 0)
                                        .attr("x2", width * 2)
                                        .attr("stroke", "white")
                                        .attr("stroke-width", .4)
                                        .attr("stroke-dasharray", "4 1")
                                        .attr("pointer-events", "none");
                /* crosshair y */
                let verticalLine = g3.append("line")
                                        .attr("opacity", 0)
                                        .attr("y1", 0)
                                        .attr("y2", height * 0.97)
                                        .attr("stroke", "white")
                                        .attr("stroke-width", .4)
                                        .attr("stroke-dasharray", "4 1")
                                        .attr("pointer-events", "none");
                /* crosshair movement */
                let crosshairCreate = function(){
                    verticalLine.attr("x1", event.offsetX).attr("x2", event.offsetX).attr("opacity", 1);
                    horizontalLine.attr("y1", event.offsetY).attr("y2", event.offsetY).attr("opacity", 1);
                }
                let crosshairRemove = function(){
                    verticalLine.attr("opacity", 0);
                    horizontalLine.attr("opacity", 0);
                }

                /* Tooltip */
                let Tooltip =
                    d3.select(svgCont)
                        .append("div")
                        .attr("class", "tooltip")
                        .style("position", "absolute")
                        .style("padding", "3px")
                        .style("border", "solid")
                        .style("border-color", "white")
                        .style("border-width", "1.4px")
                        .style("border-radius", "5px")
                        .style("background-color", "black")
                        .style("opacity", 0)
                        .style("color", "white")
                        .style("font-size", "10px")
                /* Tooltip movement */
                let mouseover = function() {
                    Tooltip.style("opacity", 0.7);
                    crosshairCreate();
                }
                let mousemove = function(d) {
                    Tooltip
                        .html(`${new Intl.DateTimeFormat('ja-JP').format(new Date(d.target.__data__.Date))}
                                <br><br>
                                Open: ${d.target.__data__.Open % 1 === 0 ? 
                                            d.target.__data__.Open.toLocaleString() : d.target.__data__.Open.toFixed(4)}
                                <br>
                                High: ${d.target.__data__.High % 1 === 0 ?
                                            d.target.__data__.High.toLocaleString() : d.target.__data__.High.toFixed(4)}
                                <br>
                                Low: ${d.target.__data__.Low % 1 === 0 ?
                                            d.target.__data__.Low.toLocaleString() : d.target.__data__.Low.toFixed(4)}
                                <br>
                                Close: ${d.target.__data__.Close % 1 === 0 ? 
                                            d.target.__data__.Close.toLocaleString() : d.target.__data__.Close.toFixed(4)}`)
                        .style("left", `${event.pageX+9}px`)
                        .style("top", `${event.pageY+3}px`);
                    crosshairCreate();
                }
                let mouseleave = function() {
                    Tooltip.style("opacity", 0);
                    crosshairRemove();
                }

                g3.append('rect') /* crosshair */
                    .attr("class", "crosshair")
                    .attr("width", width * 2)
                    .attr("height", height)
                    .attr("opacity", 0)
                    .on("mousemove", crosshairCreate)
                    .on("mouseout", crosshairRemove);

                g3.append("g") /* x-axis */
                    .attr("class", "x-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.2)
                    .attr("transform", `translate(0, ${height * 0.97})`)
                    .attr("color", "white")
                    .call(xAxis.tickSizeInner(-height).tickSizeOuter(0))
                    .on("mousemove", crosshairCreate)
                    .on("mouseout", crosshairRemove);

                g3.append("g") /* y-axis with grid */
                    .attr("class", "y-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.2)
                    .attr("transform", `translate(${width*2-width*0.05}, 0)`)
                    .call(yAxis.tickSizeInner(-(width*2-width*0.05)).tickSizeOuter(0))
                    .on("mousemove", crosshairCreate)
                    .on("mouseout", crosshairRemove);

                g3.selectAll(".candle") /* Candle-body */
                    .data(DATA)
                    .enter()
                    .append("rect")
                    .attr("class", "candle")
                    .attr("x", (d) => xScale(new Intl.DateTimeFormat('ja-JP').format(new Date(d.Date))))
                    .attr("width", xScale.bandwidth())
                    .attr("y", (d) => yScale(d3.max([d.Open, d.Close])))
                    .attr("height", (d) => Math.abs(yScale(d.Close)-yScale(d.Open)))
                    .attr("fill", (d) => d.Open >= d.Close ? "red" : "green")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)
                    .raise();
                    
                g3.selectAll(".tail") /* Candle-tail */
                    .data(DATA)
                    .enter()
                    .append("line")
                    .attr("class", "tail")
                    .attr("x1", (d) => xScale(new Intl.DateTimeFormat('ja-JP').format(new Date(d.Date))) 
                                        + xScale.bandwidth() / 2)
                    .attr("y1", (d) => yScale(d.Low))
                    .attr("x2", (d) => xScale(new Intl.DateTimeFormat('ja-JP').format(new Date(d.Date))) 
                                        + xScale.bandwidth() / 2)
                    .attr("y2", (d) => yScale(d.High))
                    .style("stroke", (d) => d.Open >= d.Close ? "red" : "green")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)
                    .raise();
            }

        // $Standard_Candle
        Vue.config.globalProperties.$Bollinger_Band = 
            function(){
                console.log('as');
            }
        // $Bollinger_Band
        Vue.config.globalProperties.$Ichimoku_Cloud = 
            function(){
                console.log('as');
            }
        // $Ichimoku_Cloud
    }
}