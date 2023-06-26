class Coin extends MovableObject {
    // Größe ist immer gleich
    width = 150;
    height = 150;
    yValues = [290, 420, 550, 680];
    moveWalking = {};

    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor(newPosY, newPosX) {
        super().loadImage('img/8_coin/coin_1.png')

        this.posX = 400 + (newPosX * 170); 
        this.posY = this.yValues[newPosY];
        this.speed = 0;

        // Bilder laden : Gehen
        this.loadImages(this.IMAGES_WALKING);
        this.moveWalking = this.imageCache;
        
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 175)
        
    }
}