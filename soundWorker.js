onmessage = (function(e){
	
	var array = e.data[0];	
	for (var i = 0; i < array.length; i+=3){
		
		//setTimeout(playSound(array[i], array[i+1], array[i+2]), 500);
		playSound(array[i], array[i+1], array[i+2]);
		postMessage('WORKER ÇALIŞTI 123');
	}	
});

function playSound(r, g, b) {
	//TODO Kontrol edilip tüm aralıklar hesaplanacak
	r = parseInt(r);
	g = parseInt(g);
	b = parseInt(b);
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
	
	if ((r >= 10.0 && r <= 255.0) && (g >= 10.0 && g <= 255.0) && (b >= 0.0 && b <= 280.0)) {
		play_multi_sound('multiaudio7');
		$('#nota').html("--- OZEL DURUM Sİ ---");
	}

}