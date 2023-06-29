class EndGameImage extends DrawableObject {

    posX = 0;
    posY = 0;
    width = 1440;
    height = 810;

    isVisible = false;

    constructor(imgPath) {
        super();
        this.loadImage(imgPath);
    }
}