enemies = [
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

const level1 = new Level(enemies, clouds, backgrounds, coins, bottles);