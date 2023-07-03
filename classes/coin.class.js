class Coin extends MovableObject {
    /**
     * Global variable
     */
    width = 150;                    // Standard width of a coin image
    height = 150;                   // Standard height of a coin image
    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55
    }                               // Offset values for a coin image
    yValues = [290, 420, 550, 680]; // Possible values for positioning on the Y-axis
    isCollected = false;            // Default value: On creation a coin is not yet collected
    coinInterval;


    /**
     * Image arrays for specified movements of a bottle
     */
    IMAGES_PULSATING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];


    /**
     * Create a new coin object and loads the images for this object.
     * Also starts the animation (pulsing).
     * 
     * @param {Integer} newPosY - The position on the Y-axis for the new object
     * @param {Integer} newPosX - The position on the X-axis for the new object
     */
    constructor(newPosY, newPosX) {
        super().loadImage('img/8_coin/coin_1.png')

        this.posX = 400 + (newPosX * 160); 
        this.posY = this.yValues[newPosY];
        this.speed = 0;

        this.loadImages(this.IMAGES_PULSATING);
        this.animate();
    }


    /**
     * Starts the interval with the animation of the current object.
     */
    animate() {
        this.coinInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_PULSATING);
        }, 175);
        intervalIDsArray.push(this.coinInterval);
    }
}