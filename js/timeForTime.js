// Time for time - lineChart

var data = [356, 413, 703, 416, 275, 182, 168, 138, 114, 130, 153, 326, 373, 383, 395, 383, 181];

// 2. Definerer SVG plassering og marginer
var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = window.innerWidth - margin.left - margin.right // Use the window's width 
    , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// Antall datapoints
var n = data.length;

// 5. X skala - index av data
var xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width]); // output

// Y skala - verdi av data
var maxVerdi = Math.max.apply(null, data);
var yScale = d3.scaleLinear()
    .domain([0, maxVerdi]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function (d) { return yScale(d); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 1. Add the SVG to the page and employ #2
var svg = d3.select("#timeForTime").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(data) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(data)
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

   var focus = svg.append("g")
       .attr("class", "focus")
       .style("display", "none");

   focus.append("circle")
       .attr("r", 4.5);

   focus.append("text")
       .attr("x", 9)
       .attr("dy", ".35em");

   svg.append("rect")
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
         i = bisectDate(data, x0, 1),
         d0 = data[i - 1],
         d1 = data[i],
         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
     focus.select("text").text(d);
}
*/




