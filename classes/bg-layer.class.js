class BgLayer extends MovableObject {
    posX = 0;
    posY = 0;
    width = 2880;
    height = 810;
    speed;
    world;

    constructor(layer, newPosX) {
        super();
        this.posX = newPosX;
        switch (layer) {
            case 1:
                super.loadImage('img/5_background/layers/1_first_layer/full.png');
                this.speed = 15;
                break;
        
            case 2:
                super.loadImage('img/5_background/layers/2_second_layer/full.png');
                this.speed = 10;
                break;
        
            case 3:
                super.loadImage('img/5_background/layers/3_third_layer/full.png');
                this.speed = 5;
                break;
        
            default:
                break;
        }
        // this.animate();
    }

    animate() {
        // this.world.character.posX
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.world.character.posX < this.world.level.endX) {
                // X-Koordinate erhöhen
                this.posX -= this.speed;
                this.otherDirection = false;
            };
            if (this.world.keyboard.LEFT && this.world.character.posX > -2700) {
                // X-Koordinate erhöhen (gehen)
                this.posX += this.speed;
                this.otherDirection = true;
                // console.log('character otherDirection : true');
            };
            this.world.cameraX = -(this.posX) + 100;
        }, 75);
    }
}