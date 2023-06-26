class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;

    // Jump and fall down
    speedY = 0;
    acceleration = 2;

    energy = 100;  // Gets reduced when a collision occures
    lastHit = 0;

    // Offset for Collisions
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor() {
        super();
    }

    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;  // Aber currentImage läuft doch dann irgendwann über... auch wenn 9 Billionen lange dauert
        let path = imgArray[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
        // if (this.currentImage == this.IMAGES_WALKING.length) this.currentImage = 0
    }

    drawFrame(ctx) {
        // Rahmen für die Kollisionskontrolle - wird später wieder entfernt
        // TEST : Nur für Pepe und die Hühner
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX + this.offset.left, this.posY + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(movObj) {
        return (
            this.posX + this.width - this.offset.right > movObj.posX + movObj.offset.left &&
            this.posY + this.height - this.offset.bottom > movObj.posY + movObj.offset.top &&
            this.posX + this.offset.left < movObj.posX + movObj.width - movObj.offset.right &&
            this.posY + this.offset.top < movObj.posY + movObj.height - movObj.offset.bottom
        );
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        };
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // in milliseconds
        return timePassed < 1000; // last hit is more than one and a half seconds old (5000 milliseconds)
    }

    isDead() {
        return this.energy <= 0;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.posY < 200;
    }

    jump() {
        this.speedY = 30;
    }

    moveLeft() {
        this.posX -= this.speed;
    }

    moveRight() {
        this.posX += this.speed;
    }
}