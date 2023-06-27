class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    posX;
    posY;
    height;
    width;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imgArray) {
        imgArray.forEach(pathInArray => {
            let image = new Image();
            image.src = pathInArray;

            // this.imageCache.push(img);
            this.imageCache[pathInArray] = pathInArray;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        } catch (e) {
            console.warn('error loading image', e);
            console.log('image: ', this.img);
            console.log('could not load image: ', this.img);
        }
        
    }

    drawFrame(ctx) {
        // Rahmen für die Kollisionskontrolle - wird später wieder entfernt
        // TEST : Nur für bestimmte Klassen
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX + this.offset.left, this.posY + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}