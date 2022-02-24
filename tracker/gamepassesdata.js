/*
 copyright not allowed as its owned by crazy4k {https://github.com/Crazy4k/Crazybot}
*/

const {MS1, TKB} = require("./gamepasses.json");

module.exports = function calculatGamepasses(arrayOfOwnedGamepasses){
    let int = 0;
    for(let gamepass of arrayOfOwnedGamepasses){
        if(MS1[gamepass])int += MS1[gamepass].power;
        else if(TKB[gamepass])int += TKB[gamepass].power; 
    }//bro how does this works again?
    if(int > 10)int = 10;
    return int;
}