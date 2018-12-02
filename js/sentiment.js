// Sentimentanalyse med afinn ordbibliotek
function sentiment(data) {
    var afinn = $.extend(afinn_en, afinn_emoticon);
    var positive = [];
    var negative = []
    for(var i = 0; i < 20; i++) {
        positive[i] = 0;
        negative[i] = 0;
    }
    var linjer = data.split("NYLINJE");
    
    for(var i = 0; i < linjer.length; i++) {
        var linje = linjer[i].split(" ");
        var setningsVurdering = 0;
        for(var j = 0; j < linje.length; j++) {
            if(afinn.hasOwnProperty(linje[j])) {
                var ordVurdering = afinn[linje[j]];
                setningsVurdering += ordVurdering;
            }
        }
        if(setningsVurdering < 0) negative[Math.abs(setningsVurdering)]++;
        if(setningsVurdering > 0) positive[setningsVurdering]++;
    }
    console.log("positive " + positive);
    console.log("negative " + negative);
}

