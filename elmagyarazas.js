/*
Kétfajta lehet, hogy rögtön beletesszük egy try-catch ágba a dolgokat vagy az, hogy egy függvényben throw-val dobunk egy hibát 
majd a függvény meghívását tesszük bele egy try-catch és ott a catch ágban elkapjuk a hibát, ha függvényben tényleg hiba történt 
és a throw-ba megy be 
*/

//egyszerű példa amikor, ki akarunk valamit console.log-olni, ami nincsen


try {
    console.log(nemletezo);
} catch(err) {
    console.log(err);
} finally {
    console.log("Ez mindig le fog futni!");
}

console.log("Ez is mindig le fog futni, mert catch ágban elkapjuk a hibátés nem lesz hatással a kód többi részére!");

/*
Kaptunk egy hibát, hogy a nemletezo is not defined, finally-ban lévő dolog mindig le fog futni és ami alatta van console.log hosszú szöveg 
az is mindig le fog futni, mert a catch-ben elkaptuk a hibát és nem lesz hatással a kód többi részére 
*/

/*
Csináluk egy függvényt, visszaad egy true-t, a futási feltételnek eleget teszünk, ha viszont nem akkor dobunk egy hibát, ahol megadunk valamit 
és ezt majd a függvény meghívásakor beletesszük egy try-catch-ben és ha olyat adunk meg, amely eleget tesz akkor true, ha meg nem 
akkor a catch elkapja a hibánkat és az lesz kikonzolozva amit a throw-ban megadtunk mert a catch-ben az van, hogy console.log(err);
az err az meg az lesz, amit a throw-ban megadtunk
->
throw "A szám amit bekértünk az nem negatív"

*/

function isNegative(number) {
    if(number < 0)
        return true;
        throw "A szám amit bekértünk az nem negatív"
}

// try {
//     isNegative(3)
// } catch(err) {
//     console.log(err);
// }

// try {
//     isNegative(-1);
// } catch(err) {
//     console.log(err);
// }

/*
Ez egy való élet példa, ahol bekérünk dolgokat egy függvényben firstName, lastName ilyen adatokat és mindegyiknél lesz egy hiba 
ezeket a hibákat push-oljuk egy tömbbe és majd ezt a tömböt fogjuk throw-olni, azt elkapjuk egy try-catch ágban és kiírjuk a hibákat 
de fontos kikötás, hogy csak akkor adjuk vissza egy tömböt, hogyha a length-je nagyobb, mint nulla, mert ha nem az azt jelenti, hogy nem 
volt hibánk és egy üres tömb-öt nem adunk vissza 
*/

function formEllenorzes(firstName, lastName, age) {
    const err = []; // ebbe push-oljuk bele a hibákat 

    if(firstName.length === 0)
        err.push("A keresztnév mező nem maradhat üresen!");
    if(lastName.length === 0) 
        err.push("A vezetéknév mező nem maradhat üresen!");
    if(age < 0 || age > 130)
        err.push("A megadott életkor nem helyes!");

    if(err.length !== 0)
        throw err;
}

//itt kapjuk el meghívásnál a hibákat, ha minden rendben volt akkor meg nem add vissza semmit, mert az err tömb length-je az 0

// try {
//     formEllenorzes("Norbi", "Lengyel", "33");
// } catch(err) {
//     console.log(err); //itt lesz visszaadva a tömbbe a hiba, ha lesz benne 
// }

try {
    formEllenorzes("", "", 23);
} catch(err) {
    console.log(err);
}

/*
ha meg olt hiba, mint jelen esetben akkor ezt kaptuk egy tömbbe 
[
  'A keresztnév mező nem maradhat üresen!',
  'A vezetéknév mező nem maradhat üresen!'
]

ha nem akarjuk, hogy egy tömböt adjon vissza, egy tömböt akkor a throw-nál a tömböt egy stringgé tudjuk alakítani a join-val
throw err helyett throw err.join(", "); vagy throw err.join("\n") és akkor új sorban lesznek 
*/

/*
Csinálunk egy függvényt, ami vár egy hibakódot és attól függően, hogy milyen hibakódot adunk meg a függvény meghívásakor olyan hibaüzenetet
fogunk visszakapni egy objektumban 
Ehhez a switch-et használjuk, mert mindig egy megegyezés lesz, hiszen egy hibakódot tudunk a függvénynek egyszerre megadni!!! 
*/

function createErrorMessage(statusCode) {
    //erre a statusCode-ra, amit bekérünk erre csinálunk egy switch-et
    switch(statusCode) {
        case 400:
            throw {
                code: statusCode, // a statusCode-ot fogjuk kiírni, amit megadunk meghíváskor 
                message: "Bad request",
                direct: "https://domain.hu/400"
            }
        case 403: 
            throw {
                code: statusCode,
                message: "Forbidden",
                direct: "https://domain.hu/403"
            }
        case 404:
            throw {
                code: statusCode,
                message: "Not Found",
                direct: "https://domain.hu/404"
            }
    }
}


// try {
//     createErrorMessage(400)
// } catch(err) {
//     console.log(err);
// }

//ezt kaptuk vissza -> { code: 400, message: 'Bad request', direct: 'https://domain.hu/400' }

try {
    createErrorMessage(404);
} catch(err) {
    console.log(err);
}

//itt meg ezt -> { code: 404, message: 'Not Found', direct: 'https://domain.hu/404' }
/******************************************************************************************************************************************/ 

const vowels = ["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ö", "ő", "ú", "ü", "ű"];

const index = vowels.findIndex((i)=> i === "é"); //ha meg ez nem lenne benne, akkor visszaad -1-et!!!! 
console.log(index);//6 


const index2 = vowels.indexOf("é");
console.log(index2);  // Output: 6

/*
a findIndex vár egy callBack function-t az indexOf ugyanugy, mint az includes csak egy értéket 
*/

const index3 = vowels.includes("á");
console.log(index3); //true

const newArrayWithoutIndex = vowels.splice(index, 1);
console.log(newArrayWithoutIndex); //["é"];
/*
nagyon fontos, hogy a slice() az módosítja az eredeti tömböt, szóval ott ki lesz szedve az "é" 
és itt az új tömbbe pedig csak egy "é" lesz benne szóval, ahogy az csináljuk órán is, mindig az original tömbbel kell továbbmenni nem az újjal
*/

//viszont ha azt szeretnénk, hogy az original tömb az ne változzon, akkor használhatunk filter-t ahol megadjuk, hogy az é ne legyen benne 
const vowels2 = ["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ö", "ő", "ú", "ü", "ű"];

const newArrayWithoutIndex2 = vowels.filter(vowel => vowel !== "é");
console.log(newArrayWithoutIndex2);  // Output: ["a", "e", "i", "o", "u", "á", "í", "ó", "ö", "ő", "ú", "ü", "ű"]
console.log(vowels);  // Original array remains unchanged

/*
és ilyenkor megmarad az eredeti tömb minden értékkel, de viszont lesz egy új tömb is minden értékkel az é-n kivül!!!! 
******************************************************************************************************************
*/
const vowels3 = ["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ö", "ő", "ú", "ü", "ű"];

const index5 = vowels.findIndex((i) => i === "é");
const newArrayWithoutIndex3 = vowels3.slice(0, index5).concat(vowels3.slice(index5 + 1));
console.log(newArrayWithoutIndex3);  // Output: ["a", "e", "i", "o", "u", "á", "í", "ó", "ö", "ő", "ú", "ü", "ű"]
console.log(vowels3);  // Original array remains unchanged

/*
splice-val hozzá is tudunk adni dolgokat nem csak kitörölni!! 
*/

//törlés 
let array = [1, 2, 3, 4, 5];
let removed = array.splice(2, 1); // Start at index 2, remove 1 element
console.log(array);    // Output: [1, 2, 4, 5]
console.log(removed);  // Output: [3]

//hozzáadás 
/*
let array = [1, 2, 3, 4, 5];
array.splice(2, 0, 'a', 'b'); // Start at index 2, remove 0 elements, add 'a' and 'b'
console.log(array);  // Output: [1, 2, 'a', 'b', 3, 4, 5]
*/

//kicserélés
/*
let array = [1, 2, 3, 4, 5];
array.splice(2, 2, 'a', 'b'); // Start at index 2, remove 2 elements, add 'a' and 'b'
console.log(array);  // Output: [1, 2, 'a', 'b', 5]
*/

/*
Különbség a slice és splice, hogy a slice-nál az eredeti tömb az módosítva lesz még a slice-nál nem!!
meg, hogy a slice-nál meg kell adni, hogy mettől meddig!! 
splice-nál meg azt adjuk meg hogy mettől hányat!!! 
*/

//slice
let array2 = [1, 2, 3, 4, 5];
let newArray2 = array2.slice(1, 3);
console.log(newArray2);  // Output: [2, 3]
console.log(array2);     // Original array remains unchanged: [1, 2, 3, 4, 5]

let array3 = [1, 2, 3, 4, 5];
let removed3 = array3.splice(2, 1);  // Start at index 2, remove 1 element
console.log(array3);    // Modified array: [1, 2, 4, 5]
console.log(removed3);  // Output: [3] (the removed elements)







