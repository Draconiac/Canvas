
onmessage = (function(e){
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
	var	x1 = e.data[1];	
	var	y1 = e.data[2];	
	var	x2 = e.data[3];	
	var	y2 = e.data[4];	
	var	y_border = e.data[5];	
	var	canvasWidth = e.data[6];		
	
	//var aaa = '---'+ c + ',' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ',' + y_border + ',' + canvasWidth;	
			
	while (y_border > 0) {
		
		pixelCalculationArray = [];			
		for (var i = 0; i < x2; i++) {
			
			for (var j = 0; j < y2; j++) {
				
				//c.getImageData workerda tanımlı değil
				//buraya zaten array geliyor surayla okunacak okadar
				//pixelProperties = c.getImageData(x1, y1, 1, 1).data;
				pixelProperties = [c[i], c[i+1], c[i+2]];
				
				//pixelCalculationArray.push(pixelProperties);
				pixelCalculationArray[i] = pixelProperties;				
				y1++;	
				pixelProperties =[];//bu arrayi bosaltak gerekiyor			
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
	}//en of while
	postMessage('WORKER ÇALIŞTI');
});