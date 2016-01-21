/**
 * @author keremyucel
 */
$(document).ready(function() {
});
var mainCanvas = document.getElementById('mainCanvas');
var context = mainCanvas.getContext('2d');

var desiredWidth;
var desiredHeight;
var ratio;

function make_base() {
    var base_image;
    base_image = new Image();
    base_image.src = "Images/picasso.jpg";

    base_image.crossOrigin = 'Anonymous';
    base_image.onload = (function() {
       //mainCanvas.height = mainCanvas.width * (base_image.height / base_image.width);

        ratio = mainCanvas.width / mainCanvas.height;
        desiredHeight = 8;
        desiredWidth = 8*ratio;

        mainCanvas.width = base_image.width * 0.5;
        mainCanvas.height = base_image.height * 0.5;
        //mainCanvas.width = base_image.width;
        //mainCanvas.height = base_image.height;
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
    var test;
    var ax = 0;
    var ay = 0;

    interval = setInterval(function(){

            test = playSound(seq[i][0], seq[i][1], seq[i][2]);
            if (test == 1)
                $('#textArea').append(seq[i][0] + ' - ' + seq[i][1] + ' - ' + seq[i][2] + '\n');
            else
                $('#textArea').append(seq[i][0] + ' - ' + seq[i][1] + ' - ' + seq[i][2] + ' !!! '+ '\n') ;

            i++;

            ax += x2;
            if(ax >= mainCanvas.width-40){//buraya dikkat degismesi lazım
                ay += y2;
                ax = 0;
            }

            //ufak kare burda hareket ediyor
            document.getElementById('miniContainer').style.left = ax +'px';
            document.getElementById('miniContainer').style.top =  ay +'px';

            if(i >= seq.length)
                clearInterval(interval);
    }
    ,500);

}

function playSound(r, g, b) {
    //TODO Kontrol edilip tüm aralıklar hesaplanacak
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    var  test = 0;
    //DO
    if ((r >= 0 && r <= 128) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
        playNote('do');
        $('#nota').html("--- DO ---");
        test = 1;
    }
    //DO diyez
    if ((r >= 0 && r <= 128) && (g >= 128 && g <= 255) && (b >= 128 && b <= 255)) {
        playNote('do#');
        $('#nota').html("--- DO Diyez ---");
        test = 1;
    }
    //RE
    if ((r >= 0 && r <= 128) && (g >= 0 && g <= 128) && (b >= 128 && b <= 255)) {
        playNote('re');
        $('#nota').html("--- RE ---");
        test = 1;
    }
    //RE diyez
    if ((r >= 0 && r <= 128) && (g >= 0 && g <= 128) && (b >= 0 && b <= 128)) {
        playNote('re#');
        $('#nota').html("--- RE Diyez---");
        test = 1;
    }
    //Mİ
    if ((r >= 63 && r <= 190) && (g >= 0 && g <= 128) && (((b >= 128 && b <= 255)||(b >= 0 && b <= 128)))) {
        playNote('mi');
        $('#nota').html("--- Mİ ---");
        test = 1;
    }
    //FA   --G  0 - 0 dı 0 -50 yalandan yazdım
    if ((r >= 25 && r <= 63) && (g >= 0 && g <= 50) && (b >= 51 && b <= 128)) {
        playNote('fa');
        $('#nota').html("--- FA ---");
        test = 1;
    }
    //FA Diyez
    if ((r >= 25 && r <= 63) && (g >= 0 && g <= 50) && (b >= 128 && b <= 255)) {
        playNote('fa#');
        $('#nota').html("--- FA Diyez---");
        test = 1;
    }
    //SOL
    if ((r >= 128 && r <= 255) && (g >= 0 && g <= 128) && (b >= 0 && b <= 128)) {
        playNote('sol');
        $('#nota').html("--- SOL ---");
        test = 1;
    }
    //SOL Diyez
    if ((r >= 128 && r <= 255) && (g >= 0 && g <= 128) && (b >= 128 && b <= 255)) {
        playNote('sol#');
        $('#nota').html("--- SOL Diyez---");
        test = 1;
    }
    //LA
    if ((r >= 128 && r <= 255) && (g >= 63 && g <= 190) && ((b >= 0 && b <= 128)||(b >= 128 && b <= 255))) {
        playNote('la');
        $('#nota').html("--- LA ---");
        test = 1;
    }
    //Sİ
    if ((r >= 127 && r <= 255) && (g >= 128 && g <= 255) && (b >= 0 && b <= 128)) {
        playNote('si');
        $('#nota').html("--- Sİ ---");
        test = 1;
    }
    //Sİ Bemol
    if ((r >= 127 && r <= 255) && (g >= 128 && g <= 255) && (b >= 128 && b <= 255)) {
        playNote('sib');
        $('#nota').html("--- Sİ Bemol---");
        test = 1;
    }
    /*//DO TEST
    if ((r >= 170 && r <= 255) && (g >= 150 && g <= 255) && (b >= 130 && b <= 255)) {
        playNote('do');
        $('#nota').html("--- DO ---");
        test = 1;
    }
    //RE TEST
    if ((r >= 0 && r <= 120) && (g >= 0 && g <= 60) && (b >= 0 && b <= 60)) {
        playNote('re');
        $('#nota').html("--- RE ---");
        test = 1;
    }*/

    return test;

    //SADECE TEST ICIN
    /*
    if ((r >= 10.0 && r <= 255.0) && (g >= 10.0 && g <= 255.0) && (b >= 0.0 && b <= 280.0)) {
        playNote('si');
        //$('#nota').html("--- OZEL 6 DURUM Sİ ---");
        //$('#nota').text("--- OZEL 6 DURUM Sİ ---");
    }
    */
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

    dump.push(parseInt(red_Total = red_Total / pixelCalculationArray.length));
    dump.push(parseInt(green_Total = green_Total / pixelCalculationArray.length));
    dump.push(parseInt(blue_Total = blue_Total / pixelCalculationArray.length));

    noteSequence.push(dump);

    //Ekrana bilgi yazdır.
    info = x + "x" + y + " square's pixel average values";
    $('#result_1').html(info + "<br>" + "RGB :" + red_Total + ", " + green_Total + ", " + blue_Total);

}


//worker denemesi için
var myWorker;
var x2 = 40;				//otomatik alınacak
var y2 = 40;
var x_border = mainCanvas.width / x2;
var y_border = mainCanvas.height / y2;

function findPixelSummations() {

    var x1 = 0;
    var y1 = 0;
    var c = mainCanvas.getContext('2d');
    var workerArray;

    document.getElementById('miniContainer').style.height = x2+'px';
    document.getElementById('miniContainer').style.width = y2+'px';

    //Web worker desteği varmı ?
    if ( typeof (Worker) !== "undefined") {
        //worker tanımlı değilse worker oluştur
        if ( typeof (myWorker) == "undefined") {
            myWorker = new Worker("Workers/worker.js");
        }
        //workerdan dönen sonuç
        myWorker.onmessage = function(e) {
            findPixelRanges(e.data[0], e.data[1], e.data[2]);
        };

        for (var t = 1; t <= (mainCanvas.height / y2); t++) {
            for (var k = 1; k <= (mainCanvas.width / x2); k++) {
                //x1 e y1 noktasından itibaren x2 ye y2 lik bir alanı al
                workerArray = c.getImageData(x1, y1, (x2 * k), (y2 * t)).data;
                //workera gönderilen veriler
                myWorker.postMessage([workerArray, x1, y1, x2, y2, y_border, mainCanvas.width]);
                x1 += x2;

            }
            x1 = 0;
            y1 += y2;
        }

    } else {
        window.alert("Browser'ın Web worker desteği yoktur.");
    }

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

    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#status').html(coord + "<br>" + hex + "<br>" + "RGB :" + p[0] + ", " + p[1] + ", " + p[2]);

});

function move(){

    document.getElementById('miniContainer').style.border = '2px solid red';
    document.getElementById('miniContainer').style.left = desiredWidth+'px';
    document.getElementById('miniContainer').style.top = desiredHeight+'px';
}