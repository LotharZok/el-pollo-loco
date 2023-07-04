class Endboss extends MovableObject {
    /**
     * Global variables
     */
    width = 522;
    height = 609;
    offset = {
        top: 140,
        left: 100,
        right: 70,
        bottom: 50
    }; 
    moveWalking = {};
    bossInterval;
    moveInterval;

    isAlerted = false;
    isAttacking = false;
    isTooNear = false;
    dyingCounter = 0;
    hasDied = false;


    /**
     * Declaration of several sound used for the endboss
     */
    hastaSound = new Audio('audio/hasta-la-vista.mp3');
    hurtSound = new Audio('audio/endboss-hurt.mp3');
    hasPlayedSound = false;


    /**
     * Arrays with the images for moving the endboss
     */
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


    /**
     * Creates the endboss object (the large chicken). Calls the loading of the image arrays and starts animation.
     */
    constructor() {
        super();
        
        this.loadImageArrays();
        this.currentMovingArray = this.IMAGES_ALERT;
        
        this.speed = 0; //0.05; // Stays on place, attacks when hurt
        this.posX = 3000;
        this.posY = 200;

        this.animate();
    }


    /**
     * Loads the image arrays for the several possible movements of this object.
     */
    loadImageArrays() {
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
    }


    /**
     * Animation of the endboss. Reacts to the current status of the object.
     */
    animate() {
        this.moveInterval = setInterval( () => {
            this.moveLeft();
        }, 25);
        intervalIDsArray.push(this.moveInterval);

        this.bossInterval = setInterval(() => {
            if (this.isDead()) {
                this.deadFunctionality();
            } else if (this.isHurt()) {
                this.hurtFunctionality();
            } else {
                this.playAnimation(this.currentMovingArray);
                if (this.energy < 100 || this.isTooNear) this.speed = 0.15 + Math.random() * 0.5;
            }
        }, 175);
        intervalIDsArray.push(this.bossInterval);
    }


    /**
     * Starts the dying animation and plays according sounds.
     */
    deadFunctionality() {
        this.playAnimationOnce(this.IMAGES_DYING);
        if (!this.hasPlayedSound) {
            this.hastaSound.volume = 0.5;
            this.hastaSound.loop = false;
            if (!muteSounds) this.hastaSound.play();
            this.hasPlayedSound = true;
        };
    }


    /**
     * Starts the hurt animation and plays the according sound.
     */
    hurtFunctionality() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtSound.loop = false;
        if (!muteSounds) this.hurtSound.play();
        // Endboss now attacks
        this.currentMovingArray = this.IMAGES_WALKING;
    }


    /**
     * Starts the walking animation if Pepe has come too near.
     */
    tooNearFunctionality() {
        this.currentMovingArray = this.IMAGES_WALKING;
        this.isTooNear = true;
    }
}