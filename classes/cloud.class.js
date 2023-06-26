class Cloud extends MovableObject {
    width = 1440;
    height = 405;
    speed = 0.10;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');

        this.posX = Math.random() * 1440;
        this.posY = Math.random() * 50;

        this.animate();
    }

    animate() {
        setInterval( () => {this.posX -= this.speed}, 25);
        // 0,25 px Abzug pro 25 Millisekunden
        // this.moveLeft();
    }
}