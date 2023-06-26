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
            let img = new Image();
            img.src = pathInArray;
            // this.imageCache.push(img);
            this.imageCache[pathInArray] = pathInArray;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
}