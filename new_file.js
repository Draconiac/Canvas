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
	}
	//RE
	if ((r >= 128 && r <= 255) && (g >= 70 && g <= 198) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio2');
	}
	//Mİ
	if ((r >= 128 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio3');
	}
	//FA
	if ((r >= 77 && r <= 204) && (g >= 102 && g <= 230) && (b >= 25 && b <= 152)) {
		play_multi_sound('multiaudio4');
	}
	//SOL
	if ((r >= 23 && r <= 150) && (g >= 70 && g <= 197) && (b >= 44 && b <= 171)) {
		play_multi_sound('multiaudio5');
	}
	//LA
	if ((r >= 12 && r <= 163) && (g >= 12 && g <= 163) && (b >= 56 && b <= 198)) {
		play_multi_sound('multiaudio6');
	}
	//Sİ
	if ((r >= 51 && r <= 178) && (g >= 26 && g <= 153) && (b >= 76 && b <= 204)) {
		play_multi_sound('multiaudio7');
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

function findPixelSummations (){
	var x1 = 242;
		y1 = 61;
		x2 = 20; //otomatik alınacak
		y2 = 20;		
		pixelCalculationArray = [x2*y2];
		c = mainCanvas.getContext('2d');
		p = c.getImageData(x1, y1, 1, 1).data;
		
	playSound(p[0], p[1], p[2]);
		
		
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