class Level {
    /**
     * Global variables
     */
    enemies;
    clouds;
    backgrounds;
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
     * @param {Array} newBackgrounds - Array of objects of the class BgLayer
     * @param {Array} newCoins - Array of objects of the class Coin
     * @param {Array} newBottles - Array of objects of the class Bottle
     */
    constructor(newEnemies, newClouds, newBackgrounds, newCoins, newBottles) {
        this.enemies = newEnemies;
        this.clouds = newClouds;
        this.backgrounds = newBackgrounds;
        this.coins = newCoins;
        this.bottles = newBottles;
    }
}