timeForTime();

$.ajax({
    type: "GET",
    url: 'data/tweetTekst.txt',
    async: true,
    dataType: 'text',
    contentType: "text/plain",
    crossDomain: true,
    success: function (data) {
        tellOrd(data);
        sentiment(data);
    }
});