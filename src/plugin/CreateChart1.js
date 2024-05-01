export default {
    install(Vue) { // 컴포넌트들 그려지는 순서 조정 필요
        Vue.config.globalProperties.$Basic_Candle = 
            function(DATA, svgCont, yAxisBgSelec, yAxisSelec, chartSelec){ 
                let width  = window.getComputedStyle(document.querySelector(svgCont))
                                .width.replace('px', ''),
                    height = window.getComputedStyle(document.querySelector(svgCont))
                                .height.replace('px', '') - 6; /* 하단 스크롤바 높이 */
                    
                let yAxisBgSVG = d3.select(yAxisBgSelec)
                                    .attr("width", width)
                                    .attr("height", height),
                    yAxisSVG   = d3.select(yAxisSelec)
                                    .attr("width", width)
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
    
                let xAxis = d3.axisBottom(xScale)
                                .tickValues(xLabels)
                                .tickSizeInner(-height)
                                .tickSizeOuter(0),
                    yAxis = d3.axisRight(yScale)
                                .ticks(5)
                                .tickSizeInner(-width * .95)
                                .tickSizeOuter(0);
                
                /* y축 생성 */
                let g1 = yAxisBgSVG.append("g");

                g1.append("rect")
                    .attr("fill", 'black')
                    .attr("width", `${width * 0.05}`)
                    .attr("height", height)
                    .attr("transform", `translate(${width * 0.95}, 0)`);

                let g2 = yAxisSVG
                            .append("g")
                            .attr("transform", `translate(${width * 0.95}, 0)`);
                
                g2.append("g")
                    .attr("class", "y-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.3)
                    .call(yAxis);

                /* x축, 캔들 생성 */                
                let g3 = chartSVG.append("g");

                g3.append("g") /* x축 */
                    .attr("class", "x-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.3)
                    .attr("transform", `translate(0, ${height * 0.97})`)
                    .attr("color", "white")
                    .call(xAxis);
                                
                g3.selectAll(".candle") /* 캔들 몸통 */
                    .data(DATA)
                    .enter()
                    .append("rect")
                    .attr("class", "candle")
                    .attr("x", (d) => xScale(new Intl.DateTimeFormat('ja-JP').format(new Date(d.Date))))
                    .attr("width", xScale.bandwidth())
                    .attr("y", (d) => yScale(d3.max([d.Open, d.Close])))
                    .attr("height", (d) => Math.abs(yScale(d.Close)-yScale(d.Open)))
                    .attr("fill", (d) => d.Open >= d.Close ? "red" : "green")
                    .raise();
                    
                g3.selectAll(".tail") /* 캔들 꼬리 */
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