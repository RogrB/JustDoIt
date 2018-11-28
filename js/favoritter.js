$.ajax({
    type: "GET",
    url: 'data/favoritter.txt',
    async: true,
    dataType: 'text',
    contentType: "text/plain",
    crossDomain: true,
    success: function (data) {
        sorterFavoritter(data);
    }
});

function sorterFavoritter(str) {
    var favoritter = [];
    var linjer = str.split('|');
    for (var i = 0; i < linjer.length; i++) {
        var linje = linjer[i].split(" ");
        var antall = parseInt(linje[0]); // første ordet i linja
        var tweet = linjer[i].substr(linjer[i].indexOf(" ") + 1); // må fjerne første og de 2 siste ordene
        tweet = tweet.substring(0, tweet.lastIndexOf(" "));
        tweet = tweet.substring(0, tweet.lastIndexOf(" ")); // To ganger for å fjerne | seperatør og forfatter
        var forfatter = linje[linje.length - 2]; // nest siste ordet i linja

        favoritter.push({
            "antall": antall,
            "forfatter": forfatter,
            "tweet" : tweet
        });
        
    }

    favoritter.sort(function (a, b) {
        return parseFloat(b.antall) - parseFloat(a.antall);
    });
    
    favoritter.length = 50;
    tegnBarChart(favoritter);
}

// Temp array for å problemsøke
//var favoritter2 = [{ "antall": 187, "forfatter": "julenissen", "tweet": "testeste" }, { "antall": 87, "forfatter": "sibbe", "tweet": "testeste" }, { "antall": 56, "forfatter": "sausenebb", "tweet": "testeste" }, { "antall": 23, "forfatter": "groms", "tweet": "testeste" }, { "antall": 69, "forfatter": "skrotmuffin", "tweet": "testeste" }];

function tegnBarChart(favoritter) {
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
    var svg = d3.select("#favoritter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Scale the range of the data in the domains
    x.domain([0, d3.max(favoritter, function (d) { return d.antall; })]);
    y.domain(favoritter.map(function (d) { return d.forfatter; }));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(favoritter)
        .enter().append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function (d) { return x(d.antall); })
        .attr("y", function (d) { return y(d.forfatter); })
        .attr("height", y.bandwidth());

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

}

