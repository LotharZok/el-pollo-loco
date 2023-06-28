class Bottle extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 25,
        left: 50,
        right: 25,
        bottom: 15
    };
    posY = 650;
    posX = 500;
    isCollected = false;
    hasHitBoss = false;
    throwInterval;
    splashInterval;
    splashCounter = 0;
    bottleBreakSound = new Audio('audio/bottle-break-2.mp3');

    bottleGroundImages = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    bottleRotationImages = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    bottleSplashImages = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    throwingSound = new Audio('audio/bottle-swish.mp3');

    constructor(newPosX) {
        super();
        let leftRight = Math.floor(Math.random()*2);
        super.loadImage(this.bottleGroundImages[leftRight]);
        if (leftRight == 1) { // change margin left and right
            this.offset.left = 35;
            this.offset.right = 40;
        }

        this.posX = 390 + (newPosX * 140) + (Math.random() * 60 - 20);
        this.posY = 680 - Math.random() * 40;
        this.speed = 0;
    }

    throw(x, y, otherDirection) {
        this.throwingSound.play();
        super.loadImage(this.bottleRotationImages[0]);
        super.loadImages(this.bottleRotationImages);
        
        this.posX = x + 100;
        this.posY = y + 300;
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            otherDirection ? this.posX -= 15 : this.posX += 15;
            this.playAnimation(this.bottleRotationImages);
        }, 25);
    }

    startSplashAnimation() {
        clearInterval(this.throwInterval);
        this.loadImages(this.bottleSplashImages);
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.bottleSplashImages);
            this.bottleBreakSound.play();
            this.splashCounter++;
            if (this.splashCounter >= 6) {
                clearInterval(this.splashInterval);
            }
        }, 25);
    }

    animate() {

    }
}