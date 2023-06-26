class Bottle extends MovableObject {

    width = 100;
    height = 100;
    offset = {
        top: 25,
        left: 50,
        right: 25,
        bottom: 15
    };
    posY = 650;
    posX = 500;

    bottleGroundImages = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
    

    constructor(newPosX) {
        super();
        let leftRight = Math.floor(Math.random()*2);
        super.loadImage(this.bottleGroundImages[leftRight]);
        if (leftRight == 1) { // change margin left and right
            this.offset.left = 35;
            this.offset.right = 40;
        }

        this.posX = 390 + (newPosX * 150) + (Math.random() * 60 - 20);
        this.posY = 680 - Math.random() * 40;
        this.speed = 0;

        // Bilder laden : Gehen
        // this.loadImages(this.IMAGES_WALKING);
        // this.moveWalking = this.imageCache;
        
        // this.animate();
    }

    animate() {
        // this.moveLeft();

        // setInterval(() => {
        //     this.playAnimation(this.IMAGES_WALKING);
        // }, 175)
        
    }
}