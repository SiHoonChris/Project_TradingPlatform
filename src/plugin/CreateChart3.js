export default {
    install(Vue) {
        Vue.config.globalProperties.$Horizontal_Bar_Chart =
            function(Data, Cont) {            
                const  WIDTH = document.querySelector(Cont).offsetWidth,
                      HEIGHT = document.querySelector(Cont).offsetWidth;
                
                const svg = d3.select(Cont)
                                .append("svg")
                                  .attr("width", WIDTH)
                                  .attr("height", HEIGHT)
                                .append("g")
                                  .attr("transform", `translate(${WIDTH * 0.2}, ${HEIGHT * 0.1})`);
                
                const x = d3.scaleLinear().domain([0, 282836]).range([0, WIDTH * 0.75]);
                // svg.append("g")
                //    .attr("transform", `translate(0, ${height})`)
                //    .call(d3.axisBottom(x))
                //    .selectAll("text")
                //    .attr("transform", "translate(-10,0)rotate(-45)")
                //    .style("text-anchor", "end");
                
                const y = d3.scaleBand().range([ 0, HEIGHT * 0.8 ]).domain(Data.map(d => d.profit)).padding(0.3);
                svg.append("g")
                    .attr("color", "white")
                    .call(d3.axisLeft(y));
            
                svg.selectAll("Rect")
                    .data(Data)
                    .join("rect")
                    .attr("x", x(0) )
                    .attr("y", d => y(d.profit))
                    .attr("width", d => x(d.size))
                    .attr("height", y.bandwidth())
                    .attr("stroke", "white")
                    .attr("fill", "#ff99cc");

            } // $Horizontal_Bar_Chart
    }
}
