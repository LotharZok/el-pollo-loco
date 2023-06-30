/**
 * Create Enemies:
 * One End Boss (always first entry in array).
 * Twelve chicken (random normal or small);
 */
enemies = [
    new Endboss()
];
for (let i = 0; i < 12; i++) {
    enemies.push(new Chicken());
}


/**
 * Create Clouds
 */
clouds = [
    new Cloud()
];


/**
 * Create Background
 */
backgrounds = [
    new BgLayer(3, -2880),
    new BgLayer(2, -2880),
    new BgLayer(1, -2880),

    new BgLayer(3, 0),
    new BgLayer(2, 0),
    new BgLayer(1, 0),
    
    new BgLayer(3, 2880),
    new BgLayer(2, 2880),
    new BgLayer(1, 2880)
];


/** 
 * Create 15 Coins
 */
coins = [];
for (let i = 0; i < 15; i++) {
    coins.push(new Coin(Math.floor(Math.random() * 3), i));
}


/**
 * Create 15 bottles
 */
bottles = [];
for (let i = 0; i < 15; i++) {
    bottles.push(new Bottle(i));
}


/**
 * If a bottle is collected, this variable is set + 1.
 * That way I know how many bottles I have to throw.
 * When throwing a bottle, this array will be minimized by 1.
 */
throwableBottles = 0;


/**
 * Create a new Level
 */
const level1 = new Level(enemies, clouds, backgrounds, coins, bottles);