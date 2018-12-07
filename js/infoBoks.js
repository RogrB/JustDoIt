var infoType = "";
var infoBoksSVG;

function infoBoks(data, type) {
    infoType = type;
    hentSVG(data);
}

function hentSVG(data) {
    if (infoType === "retweet") {
        infoBoksSVG = d3.select("#retweetSVG");
        visInfoBoks(data);
    }
    else if(infoType === "favoritter") {
        infoBoksSVG = d3.select("#favoritterSVG");
        visInfoBoks(data);
    }
    else if(infoType === "antallOrd") {
        infoBoksSVG = d3.select("#antallOrdSVG");
        visAntallOrdToolTip(data);
    }
    else if(infoType === "sentiment") {
        infoBoksSVG = d3.select("#sentimentSVG");
        visSentimentToolTip(data);
    }
    else {
        infoBoksSVG = d3.select("#timeForTimeSVG");
        visSentimentToolTip(data);
    }
}

// Tegner en infoboks med data for en enkelt tweet
function visInfoBoks(d) {
    infoBoksSVG.style("cursor", "pointer");
    infoBoksSVG .append("rect")
        .attr("x", (infoBoksSVG.attr("width")/2) - 300)
        .attr("y", (infoBoksSVG.attr("height") / 2) - 200)
        .attr("width", 600)
        .attr("height", 250)
        .attr("fill", d3.rgb(55, 66, 84))
        .attr("stroke", "#2378ae")
        .attr("stroke-linecap", "butt")
        .attr("stroke-width", "3")
        .attr("class", "infoBoks");

    infoBoksSVG.append("text")
        .attr("y", (infoBoksSVG.attr("height") / 2) - 170)
        .attr("x", (infoBoksSVG.attr("width") / 2) - 290)
        .attr("text-anchor", "start")
        .attr("class", "infoBoks")
        .style("font-size", "30px")
        .style("font-family", "'Time New Roman', Times, serif")
        .style("fill", "white")
        .text(d.forfatter + ":");

        var beskrivelsesTekst = "";
        if(infoType === "retweet") {
            beskrivelsesTekst = " retweets";
        }
        else {
            beskrivelsesTekst = " favoritter";
        }

    infoBoksSVG.append("text")
        .attr("y", (infoBoksSVG.attr("height") / 2) - 170)
        .attr("x", (infoBoksSVG.attr("width") / 2) + 290)
        .attr("text-anchor", "end")
        .attr("class", "infoBoks")
        .style("font-size", "24px")
        .style("font-family", "'Time New Roman', Times, serif")
        .style("fill", "white")
        .text(d.antall + beskrivelsesTekst);

    infoBoksSVG.append("foreignObject")
        .attr("y", (infoBoksSVG.attr("height") / 2) - 140)
        .attr("x", (infoBoksSVG.attr("width") / 2) - 290)
        .attr("width", 580)
        .attr("height", 200)
        .attr("text-anchor", "start")
        .attr("class", "infoBoks")
        .style("font-size", "18px")
        .style("font-family", "'Time New Roman', Times, serif")
        .style("fill", "white")
        .html('<div class="tweetTekst"><p>' + d.tweet + '</p></div>');
    
}

function fjernInfoBoks() {
    var infoBoks = d3.selectAll(".infoBoks").remove();
    infoBoksSVG.style("cursor", "initial");
}

function printTweet(d, type) {
    infoType = type;
    var output = "<hr>";
    output += "<p><i><span class='gulTekst'>" + d.antall + "</span></i>";
    if(infoType === "retweet") {
        output += " retweets";
    }
    else {
        output += " favoritter";
    }
    output += "</p><p style='color: #ffffff;'>" + d.tweet + "</p>";
    output += "<p>Skrevet av: <i><span class='gulTekst'>" + d.forfatter + "</span></i></p>";
    output += "<button onclick='fjernPrintTweet()' class='btn btn-info'>Fjern</button>";
    if(type === "retweet") {
        $("#retweetTarget").html(output);
    }
    else {
        $("#favoritterTarget").html(output);
    }
}

function fjernPrintTweet(type) {
    $("#retweetTarget").html("");
    $("#favoritterTarget").html("");
}

function visAntallOrdToolTip(data) {
    infoBoksSVG .append("rect")
        .attr("x", 05)
        .attr("y", 05)
        .attr("width", 125)
        .attr("height", 75)
        .attr("fill", d3.rgb(55, 66, 84))
        .attr("stroke", "#2378ae")
        .attr("stroke-linecap", "butt")
        .attr("stroke-width", "3")
        .attr("class", "infoBoks");
  
    infoBoksSVG.append("foreignObject")
        .attr("y", 10)
        .attr("x", 10)
        .attr("width", 115)
        .attr("height", 65)
        .attr("text-anchor", "start")
        .attr("class", "infoBoks")
        .style("font-size", "18px")
        .style("font-family", "'Time New Roman', Times, serif")
        .style("fill", "white")
        .html('<div class="tweetTekst"><p>' + data.data.ord + "<br>Antall: "
        + data.data.antall + '</p></div>');
}

function visSentimentToolTip(data) {

    infoBoksSVG .append("rect")
        .attr("x", infoBoksSVG.attr("width") - 130)
        .attr("y", 20)
        .attr("width", 125)
        .attr("height", 75)
        .attr("fill", d3.rgb(55, 66, 84))
        .attr("stroke", "#2378ae")
        .attr("stroke-linecap", "butt")
        .attr("stroke-width", "3")
        .attr("class", "infoBoks");
  
    infoBoksSVG.append("foreignObject")
        .attr("x", infoBoksSVG.attr("width") - 125)
        .attr("y", 25)
        .attr("width", 115)
        .attr("height", 65)
        .attr("text-anchor", "start")
        .attr("class", "infoBoks")
        .style("font-size", "18px")
        .style("font-family", "'Time New Roman', Times, serif")
        .style("fill", "white")
        .html('<div class="tweetTekst"><p>Antall Tweets: <br>' + Math.abs(data) + '</p></div>');
    
}
