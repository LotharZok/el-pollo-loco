class Character extends MovableObject {
    // Größe ist immer gleich
    width = 305;
    height = 600;
    // Startposition ist immer gleich
    posX = 0;
    posY = 210; //210;
    // JSON-Objekte für die Bewegungen
    speed = 15;
    moveWalking = {};
    moveJumping = {};
    moveIdling = {};
    moveSleeping = {};
    // Wie lange ist Pepe schon im Wartemodus?
    idlingCounter = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;  // mittels world.keyboard kann ich dann auf Tasten reagieren

    walkingSound = new Audio('audio/walking.mp3');
    jumpingSound = new Audio('audio/jump.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');

        // Bilder laden : Gehen
        this.loadImages(this.IMAGES_WALKING);
        this.moveWalking = this.imageCache;
        // Bilder laden : Springen
        this.loadImages(this.IMAGES_JUMPING);
        this.moveJumping = this.imageCache;
        // Bilder laden : Warten / Stehen
        this.loadImages(this.IMAGES_IDLING);
        this.moveIdling = this.imageCache;
        // Bilder laden : Schlafen
        this.loadImages(this.IMAGES_SLEEPING);
        this.moveSleeping = this.imageCache;
this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.RIGHT && this.posX < this.world.level.endX) {
                // X-Koordinate erhöhen (gehen)
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround())
                    this.walkingSound.play();
            };
            if (this.world.keyboard.LEFT && this.posX > -2700) {
                // X-Koordinate verringern (gehen)
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround())
                    this.walkingSound.play();
            };
            // console.log('speedY: ' + this.speedY);
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                // Y-Koordinate änddern (springen)
                this.jump();
                this.jumpingSound.play();
            }
            this.world.cameraX = -(this.posX) + 100;  // Bewegung der (Hintergrund)-Welt (Pepes Position bleibt dadurch auf dem Screen die gleiche).
        }, 75);

        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.idlingCounter = 0;
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Lauf-Animation
                    this.playAnimation(this.IMAGES_WALKING);
                    this.idlingCounter = 0;
                } else {
                    // console.log(this.idlingCounter);
                    this.idlingCounter++;
                    this.idlingCounter <= 120 ? 
                        this.playAnimation(this.IMAGES_IDLING) : 
                        this.playAnimation(this.IMAGES_SLEEPING);
                }
            }
        }, 125)
        
    }

}