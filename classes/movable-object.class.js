class MovableObject {
    posX;
    posY;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;

    speed = 0.15;
    otherDirection = false;

    // Jump and fall down
    speedY = 0;
    acceleration = 2;

    // Offset for Collisions
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imgArray) {
        imgArray.forEach(pathInArray => {
            let img = new Image();
            img.src = pathInArray;
            // this.imageCache.push(img);
            this.imageCache[pathInArray] = pathInArray;
        });
    }

    playAnimation(imgArray) {
        let i = this.currentImage % imgArray.length;  // Aber currentImage läuft doch dann irgendwann über... auch wenn 9 Billionen lange dauert
        let path = imgArray[i];
        this.img.src = this.moveWalking[path];
        this.currentImage++;
        // if (this.currentImage == this.IMAGES_WALKING.length) this.currentImage = 0;

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
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
        // return this.posX + this.width > movObj.posX &&
        //     this.posY + this.height > movObj.posY &&
        //     this.posX < movObj.posX &&
        //     this.posY < movObj.posY + movObj.height;

        return (
            this.posX + this.width - this.offset.right > movObj.posX + movObj.offset.left &&
            this.posY + this.height - this.offset.bottom > movObj.posY + movObj.offset.top &&
            this.posX + this.offset.left < movObj.posX + movObj.width - movObj.offset.right &&
            this.posY + this.offset.top < movObj.posY + movObj.height - movObj.offset.bottom
        )

        // return (this.posX + this.width) >= movObj.posX && this.posX <= (movObj.posX + movObj.width) &&
        //     (this.posY + this.offset.top + this.height) >= movObj.posY &&
        //     (this.posY + this.offset.top) <= (movObj.posY + movObj.height) &&
        //     obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
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
        this.speedY = 25;
    }

    moveLeft() {
        this.posX -= this.speed;
    }

    moveRight() {
        this.posX += this.speed;
    }
}