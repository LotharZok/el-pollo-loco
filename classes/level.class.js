class Level {
    enemies;
    clouds;
    backgrounds;
    coins;
    bottles;
    endX = 3000;
    throwableBottles = 0;

    constructor(newEnemies, newClouds, newBackgrounds, newCoins, newBottles) {
        this.enemies = newEnemies;
        this.clouds = newClouds;
        this.backgrounds = newBackgrounds;
        this.coins = newCoins;
        this.bottles = newBottles;
    }
}