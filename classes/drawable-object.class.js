class DrawableObject {
    img;               // An image object
    imageCache = {};   // JSON object of paths and images of an image array
    currentImage = 0;  // Index of the current image inside an image array
    posX;              // Position on x-axis (horizontal)
    posY;              // Position on y-axis (vertical)
    height;            // Height of an object
    width;             // Width of an object


    /**
     * Loads an image from the given path.
     * 
     * @param {String} path - The path of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Creates image objects for every path inside the given image array and puts it in the image cache.
     * 
     * @param {Array} imgArray - An array of image paths
     */
    loadImages(imgArray) {
        imgArray.forEach(pathInArray => {
            let image = new Image();
            image.src = pathInArray;

            this.imageCache[pathInArray] = pathInArray;
        });
    }


    /**
     * Draws the current object onto the canvas.
     * 
     * @param {Object} ctx - The current canvas context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        } catch (e) {
            console.warn('error loading image', e);
            console.log('image: ', this.img);
            console.log('could not load image: ', this.img);
        }
        
    }


    /**
     * Draws a frame around the current object if that object is of a certain type. Needed for developing the game.
     * 
     * @param {Object} ctx - The current canvas context.
     */
    drawFrame(ctx) {
        // Rahmen für die Kollisionskontrolle - wird später wieder entfernt
        // TEST : Nur für bestimmte Klassen
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX + this.offset.left, this.posY + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }
}