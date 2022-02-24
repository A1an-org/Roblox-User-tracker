const {MS1,MS2} = require("./gamepasses.json");

module.exports = function calculatGamepasses(arrayOfOwnedGamepasses){
    let int = 0;
    for(let gamepass of arrayOfOwnedGamepasses){
        if(MS1[gamepass])int += MS1[gamepass].power;
    }
    if(int > 1000)int = 1000;
    return int;
}