try {
    console.log(nemletezo);
} catch(err) {
    console.log(err);
} finally {
    //finally az mindig lefut attól függetlenül, hogy hiba volt vagy sem!!!! 
    console.log("a finally blokkban lévő mindig lefut");
}

console.log("Ez lefut");

/*
    a console.log("Ez lefut") az lefutott mert nem volt benne a try-catch-ben meg a finally is lefutott, mert az mindig lefut 
    de viszont kaptunk egy hibaüzentet hogy nemletezo is undefined 

    Miért jó a try-catch blokk 
    mert így ha van egy hiba ott, akkor nem befolyásolja a kód futását hanem elkapja azt a hibát és kód többi része meg lefut!!!!!!!!!!!!!!
*/

function isNegative(number) {
    if(number < 0)
        return true;
    throw "A megadott szám nem negatív"
}

// try {
//     isNegative(1)
// } catch(err) {
//     console.log(err);
// }

/*
De mi is csinálhatunk hibát, nem csak rendszerhiba van, pl. a throw-val, amit egy try-catch-ben elkapunk 

Nagyon fontos, hogyha mi csinálunk olyan esetet ami nem jó a throw-val, akkor kell egy try-catch, amiben el tudjuk kapni azt!!!! 

pl. itt a föggvény meghívásnál 1-et adtunk meg a try, ami nem negatív, ezért ott bement a throw-ba, amit meg elkaptunk a catch-ben 
tehát, kikonzoluta, amit mi beírtunk a throw-ba 
*/

//de lehet azt is, hogy több hibalehetőség van, amit push-lunk egy tömbbe és majd csak az elesz push-olva ami nem teljesül 

function formEllenorzes(firstName, lastName, age) {
    const err = [];

    if(firstName.length === 0)
        err.push("A keresztnév mező nem maradhat üresen!");
    if(lastName.length === 0) 
        err.push("A vezetéknév mező nem maradhat üresen!");
    if(age < 0 || age > 130)
        err.push("A megadott életkor nem megfelelő!");

    //fontos ezt meghatározni, hogy csak akkor legyen throw-oljuk az err-t ha tényleg van hiba tehát az err-nek a length-je nagyobb 0-nál
    if(err.length > 0)
        throw err
}

try {
    formEllenorzes("", "Valami", 144)
} catch(err) {
    console.log(err);
}
/*
throw err
[ 'A megadott életkor nem megfelelő' ] -> tömb
*/
/*
throw err.join("\n"); 
-> A megadott életkor nem megfelelő -> string
*/

function createErrorMessage(statusCode) {
    switch(statusCode) {
        case 400:
            throw {
                status: statusCode,
                message: "Bad request!",
                redirect: "https://domain.hu/400"
            }
        case 403:
            throw {
                status: statusCode,
                message: "Forbidden!",
                redirect: "https://domain.hu/403"
            }
        case 404: 
            throw {
                status: statusCode,
                message: "Not found!",
                redirect: "https://domain.hu/404"
            }
    }
}

try {
    createErrorMessage(404);
} catch(err) {
    console.log(err);
}
/*
{
    status: 404,
    message: 'Not found!',
    redirect: 'https://domain.hu/404'
}


Így lehet errormessage-t objektum formájában csinálni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Függvénynél mindig kell, hogy throw, akár egy objektumot csináltunk, akár egy tömbbe gyüjtjük össze akkor azt throw-oljuk 
és mindig a try-catch blokkban a meghívást tesszük bele!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

/*
A különbség a return, continue és a break között 

1. return 

Return visszaad egy értéket de ezzel ki is tudunk lépni a függvényből, sokszor csináltuk, hogy megadunk egy feltételt a függvény elején, hogy mikor nem szeretnénk 
ha továbbmene és akkor dobunk egy return és akkor a többi dolog, ami alatta van az nem fog lefutni!!!!
*/

//példa
function add(a, b) {
    return a + b;  // Exits the function and returns the sum of a and b
    console.log('This will not be executed');  // This line is never reached
}

console.log(add(2, 3));  // Output: 5

/*
2. continue 

olyan esetben használjuk, hogyha pl. van egy iteráció és van olyan eset amit nem szeretnénk akkor azt amit megadunk kihagyja de viszont továbbmegy az iterációban 
vagy olyan is lehet, hogy egy függvényben megadunk egy esetet, ami nem jó és continue, akkor meg azt kihagyja, de viszont továbbmegyünk 
*/

//példa
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;  // Skip the rest of the loop body when i is 2
    }
    console.log(i);  // Output: 0, 1, 3, 4 (2 is skipped)
}

/*
break az meg arra jó pl. a switch-ben van ilyen hogyha megadtuk a feltételt akkor utána írunk egy break-et, mert ha megtalálja a pontos egyezőséget az első esetnél 
akkor ha van break akkor a többi eset már le sem fog futni, mert felesleges
*/

//példa for ciklusra 
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break;  // Exit the loop when i is 3
    }
    console.log(i);  // Output: 0, 1, 2 (loop is exited when i is 3)
}

//példa switch-re 
let fruit = 'apple';

switch (fruit) {
    case 'apple':
        console.log('This is an apple.');
        // No break here, so it falls through to the next case
    case 'banana':
        console.log('This is a banana.');
        // No break here, so it falls through to the default case
    default:
        console.log('This is some other fruit.');
}

// Output:
// This is an apple.
// This is a banana.
// This is some other fruit.

/***********************************************************************************************************************************************************/
/*
meg kell számolni, hogy hány magánhangzó van egy string-ben 
- kell egy count, amire nulláról indul és ha van egyezőség akkor növeljük az értékét minden körben, tehát ha az adott betű, amit vizsgálunk a string-ben az mássalhangzó 
- kell egy tömb, amiben vannak a magánhangzok 
- kell két for ciklus első a string-re ami string.length-ig megy és minden egyes betűt megvizsgál benne, hogy mássalhangzó-e mert lesz benne egy másik for, ami megy majd a 
a tömb hosszáig és ha eggeyezőség van akkor növeljük a pontszámot, ha meg nincs akkor nem a végén meg visszaadjuk a a count-ot 

nagyon fontos, hogyha valamit számolni kell, akkor legyen egy count, ami nulláról indul és majd minden körben, minden eggyezőségnél növeljük az értékét egyel
*/



function vowelCount(str) {
    counter = 0;
    const vowels = ["á", "é", "ő", "ű", "ű", "ő", "ö", "o", "i"];

    for(let i = 0; i < str.length; i++) {
        for(let j = 0; j < vowels.length; j++) {
            if(str[i] === vowels[j])
                counter++;
        }
    }

    return counter;

}

console.log(vowelCount("éségá"));


//másik megoldás 
function vowelCount(str) {
    let counter = 0;
    const vowels = new Set(["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ö", "ő", "ú", "ü", "ű"]);

    for (let i = 0; i < str.length; i++) {
        if (vowels.has(str[i])) {
            counter++;
        }
    }

    return counter;
}

console.log(vowelCount("éségá"));  // Output: 3

/*
itt set-et használunk 

csak egyszer megyünk végig a str-en és úgy nézzük, meg hogy van egyezőség, hogy a vowels tömbnél használunk egy has metódust, aminek megadjuk a str[i], ami éppen annál 
tart a loop-ban és ha igen, akkor növeljük a counter-t!!! 

Azért kell, hogy legyen itt set-ben ez a tömb new Set(["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ö", "ő", "ú", "ü", "ű"]), mert a set-nek van egy olyan metódusa, hogy 
has, a sima tömbnek meg csak úgy tudjuk megnézni, hogy tartalmaz egy elemet, hogy indexOf vagy includes!!!!! 

az indexOf az függvényes dolog a inlcludes meg csak true vagy false

const indexNumber = Arr.indexOf((valami)=> valami === "ő") 
és ez visszaad egy index-et, hogy hányadik helyen helyezkedik el a keresett elem 
-> 
ebből tudunk pl. kiszedni egy tömbből egy dolgot pontosan a splice-val, ami az index-edik-től kiszed egyet ami az index lesz maga és akkor visszaad egy tömbböt anélkül

az includes az meg true vagy false 
cosnt included = vowels.includes("ö"); true, mert van benne 

nem így van a findIndex vár egy callBack function az indexOf az ugyanúgy, mint a includes csak egy értéket
de viszont a indexOf az visszaadja, hogy pontosan hányadik indexen van ugyanúgy, mint a findIndex az includes meg csak true vagy false
fontos, hogy nem szabad összekeverni a includes-ot a contains-vel, amivel azt nézzük meg, hogy az id-ában, class-ában vagy attributes-ában 
van-e egy bizonyos szó (de itt is lehet az includes-ot használni)
-> 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/ 

let element = document.getElementById('someElementId');
if (element.id.includes('targetWord')) {
    console.log('ID contains the target word');
}

let element2 = document.getElementById('someElementId');
if (element2.classList.contains('targetClass')) {
    console.log('Element has the target class');
}

let element3 = document.getElementById('someElementId');
let attributeValue = element3.getAttribute('data-attribute');
if (attributeValue && attributeValue.includes('targetWord')) {
    console.log('Attribute contains the target word');
}



