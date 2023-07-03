class MovableObject extends DrawableObject {

    speed = 0.15;            // Speed for moving when not stated in classes
    otherDirection = false;  // Needed when Pepe should move in left direction.
    speedY = 0;              // Vertical speed, needed e.g. for jumping
    acceleration = 2;        // Acceleration when jumping or falling
    energy = 100;            // Gets reduced when a collision occures
    lastHit = 0;             // Will be set when hitted. Needed for hurting animation for one second.

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };                       // Offset for Collisions, will be set for every type of object in its according class.


    /**
     * Constructor for current class.
     */
    constructor() {
        super();
    }


    /**
     * Plays an animation loop.
     * 
     * @param {Array} imgArray - The Array that contains the image paths for this loop
     */
    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;  // Aber currentImage läuft doch dann irgendwann über... auch wenn 9 Billionen lange dauert
        let path = imgArray[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
        // if (this.currentImage == this.IMAGES_WALKING.length) this.currentImage = 0
    }


    /**
     * Plays an animation loop, but only once. If all images are run, the last in the loop will stay, that means the last picture will be shown on and on.
     * 
     * @param {Array} imgArray - The Array that contains the image paths for this loop
     */
    playAnimationOnce(imgArray) {
        let i = this.currentImage % imgArray.length;
        let path = imgArray[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= imgArray.length) {
            this.currentImage = imgArray.length - 1;
        }
    }


    /**
     * Checks if an object collides with an object given by the parameter.
     * 
     * @param {Object} movObj - An object of a class that extends the class MovableObject
     * @returns True or False - There is a collision or not
     */
    isColliding(movObj) {
        return (
            this.posX + this.width - this.offset.right > movObj.posX + movObj.offset.left &&
            this.posY + this.height - this.offset.bottom > movObj.posY + movObj.offset.top &&
            this.posX + this.offset.left < movObj.posX + movObj.width - movObj.offset.right &&
            this.posY + this.offset.top < movObj.posY + movObj.height - movObj.offset.bottom
        );
    }


    /**
     * Deducts the given amount from the energy of the current object.
     * 
     * @param {Integer} amount - The amount that will be deducted from the energy of the object.
     */
    hit(amount) {
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        };
    }


    /**
     * Checks if the hurting of the current object was more than a second ago.
     * 
     * @returns True of False - The hurting of the current object war more than a second ago.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // in milliseconds
        return timePassed < 1000; // last hit is more than one second old (1000 milliseconds)
    }


    /**
     * Checks if the current object is dead (energy is equal to or below 0).
     * 
     * @returns True or False - The current object is dead or not.
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * Applies gravity to the current object, that means it can fall down now.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the current object is above ground or not.
     * 
     * @returns True or False - The current object is above ground or not.
     */
    isAboveGround() {
        if (this instanceof Bottle) {  // Bottles should always fall down, even outside the canvas
            return true;
        } else {
            return this.posY < 200;
        }
    }


    /**
     * Lets the current object jump through assigning a speed value for the Y-axis.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Specifies the speed of the object to the left side.
     */
    moveLeft() {
        this.posX -= this.speed;
    }


    /**
     * Specifies the speed of the object to the right side.
     */
    moveRight() {
        this.posX += this.speed;
    }
}