function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0){
        return 'ZeroDivisionError';
    }
    else {return a / b;}
}
function square(a) {
    return a * a;
}
function root(a) {
    return Math.sqrt(a);

}
function percentage(a) {
    return a / 100;
}
function sin(a){
    return Math.sin(a)

}
function cos(a) {
    return Math.cos(a);
}
function tan(a){
    return Math.tan(a);
}
function ln(a){
    return Math.log(a);
}
function log(a) {
    return Math.log10(a);
}
function inverse(a) {
    return 1/a;
}
function exponential(a) {
    return Math.pow(Math.E,a);
}
function xtoy(a,b){
    return Math.pow(a,b);
}
function mod(a){
    if (a < 0){
        return -(a);
    }
    else {
        return a;
    }
}
function pi(){
    return Math.PI;
}
function e(){
    return Math.E;
}
function reversesign(a){
    return -(a);
}

export {
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
};