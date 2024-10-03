export default {
    install(Vue) {
        Vue.config.globalProperties.$Scatter_Plot = 
            function(data, elementId){
                // Before Creating
                if(document.getElementById(elementId).hasChildNodes()){
                    document.getElementById(elementId).querySelector("svg").remove();
                }

                // Specify the chart’s dimensions.
                const Width = window.getComputedStyle(document.getElementById(elementId)).width.replace('px', '');
                const Height = window.getComputedStyle(document.getElementById(elementId)).height.replace('px', '');
                const margin = { Top: 10, Right: 20, Bottom: 30, Left: 20 }

                // Create the SVG container.
                const svg = 
                    d3.select(`#${elementId}`)
                        .append("svg")
                            .attr("width", Width)
                            .attr("height", Height)
                        .append("g")
                            .attr("transform", `translate(${margin.Left}, ${margin.Top})`);

                // Add X axis
                const xScale = 
                    d3.scaleUtc()
                        .domain([d3.min(data, d => new Date(d["Date"])), d3.max(data, d => new Date(d["Date"]))])
                        .range([margin.Left, Width - (margin.Left + margin.Right)]);
                svg.append("g")
                    .attr("class", "xAxis")
                    .attr("transform", `translate(0, ${Height - margin.Bottom})`)
                    .attr('color', '#333232')
                    .attr("stroke", "#b8b8b8")
                    .call(d3.axisBottom(xScale).ticks(6).tickSizeInner(0).tickSizeOuter(0));

                // Add Y axis
                const yScale = 
                    d3.scaleLinear()
                        .domain([0, d3.max(data, d => d["Expense"])])
                        .range([Height - margin.Bottom, margin.Top]);
                svg.append("g")
                    .attr("class", "yAxis")
                    .attr("transform", `translate(${margin.Left}, 0)`)
                    .attr('color', '#333232')
                    .attr("stroke", "#b8b8b8")
                    .call(d3.axisLeft(yScale).ticks(5).tickSizeInner(0).tickSizeOuter(0));

                // Add dots
                const dot = 
                    svg.append("g")
                        .attr("fill", "none")
                        .attr("stroke", "purple")
                        .attr("stroke-width", 1.8)
                        .selectAll("circle")
                        .data(data)
                        .join("circle")
                        .attr("transform", d => `translate(${xScale(new Date(d["Date"]))},${yScale(d["Expense"])})`)
                        .attr("r", 2.2);

                // Brush
                svg.call(
                    d3.brush()
                        .extent([[margin.Left, margin.Top], [Width-(margin.Right+margin.Left), Height-margin.Bottom]])
                        .on("end", function(){
                            let selectedArea = d3.brushSelection(this);
                            console.log(selectedArea);

                            let dateFrom   = xScale.invert(selectedArea[0][0]);
                            let dateTo     = xScale.invert(selectedArea[0][0]);
                            let expenseMin = yScale.invert(selectedArea[1][1]);
                            let expenseMax = yScale.invert(selectedArea[1][1]);
                        
                            console.log(`${dateFrom} , ${dateTo} , ${expenseMin} , ${expenseMax}`);
                            // parameter : dateFrom, dateTo, expenseMin, expenseTo 전송하여 쿼리 조회 (테이블 생성용)
                        })
                );

                // Brush - rect.selection
                d3.select('rect.selection')
                    .attr('fill', '#56ae77')
                    .attr("fill-opacity", 0.2)
                    .attr('stroke', '#41915f');
                
            } /* function : $Scatter_Plot */
    }
}