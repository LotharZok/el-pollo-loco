class Cloud extends MovableObject {
    /**
     * Global variables
     */
    width = 1440;
    height = 405;
    speed = 0.10;


    /**
     * Constructor for this object. Starts the cloud animation at a random position (within certain points).
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');

        this.posX = Math.random() * 1440;
        this.posY = Math.random() * 50;

        this.animate();
    }


    /**
     * Animates this object.
     */
    animate() {
        setInterval( () => {this.posX -= this.speed}, 25);
    }
}