// Kartdata

function viskartData(data) {
    var kartsvg = d3.select("#kart")
    .append("svg")
    .attr("width", 960)
    .attr("height", 600)
    .style('border', '1px solid');
    var projection = d3.geoMercator();

    var path = d3.geoPath()
    .projection(projection)

    var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    d3.json(url, function(error, countries) {
        if (error) console.log(error);
    
        kartsvg.selectAll("path")
            .data(countries.features)
            .enter().append("path")
            .attr("d", path)
            .on("mouseover",function(d) {
                d3.select(this)
                .classed("active",true)
            })
            .on("mouseout",function(d){
                d3.select(this)
                .classed("active",false)
            });
        
        kartsvg.selectAll("circle")
            .data(data.items)
            .enter().append("circle")
            .attr('r',5)
            .attr('cx',function(d) { return projection(d.coordinates)[0];})
            .attr('cy',function(d) { return projection(d.coordinates)[1];})
            .on("mouseover",function(d) {
                d3.select(this)
                .classed("active",true)
            })
            .on("mouseout",function(d){
                d3.select(this)
                .classed("active",false)
            })
        })
}
