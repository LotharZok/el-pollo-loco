class Chicken extends MovableObject {
    // Größe ist immer gleich
    width = 124;
    height = 122;
    speed = 0.15;
    moveWalking = {};

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png')

        this.posX = 400 + Math.random() * 1040; 
        this.posY = 678 - Math.random() * 25;
        this.speed = 0.15 + Math.random() * 0.25;  // Zufällig Geschwindigkeit zwischen 0.15 und 0.4

        // Bilder laden : Gehen
        this.loadImages(this.IMAGES_WALKING);
        this.moveWalking = this.imageCache;
        
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval( () => {
            this.moveLeft();
        }, 25);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 175)
        
    }
}