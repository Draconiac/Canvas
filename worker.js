onmessage = (function(e) {
    //data[0],data[1],data[2],data[3],data[4],data[5] verilerin alınması
    //e.data olabilir bunlar
    /*
     if(e.data[1] !== null)
     var aaa = 'EVET DOGRU ' +e.data[0] + e.data[1];
     else
     var aaa = 'EVET DOGRU ' +e.data[0] + ' GELMEDİ OLMADI';

     postMessage(aaa);
     */

    var c = e.data[0];
    //Arrayin içindeki ilk 3 veri RGB 4cü Alpha için
    var x1 = e.data[1];
    var y1 = e.data[2];
    var x2 = e.data[3];
    var y2 = e.data[4];
    var y_border = e.data[5];
    var canvasWidth = e.data[6];

    //var aaa = '---'+ c + ',' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ',' + y_border + ',' + canvasWidth;
    var index = 0;
    var pixelCalculationArray = [];
    //while (y_border > 0) {
    //	pixelCalculationArray = [];
    for (var i = 0; i < x2; i++) {
        for (var j = 0; j < (4 * y2); j += 4) {
            //c.getImageData workerda tanımlı değil
            //buraya zaten array geliyor
            //pixelProperties = c.getImageData(x1, y1, 1, 1).data;
            pixelProperties = [c[j], c[j + 1], c[j + 2]];
            pixelCalculationArray[index] = pixelProperties;
            //postMessage('WORKER ÇALIŞTI 3');
            index++;
            //postMessage('WORKER ÇALIŞTI 4');
            y1++;

            pixelProperties = [];
            //bu arrayi bosaltak gerekiyor

        };
        //		y1 = y1-y2;
    };
    postMessage([pixelCalculationArray, x2, y2]);
    //	x1 = x1 + x2;
    //if(x1 + x2 == mainCanvas.width || x1 + x2 > mainCanvas.width ){
    //	if(x1 + x2 == canvasWidth || x1 + x2 > canvasWidth ){
    //		x1 = 0;
    //		y1 = y1 + y2;
    //		y_border--;
    //	}
    //findPixelRanges(pixelCalculationArray, x2, y2);

    //}//en of while
    //postMessage('WORKER ÇALIŞTI');
}); 