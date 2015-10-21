
onmessage = function(e){
//data[0],data[1],data[2],data[3],data[4],data[5] verilerin alınması		
//e.data olabilir bunlar
	
	var c = e.data[0];
		x1 = data[1];
		y1 = data[2];
		x2 = data[3];
		y2 = data[4];
		y_border = data[5];
		canvasWidth = data[6];
		
	while (y_border > 0) {
		pixelCalculationArray = [];			
		for (var i = 0; i < x2; i++) {
			for (var j = 0; j < y2; j++) {
				pixelProperties = c.getImageData(x1, y1, 1, 1).data;
				pixelCalculationArray.push(pixelProperties);
				y1++;				
			};
			y1 = y1-y2;
		};

		x1 = x1 + x2;
		//if(x1 + x2 == mainCanvas.width || x1 + x2 > mainCanvas.width ){
		if(x1 + x2 == canvasWidth || x1 + x2 > canvasWidth ){
			x1 = 0;
			y1 = y1 + y2;
			y_border--;
		}
		//findPixelRanges(pixelCalculationArray, x2, y2);
		var str = "HELLO BU ILK FOR";
		postMessage(str);		
	}//en of while
			
}