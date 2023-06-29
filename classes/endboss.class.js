class Endboss extends MovableObject {

    // Größe ist immer gleich
    width = 522;
    height = 609;
    offset = {
        top: 140,
        left: 100,
        right: 70,
        bottom: 50
    }; 
    moveWalking = {};

    isAlerted = false;
    isAttacking = false;
    bossInterval;
    dyingCounter = 0;
    hasDied = false;
    hastaSound = new Audio('audio/hasta-la-vista.mp3');
    hurtSound = new Audio('audio/endboss-hurt.mp3');
    hasPlayedSound = false;

    // world;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DYING = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    currentMovingArray = [];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        // this.moveWalking = this.imageCache;
        this.currentMovingArray = this.IMAGES_ALERT;
        
        // this.speed = 0.05 + Math.random() * 0.15;  // Zufällige Geschwindigkeit zwischen 0.05 und 0.2 (er soll ja mehr oder weniger am Ort bleiben)
        this.speed = 0; // Soll erstmal am gleichen Platz bleiben
        this.posX = 3000;
        // this.posX = this.world.level.endX;
        this.posY = 200;

        this.animate();
    }

    animate() {
        this.moveLeft();

        this.bossInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationOnce(this.IMAGES_DYING);
                // this.hastaSound.volume = 1.5;
                if (!this.hasPlayedSound) {
                    this.hastaSound.volume = 0.5;
                    this.hastaSound.loop = false;
                    this.hastaSound.play();
                    this.hasPlayedSound = true;
                };
                // this.world.wonImg.posX = this.posX - 100;
                // this.world.wonImg.isVisible = true;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurtSound.loop = false;
                this.hurtSound.play();
            } else {
                this.playAnimation(this.currentMovingArray);
            }
        }, 175)
    }

}