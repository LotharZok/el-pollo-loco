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
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(movObj) {
        return this.posX + this.width > movObj.posX &&
            this.posY + this.height > movObj.posY &&
            this.posX < movObj.posX &&
            this.posY < movObj.posY + movObj.height;

        // return (this.posX + this.width) >= obj.posX && this.posX <= (obj.posX + obj.width) &&
        //     (this.posY + this.offsetY + this.height) >= obj.posY &&
        //     (this.posY + this.offsetY) <= (obj.posY + obj.height) &&
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