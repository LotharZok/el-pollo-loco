class Air extends MovableObject {
    /**
     * Global variables
     */
    posX = 0;
    posY = 0;
    width = 1440;
    height = 810;


    /**
     * Constructor for the air object. Needs a horizontal position as parameter.
     * 
     * @param {Integer} newPosX - The horizontal position where the air image will start
     */
    constructor(newPosX) {
        super().loadImage('img/5_background/layers/air.png');
        this.posX = newPosX;
    }
}