/**
 * @author keremyucel
 */
$(document).ready(function() {
});
var mainCanvas = document.getElementById('mainCanvas');
var context = mainCanvas.getContext('2d');

function make_base() {
    var base_image;
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

function playNoteSequence(seq){

    var interval;
    var i = 0;
    interval = setInterval(function(){
        //for (var i = 0; i < seq.length; i++) {
            playSound(seq[i][0], seq[i][1], seq[i][2]);
            $('#textArea').append(seq[i][0] + ' - ' + seq[i][1] + ' - ' + seq[i][2] + '\n');
            i++;
       // }
            if(i >= seq.length)
                clearInterval(interval);
    }
    ,1000);



}

function playSound(r, g, b) {
    //TODO Kontrol edilip tüm aralıklar hesaplanacak
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    //DO
    if ((r >= 128 && r <= 255) && (g >= 0 && g <= 128) && (b >= 0 && b <= 128)) {
        playNote('do');
        $('#nota').html("--- DO ---");
    }
    //RE
    if ((r >= 128 && r <= 255) && (g >= 70 && g <= 198) && (b >= 0 && b <= 128)) {
        playNote('re');
        $('#nota').html("--- RE ---");
    }
    //Mİ
    if ((r >= 128 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
        playNote('mi');
        $('#nota').html("--- Mİ ---");
    }
    //FA
    if ((r >= 77 && r <= 204) && (g >= 102 && g <= 230) && (b >= 25 && b <= 152)) {
        playNote('fa');
        $('#nota').html("--- FA ---");
    }
    //SOL
    if ((r >= 23 && r <= 150) && (g >= 70 && g <= 197) && (b >= 44 && b <= 171)) {
        playNote('sol');
        $('#nota').html("--- SOL ---");
    }
    //LA
    if ((r >= 12 && r <= 163) && (g >= 12 && g <= 163) && (b >= 56 && b <= 198)) {
        playNote('la');
        $('#nota').html("--- LA ---");
    }
    //Sİ
    if ((r >= 51 && r <= 178) && (g >= 26 && g <= 153) && (b >= 76 && b <= 204)) {
        playNote('si');
        $('#nota').html("--- Sİ ---");
    }

    if ((r >= 10.0 && r <= 255.0) && (g >= 10.0 && g <= 255.0) && (b >= 0.0 && b <= 280.0)) {
        playNote('si');
        $('#nota').html("--- OZEL DURUM Sİ ---");
    }

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
//var percentage = 0;
// progress bar için
var noteSequence = [];
var finish = 0;
function findPixelRanges(pixelCalculationArray, x, y) {
    var red_Total = 0;
    var green_Total = 0;
    var blue_Total = 0;
    var info;
    var dump = [];

    //Tüm arrayin içindeki rgb değerlerinin toplamları
    for (var i = 0; i < pixelCalculationArray.length; i++) {

        red_Total += pixelCalculationArray[i][0];
        green_Total += pixelCalculationArray[i][1];
        blue_Total += pixelCalculationArray[i][2];
    }

    dump.push( red_Total = red_Total / pixelCalculationArray.length);
    dump.push( green_Total = green_Total / pixelCalculationArray.length);
    dump.push( blue_Total = blue_Total / pixelCalculationArray.length);

    noteSequence.push(dump);

    //Ekrana bilgi yazdır.
    info = x + "x" + y + " square's pixel average values";
    $('#result_1').html(info + "<br>" + "RGB :" + red_Total + ", " + green_Total + ", " + blue_Total);

    //if (finish == 1)
        //playNoteSequence(noteSequence);

}


//worker denemesi için
var myWorker;
function findPixelSummations() {

    var x1 = 0;
    var y1 = 80;
    var x2 = 40;				//otomatik alınacak
    var y2 = 40;
    var pixelCalculationArray = [];
    var c = mainCanvas.getContext('2d');
    var x_border = mainCanvas.width / x2;
    var y_border = mainCanvas.height / y2;
    var workerArray;

    //Web worker desteği varmı ?
    if ( typeof (Worker) !== "undefined") {
        //worker tanımlı değilse worker oluştur
        if ( typeof (myWorker) == "undefined") {
            myWorker = new Worker("Workers/worker.js");
        }

        //workerdan dönen sonuç
        myWorker.onmessage = function(e) {

            //$('#textArea').val($('#textArea').val() + '-');
            //$('#textArea').append('+');
            findPixelRanges(e.data[0], e.data[1], e.data[2]);
        };

        for (var k = 1; k <= (mainCanvas.width / x2); k++) {
            workerArray = c.getImageData(x1, y1, (x2 * k), y2).data;
            //workera gönderilen veriler
            myWorker.postMessage([workerArray, x1, y1, x2, y2, y_border, mainCanvas.width]);

            //Resmin tamamının tarandı bilgisi
            if (k + 1 == (mainCanvas.width / x2)) {
                //$('#textArea').append('Done');
                finish = 1;
            }
        }

    } else {
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
    //playSound(p[0], p[1], p[2]);
    //TEST
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#status').html(coord + "<br>" + hex + "<br>" + "RGB :" + p[0] + ", " + p[1] + ", " + p[2]);

});
