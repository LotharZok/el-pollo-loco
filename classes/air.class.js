class Air extends MovableObject {
    posX = 0;
    posY = 0;
    width = 1440;
    height = 810;

    constructor(newPosX) {
        super().loadImage('img/5_background/layers/air.png');
        this.posX = newPosX;
    }
}