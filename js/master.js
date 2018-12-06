timeForTime();
$( document ).ready(function() {

    var favoritter = d3.text("data/favoritter.txt", function(data) {
        sorterFavoritter(data);
    });

    var retweets = d3.text("data/retweeted.txt", function(data) {
        sorterRetweets(data);
    });    

    var tweeTekst = d3.text("data/tweetTekst.txt", function(data) {
        tellOrd(data);
        sentiment(data);
    });

    var kart = d3.json("data/geodata.json", function(data) {
        viskartData(data);
    }); 

});

