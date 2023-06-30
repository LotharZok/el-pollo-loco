class EndGameImage extends DrawableObject {
    /**
     * Global variables
     */
    posX = 0;
    posY = 0;
    width = 1440;
    height = 810;
    isVisible = false;


    /**
     * Constructor for a game end image. Needs a path to the according image as parameter.
     * 
     * @param {String} imgPath - The path to the image to be displayed
     */
    constructor(imgPath) {
        super();
        this.loadImage(imgPath);
    }
}