class ChickenSmall extends Chicken {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    width = 118;
    height = 105;

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[1]);
    }
}