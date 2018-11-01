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

