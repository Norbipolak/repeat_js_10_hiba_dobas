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