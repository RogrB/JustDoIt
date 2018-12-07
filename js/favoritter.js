// Favoritter - Bar chart

function sorterFavoritter(str) {
    var favoritter = [];
    var linjer = str.split('|');
    for (var i = 0; i < linjer.length; i++) {
        var linje = linjer[i].split(" ");
        var antall = parseInt(linje[0]); // f�rste ordet i linja
        var tweet = linjer[i].substr(linjer[i].indexOf(" ") + 1); // m� fjerne f�rste og de 2 siste ordene
        tweet = tweet.substring(0, tweet.lastIndexOf(" "));
        tweet = tweet.substring(0, tweet.lastIndexOf(" ")); // To ganger for � fjerne | seperat�r og forfatter
        tweet = fjernTags(tweet);
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
    tegnFavoritterBarChart(favoritter);
}

// Filtrerer ut @ tags i tweeten
function fjernTags(str) {
    var regexp = new RegExp('@([^\\s]*)', 'g');
    return str.replace(regexp, ' ');
}

function tegnFavoritterBarChart(favoritter) {
    
    var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        , width = window.innerWidth - margin.left - margin.right - 225
        , height = window.innerHeight - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);

    var svg = d3.select("#favoritter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style('border', '1px solid')
        .attr("id", "favoritterSVG")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain([0, d3.max(favoritter, function (d) { return d.antall; })]);
    y.domain(favoritter.map(function (d) { return d.forfatter; }));

    svg.selectAll(".bar")
        .data(favoritter)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) { return x(d.antall); })
        .attr("y", function (d) { return y(d.forfatter); })
        .attr("height", y.bandwidth())
        .on("mouseover", function (d) { infoBoks(d, "favoritter"); })
        .on("mouseout", function () { fjernInfoBoks(); })
        .on("click", function (d) { printTweet(d, "favoritter"); })
        .on("touchstart", function (d) { printTweet(d, "favoritter"); });

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -190)
        .attr("y", -25)
        .attr("text-anchor", "middle")
        .text("Tweets");        
        /*
    svg.append("g")
        .call(d3.axisLeft(y));*/

}

