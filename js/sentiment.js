// Sentimentanalyse med afinn ordbibliotek
function sentiment(data) {
    var afinn = $.extend(afinn_en, afinn_emoticon);
    var positive = [];
    var negative = []
    for(var i = 0; i < 20; i++) {
        positive[i] = 0;
        negative[i] = 0;
    }
    var linjer = data.split("NYLINJE");
    
    for(var i = 0; i < linjer.length; i++) {
        var linje = linjer[i].split(" ");
        var setningsVurdering = 0;
        for(var j = 0; j < linje.length; j++) {
            if(afinn.hasOwnProperty(linje[j])) {
                var ordVurdering = afinn[linje[j]];
                setningsVurdering += ordVurdering;
            }
        }
        if(setningsVurdering < 0) negative[Math.abs(setningsVurdering)]++;
        if(setningsVurdering > 0) positive[setningsVurdering]++;
    }
    negative = konverterTilNegativeTall(negative);
    //negative = fjernNullVerdier(negative);
    //positive = fjernNullVerdier(positive);
    console.log("positive " + positive);
    console.log("negative " + negative);
    tegnSentimentChart(negative.concat(positive));
}

function konverterTilNegativeTall(arr) {
    for(var i = 0; i < arr.length; i++) {
        arr[i] = -Math.abs(arr[i]);
    }
    return arr;
}

function fjernNullVerdier(arr) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === 0) {
            arr.splice(i, 1);
        }
    }
    return arr;
}



function tegnSentimentChart(data) {
    //var data = [100, -100, -150, 55, 150, 120, 450, 980, 1200];

    var leftMargin = 50;  // Space to the left of first bar; accomodates y-axis labels
    var rightMargin = 10; // Space to the right of last bar
    var margin = {left: leftMargin, right: rightMargin, top: 10, bottom: 10};
    var barWidth = 30;  // Width of the bars
    var chartHeight = 350;  // Height of chart, from x-axis (ie. y=0)
    var chartWidth = margin.left + data.length * barWidth + margin.right;

    // This scale produces negative output for negative input 
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data)])
                   .range([0, chartHeight]);

    
     // We need a different scale for drawing the y-axis. It needs
     // a reversed range, and a larger domain to accomodate negaive values.
    var yAxisScale = d3.scaleLinear()
                       .domain([d3.min(data), d3.max(data)])
                       .range([chartHeight - yScale(d3.min(data)), 0 ]);

    var svg = d3.select('#sentimentTarget').append("svg");
    svg
        .attr('height', chartHeight + 250)
        .attr('width', chartWidth)
        .style('border', '1px solid');

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d, i) { return margin.left + i * barWidth; })
        .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d));})
        .attr("height", function(d) { return Math.abs(yScale(d)); })
        .attr("width", barWidth)
        .style("fill", "grey")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", function(d, i) { return 1 });

    var yAxis = d3.axisLeft(yAxisScale);
    
    svg.append('g')
      .attr('transform', function(d) {
        return 'translate(' + margin.left + ', 0)';
      })
      .call(yAxis);

}

