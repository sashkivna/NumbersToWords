var vacabEng = {
    "tensAndUnitsConnector":"-",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: "hundred",
    1000: "thousand",
    1000000: "million",
    1000000000: "billion"
}
var vacabUkr = {
    "tensAndUnitsConnector":" ",
    1: "один",
    2: "два",
    3: "три",
    4: "чотири",
    5: "п'ять",
    6: "шість",
    7: "сім",
    8: "вісім",
    9: "дев'ять",
    10: "десять",
    11: "одинадцять",
    12: "дванадцять",
    13: "тринадцять",
    14: "чотирнадцять",
    15: "п'ятнадцять",
    16: "шіснадцять",
    17: "сімнадцять",
    18: "вісімнадцять",
    19: "дев'ятнадцять",
    20: "двадцять",
    30: "тридцять",
    40: "сорок",
    50: "п'ятдесят",
    60: "шістдесят",
    70: "сімдесят",
    80: "вісімдесят",
    90: "дев'носто",
    100: "сто",
    200: "двісті",
    300: "триста",
    400: "чотириста",
    500: "п'ятсот",
    600: "шістсот",
    700: "сімсот",
    800: "вісімсот",
    900: "дев'ятсот",
    1000: "тисяча",
    1000000: "міліон",
    1000000000: "міліард"
}
var settings = [{
    language: "English",
    vocabluary: vacabEng,
    delimiter: '.',
    correctForms: function getCorrectKindEng(number) {
        var y = number;
        if (y % 100 === 1) {
            return ["cent", "dollar", "thousand", "million", "billion"];
        }
        else {
            return ["cents", "dollars", "thousand", "millions", "billions"];
        }
    }
},
    {
        language: "Українська",
        vocabluary: vacabUkr,
        delimiter: ',',
        correctForms: function getCorrectKindUa(number) {
            var y = number;
            if ((y % 100) < 21) {
                //console.log(y%100);
                if ((y % 100) === 1) {
                    return ["копійка", "гривня", "тисяча", "мільйон", "мільярд"];
                }
                if (((y % 100) > 1 && (y % 100) < 5)) {
                    return ["копійки", "гривні", "тисячі", "мільйони", "мільярди"];
                }
                if ((y % 100) === 0 || ((y % 100) > 5 && (y % 100) < 21)) {
                    return ["копійок", "гривень", "тисяч", "мільйонів", "мільярдів"];
                }
            }
            else {
                y = y % 10;
                //console.log(y%10);
                if ((y % 10) === 1) {
                    return ["копійка", "гривня", "тисяча", "мільйон", "мільярд"];
                }
                if (((y % 10) > 1 && (y % 10) < 5)) {
                    return ["копійки", "гривні", "тисячі", "мільйони", "мільярди"];
                }
                if ((y % 10) === 0 || ((y % 10) > 5 && (y % 10) < 21)) {
                    return ["копійок", "гривень", "тисяч", "мільйонів", "мільярдів"];
                }
            }
        }
    }
];

function radioButtonGetValue() {
    var radios = document.getElementsByName("question-one");
    var languageButton;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            languageButton = (radios[i].value);
            for (var j = 0; j < settings.length; j++) {
                for (var prop in settings[j]) {
                    if (languageButton === settings[j][prop]) {
                        return settings[j][prop];
                    }
                }

            }
            break;
        }
    }
}

var langName = radioButtonGetValue();

function convert(input, langName) {
    if (input < 0 || input > 2147483647) {
        return "Ur number out of range, pls choose number in [0,2147483647] interval";
    }

    var langSet;
    for (var i = 0; i < settings.length; i++) {
        if (settings[i].language == langName) {
            langSet = settings[i];
            break;
        }
    }
    var delimiter = langSet.delimiter;
    var vocabluary = langSet.vocabluary;
    var correctForms = langSet.correctForms;

    function splitIntoClasses(input) {
        //delemiterChecking(input,langSet);
        //debugger;
        var k = 0;
        var delNum = 1 + k;
        while (input[k] !== delimiter && k < input.length) {
            delNum = k;
            k++;
        }
        var otherClasses = input.slice(0, delNum + 1);
        var delimiterFromInput=input.slice(delNum + 1, delNum + 2);
        var fractionalClassOfNumber = input.slice(delNum + 2);
        var classArr = [];
        if (+fractionalClassOfNumber < 10 || fractionalClassOfNumber.length === 1) {
            classArr.push(fractionalClassOfNumber * 1);
        }
        else {
            classArr.push(+fractionalClassOfNumber);
        }
        //for(var i=0; i<4)
        var firstClass = otherClasses % 1000;
        if (firstClass !== 0) {
            classArr.push(firstClass);
        }
        var y = +otherClasses - firstClass;
        var secondClass = (y % 1000000) / 1000;
        if (secondClass !== 0) {
            classArr.push(secondClass);
        }
        y = y - y % 1000000;
        var thirdClass = (y % 1000000000) / 1000000;
        if (thirdClass !== 0) {
            classArr.push(thirdClass);
        }
        y = +otherClasses - thirdClass * 1000000;
        var lastClass = Math.floor(y / 1000000000);
        if (lastClass !== 0) {
            classArr.push(lastClass);
        }

        return classArr;
    }

    var convertedNumberIntoPhrase = [];
    var classes = splitIntoClasses(input);
    for (var c = 0; c < classes.length; c++) {
        if (classes[c] === 0) {
            continue;
        }
        if (classes[c] > 0) {
            convertedNumberIntoPhrase.push(convertor(classes[c], vocabluary) + " " + correctForms(classes[c])[c]);
        }
    }
    console.log(convertedNumberIntoPhrase.reverse().join(" "));
}
function delemiterChecking(input,langSet){
    var k = 0;
    var delNum = 1 + k;
    while (input[k] !== delimiter && k < input.length) {
        delNum = k;
        k++;
    }
    var delimiterFromInput=input.slice(delNum + 1, delNum + 2);
    var langSet;
    for (var i = 0; i < settings.length; i++) {
        if (settings[i].language == langName) {
            langSet = settings[i];
            break;
        }
    }
    var delimiter = langSet.delimiter;
    if(delimiterFromInput!==delimiter){
        console.log("Invalid input! For English make delimitor '.' anf for Ukrainian make delimitor ','!");
        return "Invalid input! For English make delimitor '.' anf for Ukrainian make delimitor ','!";
    }
}
function convertor(x, vacabl) {
   // debugger;
    var words = [];
    var tensAndUnitsConnector = vacabl.tensAndUnitsConnector;
    var rest = x % 100;
    var hundreds = x - rest;
    if (hundreds !== 0) {
        if (hundreds / 100 === 1) {
            //words.push("one");
            words.push(vacabl[hundreds]);
        }
        else {
            if (vacabl[hundreds] !== undefined) {
                words.push(vacabl[hundreds]);
            }
            else {
                var decadesNumber = hundreds / 100;
                words.push(vacabl[decadesNumber]);
                words.push(vacabl[100]);
            }
        }
    }
    if (rest <= 20) {
        words.push(vacabl[rest]);
    }
    else {
        var lastDigit = rest % 10;
        var lastDes = rest - lastDigit;
        var lastDigDes = vacabl[lastDes]+tensAndUnitsConnector+vacabl[lastDigit];
        words.push(lastDigDes);
       }
    return words.join(" ");
}

function disablefield() {
    document.getElementById('number').disabled = '';
    document.getElementById('number').value = 'allowed';

}


