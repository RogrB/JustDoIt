// Antall Ord - Bubble chart

$.ajax({
    type: "GET",
    url: 'data/tweetTekst.txt',
    async: true,
    dataType: 'text',
    crossDomain: true,
    success: function (data) {
        tellOrd(data);
    }
});

function tellOrd(str) {
    var ordTellerRaw = {};
    var ord = str.split(/\b/);

    for (var i = 0; i < ord.length; i++) {
        if (ord[i].length > 2) {
            ord[i] = ord[i].toLowerCase();
            ordTellerRaw["_" + ord[i]] = (ordTellerRaw["_" + ord[i]] || 0) + 1;
        }
    }

    var data = [];
    for (var ord in ordTellerRaw) {
        data.push([ord, ordTellerRaw[ord]]);
    }

    data.sort(function (a, b) {
        return b[1] - a[1];
    });

    data.length = 50;

    console.log(data);
}

dataset = {
    "children": [{
        "facilityId": "FAC0001",
        "responseCount": 2
    }, {
        "facilityId": "FAC0006",
        "responseCount": 2
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
        return !d.children
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

d3.select(self.frameElement)
    .style("height", diameter + "px");

