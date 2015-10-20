/**
 * @author keremyucel
 */

var mainCanvas = document.getElementById('mainCanvas');
var miniCanvas = document.getElementById('miniCanvas');
var context = mainCanvas.getContext('2d');


function make_base() {
	base_image = new Image();
	base_image.src = "ABC.jpg";

	base_image.crossOrigin = 'Anonymous';
	base_image.onload = (function() {
		mainCanvas.height = mainCanvas.width * (base_image.height / base_image.width);
		mainCanvas.width = base_image.width * 0.5;
		mainCanvas.height = base_image.height * 0.5;
		context.drawImage(base_image, 0, 0, mainCanvas.width, mainCanvas.height);

	});
}

// number of channels
var channel_max = 10;
audiochannels = new Array();
// prepare the channels
for ( a = 0; a < channel_max; a++) {
	audiochannels[a] = new Array();
	// create a new audio object
	audiochannels[a]['channel'] = new Audio();
	// expected end time for this channel
	audiochannels[a]['finished'] = -1;	
}

function play_multi_sound(s) {
	for ( a = 0; a < audiochannels.length; a++) {
		thistime = new Date();
		if (audiochannels[a]['finished'] < thistime.getTime()) {// is this channel finished?
			audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration * 1000;
			audiochannels[a]['channel'].src = document.getElementById(s).src;
			audiochannels[a]['channel'].load();
			audiochannels[a]['channel'].play();
			break;
		}
	}
}

function playSound(r, g, b) {
	//TODO Kontrol edilip tÃ¼m aralÄ±klar hesaplanacak

	//DO
	if ((r >= 128 && r <= 255) && (g >= 0 && g <= 128) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio1');
		$('#nota').html("--- DO ---");
	}
	//RE
	if ((r >= 128 && r <= 255) && (g >= 70 && g <= 198) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio2');
		$('#nota').html("--- RE ---");
	}
	//MÄ°
	if ((r >= 128 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio3');
		$('#nota').html("--- MÄ° ---");
	}
	//FA
	if ((r >= 77 && r <= 204) && (g >= 102 && g <= 230) && (b >= 25 && b <= 152)) {
		play_multi_sound('multiaudio4');
		$('#nota').html("--- FA ---");
	}
	//SOL
	if ((r >= 23 && r <= 150) && (g >= 70 && g <= 197) && (b >= 44 && b <= 171)) {
		play_multi_sound('multiaudio5');
		$('#nota').html("--- SOL ---");
	}
	//LA
	if ((r >= 12 && r <= 163) && (g >= 12 && g <= 163) && (b >= 56 && b <= 198)) {
		play_multi_sound('multiaudio6');
		$('#nota').html("--- LA ---");
	}
	//SÄ°
	if ((r >= 51 && r <= 178) && (g >= 26 && g <= 153) && (b >= 76 && b <= 204)) {
		play_multi_sound('multiaudio7');
		$('#nota').html("--- SÄ° ---");
	}

}

function findPos(obj) {
	var curleft = 0,
	    curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return {
			x : curleft,
			y : curtop
		};
	}
	return undefined;
}

function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * 1.Gelen pixellerin sadece ortalamasÄ±nÄ± al Ã§Ä±kan sonucu Ã§al.
 * E = Epsilon
 * E(red)/array.size,E(green)/array.size,E(blue)/array.size 
 * 
 * (Ãœst madde bitmeden deneme)
 * 2.Gelen arraydeki renk kodlarÄ±nÄ± aralÄ±klara gÃ¶re sÄ±nÄ±flandÄ±r.
 * Hangi renkten kaÃ§ar tane olduklarÄ±na bak, aynÄ± anda 2 veya 3 nota Ã§alÄ±nabilirmi dene.
 *
 * (Ãœst madde bitmeden deneme)
 * 3.Bulunan renklerin oranlarÄ±na gÃ¶re notanÄ±n Ã§alma sÃ¼resini uzatÄ±lÄ±p kÄ±saltÄ±labilirmi?
 * 400lÃ¼k array de, 300 kÄ±rmÄ±zÄ± 100 sarÄ± varsa;
 * 3/4lÃ¼k bir buruÅŸun 4/4lÃ¼k tam notasÄ±nÄ± kÄ±rmÄ±zÄ±
 * 1/4lÃ¼k Ã§eyreÄŸi sarÄ± Ã§alsÄ±n.
 */
//x,y karenin boyutu x*y
//Neden x*x deÄŸil Ã§Ã¼nkÃ¼ dikdÃ¶rtgen de olsun istiyorum bÃ¼tÃ¼n x leri y olarak
//deÄŸiÅŸtirmek istemedim.
var percentage = 0;// progress bar iÃ§in
var noteSquence = [];
function findPixelRanges (pixelCalculationArray, x, y){
	var red_Total = 0;
		green_Total = 0;
		blue_Total = 0;
	var info;
	var dump =[];
	
	//TÃ¼m arrayin iÃ§indeki rgb deÄŸerlerinin toplamlarÄ±	
	for (var i = 0; i < pixelCalculationArray.length ; i++) {
		
		red_Total += pixelCalculationArray[i][0];
		green_Total += pixelCalculationArray[i][1];
		blue_Total += pixelCalculationArray[i][2];
	};

	dump.push(red_Total = red_Total / pixelCalculationArray.length);
	dump.push(green_Total = green_Total / pixelCalculationArray.length);
	dump.push(blue_Total = blue_Total / pixelCalculationArray.length);
	
	noteSquence.push(dump);
	
	//Ekrana bilgi yazdÄ±r.
	info = x + "x" + y + " square's pixel average values";
	$('#result_1').html(info + "<br>" +"RGB :" + red_Total + ", " + green_Total + ", " + blue_Total);
	
	//playSound(red_Total, green_Total, blue_Total);
	/*var millisecondsToWait = 300;
	setTimeout(function() {
		playSound(red_Total, green_Total, blue_Total);
		//ARALIKLARDA SORUN VAR
	}, millisecondsToWait); */

	//progressBar(x,y);
}

/*
function progressBar (x, y){
	
	var progressBar = document.getElementById('progressBar');
	var	progressStatus = document.getElementById('progressStatus');
	
	var	a = mainCanvas.height / x;
	var	b = mainCanvas.width / y;	
	var	multiplier = 100/(a+b);
		
		percentage+=multiplier;
		progressStatus.innerHTML =  percentage+"%";
		progressBar.value = percentage;
	
}
*/
	
function findPixelSummations (){
	var x1 = 0;
		y1 = 0;
		x2 = 40; //otomatik alÄ±nacak
		y2 = 40;		
		pixelCalculationArray = [];
		c = mainCanvas.getContext('2d');
		//pixelProperties = c.getImageData(x1, y1, 1, 1).data;
	var x_border = mainCanvas.width / x2;
		y_border = mainCanvas.height /y2;
		
	//x border degil y border olacak
	while (y_border > 0) {
		pixelCalculationArray = [];
		
		//burdaki for lar sadece x2 ye y2 bÃ¼yÃ¼klÃ¼ÄŸÃ¼ndeki bir parÃ§ayÄ± hesaplÄ±yor
		for (var i = 0; i < x2; i++) {
			for (var j = 0; j < y2; j++) {
				pixelProperties = c.getImageData(x1, y1, 1, 1).data;
				pixelCalculationArray.push(pixelProperties);
				y1++;				
			};
			y1 = y1-y2;
		};
		
		x1 = x1 + x2;
		if(x1 + x2 == mainCanvas.width){
			x1 = 0;
			y1 = y1 + y2;
			y_border--;
		}
		
		findPixelRanges(pixelCalculationArray, x2, y2);
		
	}
	//percentage = 0;
	$('#result_1').html("x1 :" + x1 + " y1 :" + y1 );
	
	/*	
	playSound(pixelProperties[0],
		 pixelProperties[1],
		 pixelProperties[2]);
	*/	
		
}

$('#mainCanvas').mousemove(function(e) {
	var pos = findPos(this);
	var x = e.pageX - pos.x;
	var y = e.pageY - pos.y;
	var coord = "x=" + x + ", y=" + y;
	var c = this.getContext('2d');
	var p = c.getImageData(x, y, 1, 1).data;
	//TEST
	playSound(p[0], p[1], p[2]);
	//TEST
	var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	$('#status').html(coord + "<br>" + hex + "<br>" + "RGB :" + p[0] + ", " + p[1] + ", " + p[2]);

}); 