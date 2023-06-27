class Chicken extends MovableObject {
    /**
    * Global Variables
    */
    width = 124;
    height = 122;
    speed = 0.15;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 15
    };
    moveWalking = {};
    rndm = 0;
    hasDied = false;

    /**
     * Arrays with images for moving a chicken
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD_SMALL = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Constructor for Chicken Class
     */
    constructor() {
        super()
        this.rndm = Math.round(Math.random());
        if (this.rndm == 0) {
            this.loadImage(this.IMAGES_WALKING[1]);
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_DEAD);
        } else {
            this.loadImage(this.IMAGES_WALKING_SMALL[1]);
            this.loadImages(this.IMAGES_WALKING_SMALL);
            this.loadImages(this.IMAGES_DEAD_SMALL);
            this.width = 118;
            this.height = 105;
        }

        this.posX = 400 + Math.random() * 4000;    // Random X-Position but at least 400 px from left
        this.posY = 678 - Math.random() * 25;      // Random Y-Position in a certain range
        this.speed = 0.15 + Math.random() * 0.25;  // Zufällig Geschwindigkeit zwischen 0.15 und 0.4

        this.moveWalking = this.imageCache;
        
        this.animate();
    }


    /**
     * Animation of a chicken
     */
    animate() {
        // this.moveLeft();
        setInterval( () => {
            this.moveLeft();
        }, 25);

        setInterval(() => {
            (this.hasDied) ? 
                (this.rndm == 0) ? this.playAnimation(this.IMAGES_DEAD) : this.playAnimation(this.IMAGES_DEAD_SMALL) :
                (this.rndm == 0) ? this.playAnimation(this.IMAGES_WALKING) : this.playAnimation(this.IMAGES_WALKING_SMALL);
        }, 175)
    }
}