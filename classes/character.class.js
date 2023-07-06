class Character extends MovableObject {

    /**
     * Global variables
     */
    width = 305;
    height = 600;
    offset = {
        top: 240,
        left: 50,
        right: 75,
        bottom: 30
    };
    posX = 0;
    posY = 210;
    pushX;
    speed = 20;         // Horizontal speed of Pepe
    idlingCounter = 0;  // Used to registrate how long Pepe is in idle mode
    hasDied = false;    // Has Pepe died?
    dyingCounter = 0;   // Counter to stop the dying scene (should run only once)
    bottleCounter = 0;  // Needed for registering which bottles have been thrown
    keyInterval;        // Gets the ID of the interval for checking the keyboard
    characterInterval;  // Gets the ID of the interval for the animation of Pepe
    world;              // mittels world.keyboard kann ich dann auf Tasten reagieren
    

    /**
     * Arrays with the images for moving Pepe
     */
    IMAGES_IDLING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * Declaration of several sound used for Pepe
     */
    walkingSound = new Audio('audio/walking.mp3');
    jumpingSound = new Audio('audio/jump.mp3');
    dyingSound = new Audio('audio/dying-pepe.mp3');
    hurtingSound = new Audio('audio/pepe-hurt.mp3');


    /**
     * Creates the character object (a.k.a. Pepe). Loads the image arrays and starts animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');  // starting image: Pepe is standing there

        this.loadImages(this.IMAGES_WALKING);  // Load images : Walking
        this.loadImages(this.IMAGES_JUMPING);  // Load images : Jumping
        this.loadImages(this.IMAGES_IDLING);   // Load images : Waiting / Idling
        this.loadImages(this.IMAGES_SLEEPING); // Load images : Sleeping
        this.loadImages(this.IMAGES_HURTING);  // Load images : Hurting
        this.loadImages(this.IMAGES_DYING);    // Load images : Dying

        this.applyGravity();
        this.animate();
    }


    /**
     * Animation of Pepe.
     * Calls the checks for keystrokes (moveFunctionality).
     * Calls the checks for character reactions (characterReactionFunctionality).
     */
    animate() {
        this.keyInterval = setInterval(() => {
            this.moveFunctionality();
        }, 75);
        intervalIDsArray.push(this.keyInterval);

        this.characterInterval = setInterval(() => {
            this.characterReactionFunctionality();
        }, 125)
        intervalIDsArray.push(this.characterInterval);
    }


    /**
     * Controls the move functionality.
     * Checks for keystrokes and calls corresponding functions.
     */
    moveFunctionality() {
        this.walkingSound.pause();
        if (this.shallRunToRight()) this.moveRight();
        if (this.shallRunToLeft()) this.moveLeft();
        if (this.shallJump()) this.jump();
        if (this.shallThrow()) this.throwBottle();
        this.world.cameraX = -(this.posX) + 100;  // Movement of the (background) world (Pepe's position remains the same on the screen).
    }


    /**
     * Checks if Pepe should walk to the right.
     * 
     * @returns True or False
     */
    shallRunToRight() {
        return this.world.keyboard.RIGHT && this.posX < this.world.level.endX;
    }


    /**
     * Starts Pepes walking to the right and starts also the walking sound.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround())
            if (!muteSounds) this.walkingSound.play();
    }


    /**
     * Checks if Pepe should walk to the left.
     * 
     * @returns True or False
     */
    shallRunToLeft() {
        return this.world.keyboard.LEFT && this.posX > -2700;
    }


    /**
     * Starts Pepes walking to the left and starts also the walking sound.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround())
            if (!muteSounds) this.walkingSound.play();
    }


    /**
     * Checks if Pepe should jump.
     * 
     * @returns True or False
     */
    shallJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * Starts Pepe jumping and starts also the jumping sound.
     */
    jump() {
        super.jump();
        if (!muteSounds) this.jumpingSound.play();
    }


    /**
     * Pushes Pepe back 300 units. Happens when he runs into the endboss.
     * This way he is not able to pass the endboss and get behing it.
     */
    pushBack() {
        this.idlingCounter = 0;
        this.pushX = this.posX - 300;
        let tempInterval = setInterval(() => {
            if (this.pushX < this.posX) {
                this.posX -= 10;
            } else {
                clearInterval(tempInterval);
            }
        }, 50);
    }


    /**
     * Checks if Pepe should throw a bottle.
     * 
     * @returns True or False
     */
    shallThrow() {
        return this.world.keyboard.THROW;
    }


    /**
     * Starts Pepe throwing a bottle in the direction he is looking.
     * Counts how many Pepe has already thrown. He is not allowed to throw more than he has collected.
     * Set also the status bar of collected bottles.
     */
    throwBottle() {
        this.world.keyboard.THROW = false;
        this.idlingCounter = 0;
        if (this.world.level.throwableBottles > 0) {  // Only if there are bottles left to throw
            this.world.level.throwableBottles--;
            // Throw bottle
            this.world.throwableBottles[this.bottleCounter].throw(this.posX, this.posY, this.otherDirection);
            this.bottleCounter++;
            // Decrease bottle status bar
            let newValue = this.world.statusBarBottles.percentage -= (100/this.world.level.bottles.length);
            this.world.statusBarBottles.setPercentage('bottles', newValue);
        }
    }


    /**
     * Controls the reaction of Pepe according to the status of several variables.
     * Calls according functions.
     */
    characterReactionFunctionality() {
        if (this.isAboveGround()) {
            this.animateJumping();
        } else if (this.isDead()) {
            this.animateDying();
        } else if (this.isHurt()) {
            this.animateHurting();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.animateWalking();
        } else {
            this.animateIdlingSleeping();
        }
    }


    /**
     * Starts the jumping animation.
     */
    animateJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.idlingCounter = 0;
    }


    /**
     * Starts the dying animation. Plays an according sound.
     * Afterwards stops some intervals.
     */
    animateDying() {
        if (!this.hasDied) {  // show dying animation, but only once
            this.applyGravity();
            this.playAnimation(this.IMAGES_DYING);
            if (!muteSounds) this.dyingSound.play();
            this.dyingCounter++;
            if (this.dyingCounter >= 6) this.hasDied = true;
        } else {
            clearAllIntervals();
        }
    }


    /**
     * Starts the hurting animation. Plays an according sound.
     */
    animateHurting() {
        this.playAnimation(this.IMAGES_HURTING); // show hurting animation
        if (!muteSounds) this.hurtingSound.play();
    }


    /**
     * Starts the walking animation.
     */
    animateWalking() {
        this.playAnimation(this.IMAGES_WALKING); // show walking animation
        this.idlingCounter = 0;
    }


    /**
     * Starts the idling animation. After around 15 seconds it starts the sleeping animation.
     */
    animateIdlingSleeping() {
        this.idlingCounter++;  // show idling or sleeping animation
        this.idlingCounter <= 120 ? this.playAnimation(this.IMAGES_IDLING) : this.playAnimation(this.IMAGES_SLEEPING);
    }
}