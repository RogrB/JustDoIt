// Retweets - Bar chart
$.ajax({
    type: "GET",
    url: 'data/retweeted.txt',
    async: true,
    dataType: 'text',
    contentType: "text/plain",
    crossDomain: true,
    success: function (data) {
        sorterRetweets(data);
    }
});

function sorterRetweets(str) {
    var retweets = [];
    var linjer = str.split('|');
    for (var i = 0; i < linjer.length; i++) {
        var linje = linjer[i].split(" ");
        var antall = parseInt(linje[0]); // f�rste ordet i linja
        var tweet = linjer[i].substr(linjer[i].indexOf(" ") + 1); // m� fjerne f�rste og de 2 siste ordene
        tweet = tweet.substring(0, tweet.lastIndexOf(" "));
        tweet = tweet.substring(0, tweet.lastIndexOf(" ")); // To ganger for � fjerne | seperat�r og forfatter
        tweet = fjernTags(tweet);
        var forfatter = linje[linje.length - 2]; // nest siste ordet i linja
        retweets.push({
            "antall": antall,
            "forfatter": forfatter,
            "tweet": tweet
        });
    }
    retweets.sort(function (a, b) {
        return parseFloat(b.antall) - parseFloat(a.antall);
    });

    retweets.length = 50;
    tegnRetweetsBarChart(retweets);
}

function tegnRetweetsBarChart(retweets) {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#retweets").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style('border', '1px solid')
        .attr("id", "retweetSVG")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data in the domains
    x.domain([0, d3.max(retweets, function (d) { return d.antall; })]);
    y.domain(retweets.map(function (d) { return d.forfatter; }));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(retweets)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) { return x(d.antall); })
        .attr("y", function (d) { return y(d.forfatter); })
        .attr("height", y.bandwidth())
        .on("mouseover", function (d) { infoBoks(d, "retweet"); })
        .on("mouseout", function () { fjernInfoBoks(); })
        .on("click", function (d) { printTweet(d, "retweet"); })
        .on("touchstart", function (d) { printTweet(d, "retweet"); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

/*
function brytOppTekst(str) {
    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 200) + '\r\n';
        str = str.substring(200);
    }
    return result;
}
*/