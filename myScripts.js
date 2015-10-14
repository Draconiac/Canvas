$.getScript("externalScripts.js", function(){});
/**
 *Kullanılacak fotoğrafın ekrana getirilmesi 
 */
function make_base(){
	base_image = new Image();	
	base_image.src = "ABC.jpg";		
	//base_image.src = "http://localhost/demo/ABC.jpg";
	//base_image.src = "C:/Users/keremyucel.DOMAIN/Desktop/web/Yeni klasör/ABC.jpg";	
	base_image.crossOrigin = 'Anonymous';
	base_image.onload = (function (){
		canvas_1.height = canvas_1.width * (base_image.height / base_image.width);
		canvas_1.width = base_image.width * 0.5;
		canvas_1.height = base_image.height * 0.5;
		context.drawImage(base_image, 0, 0, canvas_1.width, canvas_1.height);
		
	});	
}


/**
 * RGB ye gelen değerlere göre belirlenen aralıklardaki notayı çalar<p>
 * @param {int} r 
 * @param {int} g 
 * @param {int} b 
 * 
 */
function playSound(r, g, b) {
	if ((r >= 12 && r <= 163) && (g >= 12 && g <= 163) && (b >= 56 && b <= 198)) {
		play_multi_sound('multiaudio1');
	}
	if ((r >= 128 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
		play_multi_sound('multiaudio2');
	}

}


