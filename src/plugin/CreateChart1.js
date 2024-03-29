export default {
    install(Vue) {
        Vue.config.globalProperties.$Standard_Candle = 
            function(DATA){ 
                let width  = window.getComputedStyle(document.querySelector("svg")).width.replace('px', '')*0.99,
                    height = window.getComputedStyle(document.querySelector("svg")).height.replace('px', '')*0.97;
    
                let svg    = d3.select("svg");
                let xScale = d3.scaleBand()
                                .range([0, width * 0.97])
                                .padding(0.16)
                                .domain(DATA.map((d) => d.date)),
                    yScale = d3.scaleLinear()
                                .range([height, 0])
                                .domain(d3.extent([d3.max(DATA, (d) => d.high * 1.05), d3.min(DATA, (d) => d.low * 0.95)]));
    
                let xLabels = xScale.domain().filter(function(d, i){
                    if(i!==0 && i%40===0) return d;
                });
    
                let xAxis = d3.axisBottom(xScale)
                                .tickValues(xLabels)
                                .tickSizeInner(-height)
                                .tickSizeOuter(0),
                    yAxis = d3.axisRight(yScale)
                                .ticks(5)
                                .tickSizeInner(-width*.97)
                                .tickSizeOuter(0);
                        
                let g = svg.append("g");
    
                /* x축 생성 */
                g.append("g")
                    .attr("class", "x-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.3)
                    .attr("transform", "translate(0," + height + ")")
                    .attr("color", "white")
                    .call(xAxis);
                
                /* y축 생성 */
                g.append("g")
                    .attr("class", "y-axis")
                    .attr("color", "white")
                    .attr("stroke-width", 0.3)
                    .attr("transform", "translate(" + width * 0.97 + ", 0)")
                    .call(yAxis);
                
                /* 캔들 몸통 */
                g.selectAll(".candle")
                    .data(DATA)
                    .enter()
                    .append("rect")
                    .attr("class", "candle")
                    .attr("x", (d) => xScale(d.date))
                    .attr("width", xScale.bandwidth())
                    .attr("y", (d) => yScale(d3.max([d.open, d.close])))
                    .attr("height", (d) => Math.abs(yScale(d.close)-yScale(d.open)))
                    .attr("fill", (d) => d.open >= d.close ? "red" : "green");
                    
                /* 캔들 꼬리 */
                g.selectAll(".tail")
                    .data(DATA)
                    .enter()
                    .append("line")
                    .attr("class", "tail")
                    .attr("x1", (d) => xScale(d.date)+xScale.bandwidth()/2)
                    .attr("y1", (d) => yScale(d.low))
                    .attr("x2", (d) => xScale(d.date)+xScale.bandwidth()/2)
                    .attr("y2", (d) => yScale(d.high))
                    .style("stroke", (d) => d.open >= d.close ? "red" : "green");
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