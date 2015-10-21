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
	//TODO Kontrol edilip tüm aralıklar hesaplanacak

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
	//Mİ
	if ((r >= 128 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio3');
		$('#nota').html("--- Mİ ---");
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
	//Sİ
	if ((r >= 51 && r <= 178) && (g >= 26 && g <= 153) && (b >= 76 && b <= 204)) {
		play_multi_sound('multiaudio7');
		$('#nota').html("--- Sİ ---");
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
 * 1.Gelen pixellerin sadece ortalamasını al çıkan sonucu çal.
 * E = Epsilon
 * E(red)/array.size,E(green)/array.size,E(blue)/array.size 
 * 
 * (Üst madde bitmeden deneme)
 * 2.Gelen arraydeki renk kodlarını aralıklara göre sınıflandır.
 * Hangi renkten kaçar tane olduklarına bak, aynı anda 2 veya 3 nota çalınabilirmi dene.
 *
 * (Üst madde bitmeden deneme)
 * 3.Bulunan renklerin oranlarına göre notanın çalma süresini uzatılıp kısaltılabilirmi?
 * 400lük array de, 300 kırmızı 100 sarı varsa;
 * 3/4lük bir buruşun 4/4lük tam notasını kırmızı
 * 1/4lük çeyreği sarı çalsın.
 */
//x,y karenin boyutu x*y
//Neden x*x değil çünkü dikdörtgen de olsun istiyorum bütün x leri y olarak
//değiştirmek istemedim.
var percentage = 0;// progress bar için
var noteSquence = [];
function findPixelRanges (pixelCalculationArray, x, y){
	var red_Total = 0;
		green_Total = 0;
		blue_Total = 0;
	var info;
	var dump =[];
	
	//Tüm arrayin içindeki rgb değerlerinin toplamları	
	for (var i = 0; i < pixelCalculationArray.length ; i++) {
		
		red_Total += pixelCalculationArray[i][0];
		green_Total += pixelCalculationArray[i][1];
		blue_Total += pixelCalculationArray[i][2];
	};

	dump.push(red_Total = red_Total / pixelCalculationArray.length);
	dump.push(green_Total = green_Total / pixelCalculationArray.length);
	dump.push(blue_Total = blue_Total / pixelCalculationArray.length);
	
	noteSquence.push(dump);
	
	//Ekrana bilgi yazdır.
	info = x + "x" + y + " square's pixel average values";
	$('#result_1').html(info + "<br>" +"RGB :" + red_Total + ", " + green_Total + ", " + blue_Total);
	
	//playSound(red_Total, green_Total, blue_Total);	
}

//worker denemesi için
var myWorker;
function findPixelSummations (){
	
	var x1 = 0;
		y1 = 0;
		x2 = 40; //otomatik alınacak
		y2 = 40;		
		pixelCalculationArray = [];
		c = mainCanvas.getContext('2d');
	var x_border = mainCanvas.width / x2;
		y_border = mainCanvas.height /y2;
	

		
	//Web worker desteği varmı ?
	if(typeof(Worker) !== "undefined"){
		//worker tanımlı değilse worker oluştur
		if(typeof(myWorker) == "undefined"){
			myWorker = new Worker("worker.js");
		}
		
		//c yi gönderince saçmaladı
		// canvasın kendini yollayamadım ama parçalı şekilde gidebiliyor getImage datayı alınca;
		var rea = c.getImageData(x1, y1, 2, 2).data;
		myWorker.postMessage(['Doğru yoldamıyım', rea]);
		
		
		//workerdan dönen sonuç
		myWorker.onmessage = function(e){
			//document.getElementById("result").innerHTML = event.data;
			window.alert(e.data);
			$('#textArea').html(e.data);
			
			//findPixelRanges(pixelCalculationArray, x2, y2);
		};
		
		
		//worker a gönderilecek olan parametreler vs...
		//ex: postMessage([firstData, secondData])
		
		//myWorker.postMessage([c, x1, y1, x2, y2, y_border, mainCanvas.width]);
		var a = 0;
	}else{
		window.alert("Browser'ın Web worker desteği yoktur.");
	}
	
	/* Bunu SİLME
	//terminate worker
	w.terminate(); 
	//make it undefined
    w = undefined;
    */
	
}
/*
function findPixelSummations (){
	var x1 = 0;
		y1 = 0;
		x2 = 40; //otomatik alınacak
		y2 = 40;		
		pixelCalculationArray = [];
		c = mainCanvas.getContext('2d');
	var x_border = mainCanvas.width / x2;
		y_border = mainCanvas.height /y2;
	var partOfAnImage;

	while (y_border > 0) {
		pixelCalculationArray = [];
		//partOfAnImage = c.getImageData(x1, y1, x2, y2).data;
		
		for (var i = 0; i < x2; i++) {
			for (var j = 0; j < y2; j++) {
				//pixelProperties = partOfAnImage.getImageData(x1, y1, 1, 1).data;
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
			
		$('#textArea').html("Part " + ((x1/i)) + " Over");	
	}//end of while
	$('#result_1').html("x1 :" + x1 + " y1 :" + y1 );
}
*/
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