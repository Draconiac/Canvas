/**
 * Created by keremyucel on 6.11.2015.
 */
/**Bu dosyadaki bütün functionlar "ion.sound.min.js" kullan?larak
 * yarat?lm??t?r.
 * https://github.com/IonDen/ion.sound
 * http://ionden.com/a/plugins/ion.sound/en.html**/

ion.sound({
    sounds: [
        {
            alias: "do",
            name: "C_do",
            preload: true
        },
        {
            alias: "do#",
            name: "C_doDiyez",
            preload: true
        },
        {
            alias: "re",
            name: "D_re",
            preload: true
        },
        {
            alias: "re#",
            name: "D_reDiyez",
            preload: true
        },
        {
            alias: "mi",
            name: "E_mi",
            preload: true
        },
        {
            alias: "fa",
            name: "F_fa",
            preload: true
        },
        {
            alias: "fa#",
            name: "F_faDiyez",
            preload: true
        },
        {
            alias: "sol",
            name: "G_sol",
            preload: true
        },
        {
            alias: "sol#",
            name: "G_solDiyez",
            preload: true
        },
        {
            alias: "la",
            name: "A_la",
            preload: true
        },
        {
            alias: "si",
            name: "B_si",
            preload: true
        },
        {
            alias: "sib",
            name: "Bb_si",
            preload: true
        }
    ],

    path: "Sounds/",
    multiplay: true
});

function playNote(note){


    switch(note){
        case 'do':
            ion.sound.play("do");
            break;
        case 'do#':
            ion.sound.play("do#");
            break;
        case 're':
            ion.sound.play("re");
            break;
        case 're#':
            ion.sound.play("re#");
            break;
        case 'mi':
            ion.sound.play("mi");
            break;
        case 'fa':
            ion.sound.play("fa");
            break;
        case 'fa#':
            ion.sound.play("fa#");
            break;
        case 'sol':
            ion.sound.play("sol");
            break;
        case 'sol#':
            ion.sound.play("sol#");
            break;
        case 'la':
            ion.sound.play("la");
            break;
        case 'si':
            ion.sound.play("si");
            break;
        case 'sib':
            ion.sound.play("sib");
            break;
        default :
            break;
    }

}