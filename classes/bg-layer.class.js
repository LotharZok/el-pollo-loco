class BgLayer extends MovableObject {
    /**
     * Global variables
     */
    posX = 0;
    posY = 0;
    width = 2880;
    height = 810;
    speed;
    world;


    /**
     * Constructor for thie object. Needs parameters for a layer (which one) and the starting position.
     * 
     * @param {Integer} layer - Defines which layer should be displayed
     * @param {Integer} newPosX - The horizontal starting position of the image
     */
    constructor(layer, newPosX) {
        super();
        this.posX = newPosX;
        switch (layer) {
            case 1:
                super.loadImage('img/5_background/layers/1_first_layer/full.png');
                break;
            case 2:
                super.loadImage('img/5_background/layers/2_second_layer/full.png');
                break;
            case 3:
                super.loadImage('img/5_background/layers/3_third_layer/full.png');4
                break;
        };
    }
}