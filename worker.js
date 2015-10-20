//function findPixelSummations (){
onmessage = (function(event){
	var x1 = 0;
		y1 = 0;
		x2 = 40; //otomatik alınacak
		y2 = 40;		
		pixelCalculationArray = [];
		c = mainCanvas.getContext('2d');		
	var x_border = mainCanvas.width / x2;
		y_border = mainCanvas.height /y2;		
	
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
		if(x1 + x2 == mainCanvas.width || x1 + x2 > mainCanvas.width ){
			x1 = 0;
			y1 = y1 + y2;
			y_border--;
		}
		findPixelRanges(pixelCalculationArray, x2, y2);		
	}//en of while
		
	$('#result_1').html("x1 :" + x1 + " y1 :" + y1 ); 
	postMessage(event.data + "DONE");
	
});