class Level {
    /**
     * Global variables
     */
    enemies;
    clouds;
    backgrounds1;
    backgrounds2;
    backgrounds3;
    coins;
    bottles;
    endX = 3000;
    throwableBottles = 0;


    /**
     * Constructor for this object.
     * Gets several arrays as parameters to describe the current level of the game.
     * 
     * @param {Array} newEnemies - Array of objects of the classes Chicken or Endboss
     * @param {Array} newClouds - Array of objects of the class Cloud
     * @param {Array} newBackgrounds1 - Array of objects of the class BgLayer (layer 1)
     * @param {Array} newBackgrounds2 - Array of objects of the class BgLayer (layer 2)
     * @param {Array} newBackgrounds3 - Array of objects of the class BgLayer (layer 3)
     * @param {Array} newCoins - Array of objects of the class Coin
     * @param {Array} newBottles - Array of objects of the class Bottle
     */
    constructor(newEnemies, newClouds, newBackgrounds1, newBackgrounds2, newBackgrounds3, newCoins, newBottles) {
        this.enemies = newEnemies;
        this.clouds = newClouds;
        this.backgrounds1 = newBackgrounds1;
        this.backgrounds2 = newBackgrounds2;
        this.backgrounds3 = newBackgrounds3;
        this.coins = newCoins;
        this.bottles = newBottles;
    }
}