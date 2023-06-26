class Character extends MovableObject {
    // Größe ist immer gleich
    width = 305;
    height = 600;
    offset = {
        top: 240,
        left: 50,
        right: 75,
        bottom: 30
    };
    // Startposition ist immer gleich
    posX = 0;
    posY = 210; //210;
    // JSON-Objekte für die Bewegungen
    speed = 15;
    moveWalking = {};
    moveJumping = {};
    moveIdling = {};
    moveSleeping = {};
    moveHurting = {};
    moveDying = {};
    // Wie lange ist Pepe schon im Wartemodus?
    idlingCounter = 0;
    // Ist Pepe gestorben?
    hasDied = false;
    dyingCounter = 0;

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
    ];
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
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;  // mittels world.keyboard kann ich dann auf Tasten reagieren

    walkingSound = new Audio('audio/walking.mp3');
    jumpingSound = new Audio('audio/jump.mp3');
    dyingSound = new Audio('audio/dying-pepe.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');  // starting image: Pepe is standing there

        this.loadImages(this.IMAGES_WALKING);  // Load images : Walking
        this.loadImages(this.IMAGES_JUMPING);  // Load images : Jumping
        this.loadImages(this.IMAGES_IDLING);   // Load images : Waiting / Idling
        this.loadImages(this.IMAGES_SLEEPING); // Load images : Sleeping
        this.loadImages(this.IMAGES_HURTING);  // Load images : Hurting
        this.loadImages(this.IMAGES_DYING);    // Load images : Dying

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
                // Y-Koordinate ändern (springen)
                this.jump();
                this.jumpingSound.play();
            }
            this.world.cameraX = -(this.posX) + 100;  // Bewegung der (Hintergrund)-Welt (Pepes Position bleibt dadurch auf dem Screen die gleiche).
        }, 75);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);  // show jumping animation
                this.idlingCounter = 0;
            } else if (this.isDead()) {
                if (!this.hasDied) {  // show dying animation, but only once
                    this.playAnimation(this.IMAGES_DYING);
                    this.dyingSound.play();
                    this.dyingCounter++;
                    if (this.dyingCounter >= 7) this.hasDied = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURTING); // show hurting animation
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING); // show walking animation
                this.idlingCounter = 0;
            } else {
                this.idlingCounter++;  // show idling or sleeping animation
                this.idlingCounter <= 120 ? this.playAnimation(this.IMAGES_IDLING) : this.playAnimation(this.IMAGES_SLEEPING);
            }

        }, 125)
    }

}