class Endboss extends MovableObject {

    // Größe ist immer gleich
    width = 522;
    height = 609;
    offset = {
        top: 140,
        left: 30,
        right: 70,
        bottom: 50
    };
    moveWalking = {};

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ANGRY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    currentMovingArray = [];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ANGRY[0]);
        this.loadImages(this.IMAGES_ANGRY);
        this.moveWalking = this.imageCache;
        this.currentMovingArray = this.IMAGES_ANGRY;
        
        // this.speed = 0.05 + Math.random() * 0.15;  // Zufällig Geschwindigkeit zwischen 0.05 und 0.2 (er soll ja mehr oder weniger am Ort bleiben)
        this.speed = 0; // Soll am gleichen Platz bleiben
        this.posX = 3000;
        // this.posX = this.world.level.endX;
        this.posY = 200;

        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.currentMovingArray);
        }, 175)
    }
    
}