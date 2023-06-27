enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss() 
];

clouds = [
    new Cloud()
];
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

coins = [];
for (let i = 0; i < 15; i++) {
    coins.push(new Coin(Math.floor(Math.random() * 3), i));
}

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

const level1 = new Level(enemies, clouds, backgrounds, coins, bottles);