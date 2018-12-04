// Antall Ord - Bubble chart

function tellOrd(str) {
    var ordTellerRaw = {};
    var ord = str.split(/\b/);
    var antallOrd = [];

    for (var i = 0; i < ord.length; i++) {
        if (ord[i].length > 2) {
            ord[i] = ord[i].toLowerCase();
            ordTellerRaw[ord[i]] = (ordTellerRaw[ord[i]] || 0) + 1;
        }
    }

    for (var ordData in ordTellerRaw) {
        antallOrd.push({
            "ord": ordData,
            "antall": ordTellerRaw[ordData]
        });
    }

    antallOrd.sort(function (a, b) {
        return parseFloat(b.antall) - parseFloat(a.antall);
    });

    antallOrd.length = 50;
    var output = {
        "children": []
    };
    output.children = antallOrd;
    tegnAntallOrd(output);
}

function tegnAntallOrd(data) {
    var diameter = 600;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(data)
    .size([diameter, diameter])
    .padding(1.5);

    var svg = d3.select("#antallOrd")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .style('border', '1px solid')        
        .attr("id", "antallOrdSVG")
        .attr("class", "bubble");

    var nodes = d3.hierarchy(data)
        .sum(function (d) { return d.antall; });

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
            return d.ord + ": " + d.antall;
        });

    node.append("circle")
        .attr("r", function (d) {
            //console.log(d);
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
            return d.data.ord.substring(0, d.r / 3) + ": " + d.data.antall;
        });



    d3.select(self.frameElement)
        .style("height", diameter + "px");
}
