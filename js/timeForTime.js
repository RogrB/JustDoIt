// Time for time - lineChart

function timeForTime() {
    var timeData = [356, 413, 703, 416, 275, 182, 168, 138, 114, 130, 153, 326, 373, 383, 395, 383, 181];
    tegnLineChart(timeData);
    tegnStreamGraph(timeData);
}

function tegnLineChart(timeData) {
    // 2. Definerer SVG plassering og marginer
    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , width = window.innerWidth - margin.left - margin.right - 30 // Use the window's width 
        , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

    // Antall timeDatapoints
    var n = timeData.length;

    // 5. X skala - index av Data
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output

    // Y skala - verdi av Data
    var maxVerdi = Math.max.apply(null, timeData);
    var yScale = d3.scaleLinear()
        .domain([0, maxVerdi]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) { return yScale(d); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 1. Add the SVG to the page and employ #2
    var infoBoksSVG = d3.select("#timeForTime").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style('border', '1px solid')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    infoBoksSVG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    infoBoksSVG.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the ata, and call the line generator 
    infoBoksSVG.append("path")
        .datum(timeData) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each Datapoint 
    infoBoksSVG.selectAll(".dot")
        .data(timeData)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function (d, i) { return xScale(i) })
        .attr("cy", function (d) { return yScale(d) })
        .attr("r", 5)
        .on("mouseover", function (a, b, c) {
            console.log(a)
            $(this).attr('class', 'focus')
        })
        .on("mouseout", function () { })
        .on("mousemove", mousemove);

    var focus = infoBoksSVG.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .attr("r", 4.5);

    focus.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");

    infoBoksSVG.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

    function mousemove() {
        
    }

    /*
    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(timeData, x0, 1),
            d0 = timeData[i - 1],
            d1 = timeData[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
        focus.select("text").text(d);
    }
    */

}


function tegnStreamGraph(data) {

    var n = 20, // number of layers
    m = 200, // number of samples per layer
    stack = d3.stack().keys(d3.range(n).map(function (d) { return "layer"+d; })).offset(d3.stackOffsetWiggle);

    // Create empty data structures
    var matrix0 = d3.range(m).map(function (d) { return { x:d }; });
    var matrix1 = d3.range(m).map(function (d) { return { x:d }; });

    // Fill them with random data
    d3.range(n).map(function(d) { bumpLayer(m, matrix0, d); });
    d3.range(n).map(function(d) { bumpLayer(m, matrix1, d); });

    var layers0 = stack(matrix0),
        layers1 = stack(matrix1);

    var width = 960,
        height = 500;

    var x = d3.scaleLinear()
        .domain([0, m - 1])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([d3.min(layers0.concat(layers1), function(layer) { return d3.min(layer, function(d) { return d[0]; }); }), d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d[1]; }); })])
        .range([height, 0]);

    var color = d3.scaleLinear()
        .range(["#aad", "#556"]);

    var area = d3.area()
        .x(function(d,i) { return x(d.data.x); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); });

    var svg = d3.select("#streamGraph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style('border', '1px solid');

    svg.selectAll("path")
        .data(layers0)
    .enter().append("path")
        .attr("d", area)
        .style("fill", function() { return color(Math.random()); });

    function transition() {
    d3.selectAll("path")
        .data(function() {
            var d = layers1;
            layers1 = layers0;
            return layers0 = d;
        })
        .transition()
        .duration(2500)
        .attr("d", area);
    }

    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, matrix, layer) {

    function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
        }
    }

    var a = [], i;
    var i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.forEach(function(d, i) { matrix[i]["layer"+layer]=Math.max(0, d)+1; });
    }

}

