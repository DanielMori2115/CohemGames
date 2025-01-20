function isNotEmpty(field) {
    return field !== undefined && field !== "" && field != null && field != NaN;
}

function getCurrentDateString() {
    var today = new Date();
    var date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    return `${date} ${time}`;
}

function parseToDate(text) {
    var timeSpan = Date.parse(text)
    
    return new Date(timeSpan);
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function addMonths(date, months) {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

function addYears(date, years) {
    var result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};

function getCurrentDateSerialString() {
    var today = new Date();
    var date = `${today.getFullYear()}${(today.getMonth() + 1)}${today.getDate()}`;
    var time = `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;

    return `${date}${time}`;
}

function convertToJsonObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getStringToShortDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; 
    var y = date.getFullYear();

    return (d <= 9 ? '0' + d : d) + '/'+ (m<=9 ? '0' + m : m) + '/' + y;
}

function getAngularDate(text) {
    try {
        return text.replace('/Date(', "").replace(')/', "");    
    } catch (e) {
        return "";
    }
}

function getStringToShortHour(text) {
    const convertedStartDate = new Date(text);
    const hours = convertedStartDate.getHours();
    const minutes = (convertedStartDate.getMinutes() < 10 ? '0' : '') + convertedStartDate.getMinutes();
    const time = (hours > 12) ? (`${hours - 12}:${minutes} pm`) : (`${hours}:${minutes} am` );

    return time;
}

function convertStringToObject(obj) {
    return JSON.parse(obj);
}

function romanizeNumber(num) {
    if (isNaN(num))
        return NaN;
    const digits = String(+num).split("");
    const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    var roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function makeArray(count, content) {
    var i;
    const result = [];
    
    if (typeof content == "function") {
        for (i = 0; i < count; i++) {
            result.push(content(i));
        }
    } else {
        for (i = 0; i < count; i++) {
            result.push(i);
        }
    }
    return result;
}

function range(start, end, maxValue) {
    const len = end - start + 1;

    const a = new Array(len);

    for (let i = 0; i < len; i++) {
        if (start + i <= maxValue && (start+i) > 0) {
            a[i] = start + i;
        }
    }

    return a.filter(x => x != null);
}

function deromanizeNumber(text) {
    const str = text.toUpperCase();
    const validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    const token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    const key = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    var num = 0, m;

    if (!(str && validator.test(str))) return false;

    while (m === token.exec(str))
        num += key[m[0]];
    return num;
}

function convertWithoutAccent(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeText(str) {

    if (!isNotEmpty(str)) return str;

    const firstIteration = convertWithoutAccent(str);
    const secondIteration = firstIteration.trim();
    const lastIteration = secondIteration.toUpperCase();

    return lastIteration;
}

// (A) TRANSFORM DATE TO SQL DATE
function GetStringDate (text) {
    try {
        const datetime = getAngularDate(text);
        var date = moment(+datetime).toISOString();
        return `${date}`;
    } catch (error) {
        return EMPTY_STRING;
    }
}

// (A) SHOW & HIDE SPINNER
function show() {
    document.getElementById("spinner").classList.add("show");
}
function hide() {
    document.getElementById("spinner").classList.remove("show");
}
function hideElementById(id) {
    document.getElementById(id).style.display = 'none';
}
function showElementById(id) {
    document.getElementById(id).style.display = 'block';
}

//OJO, ESTE METODO VACIA EL ARRAY QUE SE INGRESA DE PARAMETRO QUEDA VACIO
function getCombinations(arr, n) {
    var i, j, k, elem, l = arr.length, childperm, ret = [];
    if (n == 1) {
        for (i = 0; i < arr.length; i++) {
            for (j = 0; j < arr[i].length; j++) {
                ret.push([arr[i][j]]);
            }
        }
        return ret;
    }
    else {
        for (i = 0; i < l; i++) {
            elem = arr.shift();
            for (j = 0; j < elem.length; j++) {
                childperm = getCombinations(arr.slice(), n - 1);
                for (k = 0; k < childperm.length; k++) {
                    ret.push([elem[j]].concat(childperm[k]));
                }
            }
        }
        return ret;
    }
}

//Funcion para obtener valor nulo en caso de que ninguno de los dos valores exista
function getDefaultNullValue(case1, case2)
{
    return isNotEmpty(case1) ? case1 : (isNotEmpty(case2) ? case2 : null);
}

//Funcion para obtener valor nulo en caso de que ninguno de los dos valores exista
function getDefaultNullIntValue(case1, case2) {
    return isNotEmpty(case1) && case1 != 0 ? case1 : (isNotEmpty(case2) && case2 != 0 ? case2 : 0);
}

// (A) SUBRAYADO

function clearHighLight() {
    const elmentsPerPage = 10;

    for (let i = 0; i < elmentsPerPage; i++) {
        
        var shortDesc = new Mark(document.querySelector(`.select-${i}`));
        var largeDesc = new Mark(document.querySelector(`.select-${i}-all`));

        if(isNotEmpty(shortDesc)) shortDesc.unmark();
        if(isNotEmpty(largeDesc)) largeDesc.unmark();
    }
}
function highlight(documents) {

    if (!isNotEmpty(documents)) return;

    for (let i = 0; i < documents.length; i++) {
        var currentDocument = documents[i];
        
        var shortDesc = new Mark(document.querySelector(`.select-${i}`));
        var largeDesc = new Mark(document.querySelector(`.select-${i}-all`));

        // First unmark the highlighted word or letter
        shortDesc.unmark();
        largeDesc.unmark();

        var coincidences = [...currentDocument.CoincidenceWords];

        var wordsMappedForMarkRanges = coincidences.map(x => ({
            start: x.IndexInText,
            length: x.Word.length
        }));

        // Highlight letter or word
        shortDesc.markRanges(wordsMappedForMarkRanges, { className: 'a0', separateWordSearch: false, caseSensitive: false });
        largeDesc.markRanges(wordsMappedForMarkRanges, { className: 'a0', separateWordSearch: false, caseSensitive: false });
    }
}