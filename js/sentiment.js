// Sentimentanalyse med afinn ordbibliotek
function sentiment(data) {
    var afinn = $.extend(afinn_en, afinn_emoticon);
    var positive = [];
    var negative = [];
    var tweets = [];
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
        tweets.push(leggTilTweet(linje, setningsVurdering));
    }
    negative = konverterTilNegativeTall(negative);
    sorterSentimentTweets(tweets);
    tegnSentimentChart(positive, negative);
}

function konverterTilNegativeTall(arr) {
    for(var i = 0; i < arr.length; i++) {
        arr[i] = -Math.abs(arr[i]);
    }
    return arr;
}

function leggTilTweet(str, vurdering) {
    var linje = str.join(' ');
    return {
        "tweet": linje,
        "sentiment": vurdering
    };
}

function sorterSentimentTweets(tweets) {
    tweets.sort(function (a, b) {
        return parseFloat(b.sentiment) - parseFloat(a.sentiment);
    });
    hentTopLister(tweets);
}

function hentTopLister(tweets) {
    var negativeTweets = tweets.slice(-5);
    var posititiveTweets = tweets
    posititiveTweets.length = 5;
    visToplister(negativeTweets, posititiveTweets);
}

function visToplister(negativeTweets, posititiveTweets) {
    var output = "";
    output += "<h4 style='color: #ffffff'>Positive Tweets:</h4>";
    for(var i = 0; i < posititiveTweets.length; i++) {
        output += "<i>" + posititiveTweets[i].tweet;
        output += "</i><br>";
        output += "Sentimentscore: <i><span class='gulTekst'>" + posititiveTweets[i].sentiment;
        output += "</span></i><hr>";
    }
    output += "<br><br>";
    output += "<h4 style='color: #ffffff'>Negative Tweets:</h4>";
    for(var i = 0; i < negativeTweets.length; i++) {
        output += "<i>" + negativeTweets[i].tweet;
        output += "</i><br>";
        output += "Sentimentscore: <i><span class='gulTekst'>" + negativeTweets[i].sentiment;
        output += "</span></i><hr>";
    }
    $("#sentimentToplisteTarget").html(output);
}

function tegnSentimentChart(positive, negative) {

    var leftMargin = 50;
    var rightMargin = 10;
    var margin = {left: leftMargin, right: rightMargin, top: 10, bottom: 10};
    var barWidth = 30;
    var chartHeight = 350;
    var chartWidth = margin.left + positive.length * barWidth + margin.right;

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(positive)])
                   .range([0, chartHeight]);

    /*
    var yAxisScale = d3.scaleLinear()
                       .domain([d3.min(negative), d3.max(positive)])
                       .range([chartHeight - yScale(d3.min(negative)), 0 ]);
    */
   var xAxisScale = d3.scaleLinear()
        .domain([0, 20])
        .range([0, 600]);

    var svg = d3.select('#sentimentTarget').append("svg");
    svg
        .attr('height', chartHeight + 250)
        .attr('width', chartWidth)
        .attr("id", "sentimentSVG")
        .style('border', '1px solid');

    svg
      .selectAll("positiveBars")
      .data(positive)
      .enter()
      .append("rect")
        .attr("x", function(d, i) { return margin.left + i * barWidth; })
        .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d));})
        .attr("height", function(d) { return Math.abs(yScale(d)); })
        .attr("width", barWidth)
        .attr("class", "positiveBars")
        .style("fill", "steelblue")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", function(d, i) { return 1 })
        .on("mouseover", function (d) { infoBoks(d, "sentiment"); })
        .on("mouseout", function () { fjernInfoBoks(); });

    svg
        .selectAll("negativeBars")
        .data(negative)
        .enter()
        .append("rect")
          .attr("x", function(d, i) { return margin.left + i * barWidth; })
          .attr("y", function(d, i) { return chartHeight - Math.max(0, yScale(d));})
          .attr("height", function(d) { return Math.abs(yScale(d)); })
          .attr("width", barWidth)
          .attr("class", "negativeBars")
          .style("fill", "red")
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .style("opacity", function(d, i) { return 1 })
          .on("mouseover", function (d) { infoBoks(d, "sentiment"); })
          .on("mouseout", function () { fjernInfoBoks(); });        

    //var yAxis = d3.axisLeft(yAxisScale);
    var xAsis = d3.axisBottom(xAxisScale);
    
    svg.append('g')
      .attr('transform', function(d) {
        return 'translate(' + margin.left + ', 0)';
      })
      .call(xAsis);

    svg.append("text")
        .attr("x", (chartWidth/2) - 15)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Sentiment Score");

    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -190)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Positive Tweets");

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -430)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text("Negative Tweets");        
}

