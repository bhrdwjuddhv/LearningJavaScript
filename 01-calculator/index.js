import {
    add,
    subtract,
    multiply,
    divide,
    square,
    root,
    percentage,
    sin,
    cos,
    tan,
    ln,
    log,
    inverse,
    exponential,
    xtoy,
    mod,
    pi,
    e,
    reversesign
} from "./functions.js";



document.addEventListener('DOMContentLoaded', () => {
// IMPORT FROM HTML
    let number = document.getElementsByClassName('number');
    let display = document.getElementById('result');
    let a,b,answer,operator;
    const clear = document.getElementById('clear');
    const equal = document.getElementById('equals');
    let plus = document.getElementById('plus');
    const minus = document.getElementById('subtract');
    const product = document.getElementById('multiply');
    const division = document.getElementById('divide');
    const sq = document.getElementById('square');
    const underroot = document.getElementById('underroot');
    const percent = document.getElementById('percent');
    const sine = document.getElementById('sin');
    const cosine = document.getElementById('cos');
    const tanc = document.getElementById('tan');
    const loge = document.getElementById('loge');
    const logten = document.getElementById('log');
    const xy = document.getElementById('xtoy');
    const ex = document.getElementById('exponent');
    const signreverse = document.getElementById('signreverse');
    let modx = document.getElementById('modx');
    let reciprocal = document.getElementById('inverse');
    let pic = document.getElementById('pi');
    let ec = document.getElementById('e');



    // NUMBER
    for (let btn of number) {
        btn.addEventListener('click', () => {
            display.value += btn.innerText;
        });
    }
    clear.addEventListener('click', () => {
        display.value = ``;
    })
    pic.addEventListener('click', () => {
        answer = pi();
        display.value = `${answer}`;
    })
    ec.addEventListener('click', () => {
        answer = e();
        display.value = `${answer}`;
    })
    // OPERATORS
    plus.addEventListener('click', () => {
        a = Number(display.value);
        operator = '+';
        display.value = ``;

    })
    minus.addEventListener('click', () => {
        a = Number(display.value);
        operator = '-';
        display.value = ``;
    })
    product.addEventListener('click', () => {
        a = Number(display.value);
        operator = '*';
        display.value = ``;

    })
    division.addEventListener('click', () => {
        a = Number(display.value);
        operator = '/';
        display.value = ``;

    })
    sq.addEventListener('click', () => {
        a = Number(display.value);
        answer = square(a);
        display.value = `${answer}`;

    })
    underroot.addEventListener('click', () => {
        a = Number(display.value);
        answer = root(a);
        display.value = `${answer}`;


    })
    percent.addEventListener('click', () => {
        a = Number(display.value);
        answer = percentage(a);
        display.value = `${answer}`;
    })
    reciprocal.addEventListener('click', () => {
        a = Number(display.value);
        answer = inverse(a);
        display.value = `${answer}`;
    })
    // TRIGNOMETRY
    sine.addEventListener('click', () => {
        a = Number(display.value);
        answer = sin(a);
        display.value = `${answer}`;
    })
    cosine.addEventListener('click', () => {
        a = Number(display.value);
        answer = cos(a);
        display.value = `${answer}`;

    })
    tanc.addEventListener('click', () => {
        a = Number(display.value);
        answer = tan(a);
        display.value = `${answer}`;
    })

    //logarithmic
    loge.addEventListener('click', () => {
        a = Number(display.value);
        answer = ln(a);
        display.value = `${answer}`;

    })
    logten.addEventListener('click', () => {
        a = Number(display.value);
        answer = log(a);
        display.value = `${answer}`;

    })
    xy.addEventListener('click', () => {
        a = Number(display.value);
        operator = 'xtoy'
        display.value = ``;

    })
    ex.addEventListener('click', () => {
        a = Number(display.value);
        answer = exponential(a);
        display.value = `${answer}`;


    })

    //SIGN
    signreverse.addEventListener('click', () => {
        a = Number(display.value);
        answer = reversesign(a);
        display.value = `${answer}`;

    })
    modx.addEventListener('click', () => {
        a = Number(display.value);
        answer = mod(a);
        display.value = `${answer}`;

    })

    // EQUAL
    equal.addEventListener('click', () => {

        if (operator === '+') {
            b = Number(display.value);
            answer = add(a, b);

            display.value = `${answer}`;
        }
        else if (operator === '-') {
            b = Number(display.value);
            answer = subtract(a, b);
            display.value = `${answer}`;
        }
        else if (operator === '*') {
            b = Number(display.value);
            answer = multiply(a, b);
            display.value = `${answer}`;
        }
        else if (operator === '/') {
            b = Number(display.value);
            answer = divide(a, b);
            display.value = `${answer}`;
        }
        else if (operator === 'xtoy') {
            b = Number(display.value);
            answer = xtoy(a, b);
            display.value = `${answer}`;
        }

        operator = null;

    })



})