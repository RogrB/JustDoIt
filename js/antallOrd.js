// Antall Ord - Bubble chart
var antallOrd = { "children" : [] };

$.ajax({
    type: "GET",
    url: 'data/tweetTekst.txt',
    async: true,
    dataType: 'text',
    contentType: "text/plain",
    crossDomain: true,
    success: function (data) {
        tellOrd(data);
    }
});

function tellOrd(str) {
    var ordTellerRaw = {};
    var ord = str.split(/\b/);
    var subArray = [];

    for (var i = 0; i < ord.length; i++) {
        if (ord[i].length > 2) {
            ord[i] = ord[i].toLowerCase();
            ordTellerRaw["_" + ord[i]] = (ordTellerRaw["_" + ord[i]] || 0) + 1;
        }
    }

    for (var ordData in ordTellerRaw) {
        subArray.push({
            "ord": ordData,
            "antall": ordTellerRaw[ordData]
        });
    }

    subArray.sort(function (a, b) {
        return parseFloat(b.antall) - parseFloat(a.antall);
    });

    subArray.length = 50;
    antallOrd.children = subArray;
}

//console.log(antallOrd);

dataset = {
    "children": [{
        "facilityId": "FAC0001",
        "responseCount": 2
    }, {
        "facilityId": "FAC0006",
        "responseCount": 4
    }, {
        "facilityId": "FAC0002",
        "responseCount": 1
    }, {
        "facilityId": "FAC0003",
        "responseCount": 2
    }, {
        "facilityId": "FAC0004",
        "responseCount": 3
    }, {
        "facilityId": "FAC0005",
        "responseCount": 1
    }]
};

//console.log(dataset.children[0]);

var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);
var svg = d3.select("#antallOrd")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) { return d.responseCount; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d) {
        return "blue";
        //return color(d.facilityId);
    });
/*
var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);
var svg = d3.select("#antallOrd")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) { return d.responseCount; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function (d) {
        return d.facilityId + ": " + d.responseCount;
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d) {
        return "blue";
        //return color(d.facilityId);
    });

node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.facilityId.substring(0, d.r / 3) + ": " + d.data.responseCount;
    });


*/
d3.select(self.frameElement)
    .style("height", diameter + "px");

