onmessage = (function(e) {

    var c = e.data[0];
    //Arrayin içindeki ilk 3 veri RGB 4cü Alpha için
    var x1 = e.data[1];
    var y1 = e.data[2];
    var x2 = e.data[3];
    var y2 = e.data[4];
    var y_border = e.data[5];
    var canvasWidth = e.data[6];

    var index = 0;
    var pixelCalculationArray = [];

    for (var i = 0; i < x2; i++) {
        for (var j = 0; j < (4 * y2); j += 4) {

            var pixelProperties = [c[j], c[j + 1], c[j + 2]];
            pixelCalculationArray[index] = pixelProperties;

            index++;
            y1++;
            pixelProperties = [];
        }
    }
    postMessage([pixelCalculationArray, x2, y2]);

}); 