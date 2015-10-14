$.getScript("myScripts.js", function(){});
//test2

/**
 * 
 * @param {Object} s
 */
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
/**
 * 
 * @param {Object} obj
 */
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/**
 * 
 * @param {Object} r
 * @param {Object} g
 * @param {Object} b
 */
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


$('#example').mousemove(function(e) {
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
    $('#status').html(coord + "<br>" + hex + "<br>" + "RGB :" + p[0] + ", "+ p[1]+ ", "+ p[2]);
	
});	