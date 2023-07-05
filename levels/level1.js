/**
 * Global variable
*/
let level1;
let enemies = [];
let clouds = [];
let backgrounds3 = [];
let backgrounds2 = [];
let backgrounds1 = [];
let coins = [];
let bottles = [];


/**
 * If a bottle is collected, this variable is set + 1.
 * That way I know how many bottles I have to throw.
 * When throwing a bottle, this array will be reduced by 1.
 */
throwableBottles = 0;


/**
 * Creates a new Level. Called when the game is started by clicking on the welcome screen.
 */
function initLevel() {
    createEnemies();
    createClouds();
    createBackgrounds3();
    createBackgrounds2();
    createBackgrounds1();
    createCoins();
    createBottles();
    level1 = new Level(enemies, clouds, backgrounds1, backgrounds2, backgrounds3, coins, bottles);
}


/**
 * Create Enemies:
 * One End Boss (always first entry in array).
 * Twelve chicken (random normal or small);
 */
function createEnemies() {
    enemies = [
        new Endboss()
    ];
    for (let i = 0; i < 12; i++) {
        enemies.push(new Chicken());
    }
}


/**
 * Create Clouds
 */
function createClouds() {
    clouds = [
        new Cloud()
    ];
}


/**
 * Create background of layer 3 (the background layer)
 */
function createBackgrounds3() {
    backgrounds3 = [
        new BgLayer(3, -2880),
        new BgLayer(3, 0),       
        new BgLayer(3, 2880),
    ];
}


/**
 * Create background of layer 2 (the middle layer)
 */
function createBackgrounds2() {
    backgrounds2 = [
        new BgLayer(2, -2880),
        new BgLayer(2, 0),       
        new BgLayer(2, 2880),
    ];
}


/**
 * Create background of layer 1 (the foreground layer)
 */
function createBackgrounds1() {
    backgrounds1 = [
        new BgLayer(1, -2880),
        new BgLayer(1, 0),       
        new BgLayer(1, 2880),
    ];
}


/** 
 * Create 15 Coins to collect
 */
function createCoins() {
    coins = [];
    for (let i = 0; i < 15; i++) {
        coins.push(new Coin(Math.floor(Math.random() * 3), i));
    }
}


/**
 * Create 15 bottles to collect
 */
function createBottles() {
    bottles = [];
    for (let i = 0; i < 15; i++) {
        bottles.push(new Bottle(i));
    }
}