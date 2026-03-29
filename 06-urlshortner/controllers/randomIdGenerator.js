const {router} = require("express/lib/application");

function randomIdGenerator(number) {
    const str = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let result = "";
    for (let i = 0; i < number; i++) {
        let random = Math.floor(Math.random() * str.length);
        result += str[random];
    }
    return result;
}

module.exports = { randomIdGenerator };