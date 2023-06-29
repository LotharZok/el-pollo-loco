class Bottle extends MovableObject {


    /**
     * Global variables
     */
    posX;                // Variable for the horizontal position. Will be calculated on creation of an object.
    posY;                // Variable for the vertical position. Will be calculated on creation of an object.
    width = 100;         // Standard width of a bottle image
    height = 100;        // Standard height of a bottle image
    offset = {
        top: 25,
        left: 50,
        right: 25,
        bottom: 15
    };                   // Offset values for a bottle image
    isCollected = false; // Default value: On creation a bottle is not yet collected
    hasHitBoss = false;  // Default value
    throwInterval;       // Variable for the interval id when throwing a bottle
    splashInterval;      // Variable for the interval id when a bottle hits the end boss
    splashCounter = 0;   // Counter for the images. Used for stopping animation, that is stopping a loop


    /**
     * Sounds for the bottles
     */
    bottleBreakSound = new Audio('audio/bottle-break-2.mp3');
    throwingSound = new Audio('audio/bottle-swish.mp3');


    /**
     * Image arrays for specified movements of a bottle
     */
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


    /**
     * Creates a new bottle object and sets its starting some starting values.
     * By random it is chosen whether a left-angled or a right-angled bottle will be created.
     * Based on this decision some values are set. Also a horizontal position is set.
     * 
     * @param {Integer} newPosX - The value for the horizontal position for the object to be created.
     */
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


    /**
     * Starts the throw animation of a bottle.
     * Starting point is dependent on the position of Pepe at this moment. Also the direction is dependent on Pepes viewing direction.
     * 
     * @param {Integer} x - The horizontal starting position of the bottle to be thrown
     * @param {Integer} y - The vertical starting position of the bottle to be thrown
     * @param {Boolean} otherDirection - Defines in which direction the bottle will be thrown
     */
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


    /**
     * Starts the splash animation when a bottle hits the end boss.
     */
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

}