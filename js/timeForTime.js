// Time for time - lineChart

function timeForTime() {
    var timeData = [356, 413, 703, 416, 275, 182, 168, 138, 114, 130, 153, 326, 373, 383, 395, 383, 181];
    tegnLineChart(timeData);
}

function tegnLineChart(timeData) {

    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , width = window.innerWidth - margin.left - margin.right - 30 // Bruker vinduets bredde 
        , height = window.innerHeight - margin.top - margin.bottom; // Bruker vinduets høyde

    var n = timeData.length;

    var xScale = d3.scaleLinear()
        .domain([0, n - 1])
        .range([0, width]);

    var maxVerdi = Math.max.apply(null, timeData);
    var yScale = d3.scaleLinear()
        .domain([0, maxVerdi])
        .range([height, 0]);

    var line = d3.line()
        .x(function (d, i) { return xScale(i); })
        .y(function (d) { return yScale(d); })
        .curve(d3.curveMonotoneX);

    var svg = d3.select("#timeForTime").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "timeForTimeSVG")
        .style('border', '1px solid')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));

    svg.append("path")
        .datum(timeData)
        .attr("class", "line")
        .attr("d", line);

    svg.selectAll(".dot")
        .data(timeData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function (d, i) { return xScale(i) })
        .attr("cy", function (d) { return yScale(d) })
        .attr("r", 5)
        .on("mouseover", function (d) {
            infoBoks(d, "timeForTime");
        })
        .on("mouseout", function () { fjernInfoBoks(); })

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .attr("r", 4.5);

    focus.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");

}


