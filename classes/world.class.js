class World {
    /**
     * Global variables
     */
    canvas;
    ctx;
    keyboard;
    cameraX;
    level = level1;
    air = [
        new Air(-2880),
        new Air(-1440),

        new Air(0),
        new Air(1440),

        new Air(2880),
        new Air(4320)
    ];
    throwableBottles = [];
    character = new Character();
    collisionsInterval;


    /**
     * Images for end of game
     */
    wonImg = new EndGameImage('./img/9_intro_outro_screens/game_over/game_over_1.png');
    lostImg = new EndGameImage('./img/9_intro_outro_screens/game_over/oh_no_you_lost.png');
    

    /**
     * Status bars
     */
    statusBarHealth = new StatusBar('health');
    statusBarCoins = new StatusBar('coins');
    statusBarBottles = new StatusBar('bottles');
    statusBarBoss = new StatusBar('boss');


    /**
     * Audios
     */
    coinCollectSound = new Audio('audio/coin-collected.mp3');
    bottleCollectSound = new Audio('audio/bottle-cling.mp3');
    backgroundSound = new Audio('audio/game-background.mp3');
    cricketSound = new Audio('audio/cricket.mp3');
    squishSound = new Audio('audio/chicken-squish.mp3');
    

    /**
     * Constructor for this object.
     * 
     * @param {Object} canvas - A canvas object to play on
     * @param {Object} keyboard - A keyboard object that recognizes keystrokes
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        
        this.draw();
        this.setWorld();
        this.setSoundVolumes();
        this.runScreen();
        this.setStartingSounds();
        this.createThrowableBottles();
    }


    /**
     * Starts the background sounds for the game.
     */
    setStartingSounds() {
        this.backgroundSound.volume = 0.15;
        this.backgroundSound.loop = true;
        if (!muteSounds) this.backgroundSound.play();
        soundsArray.push(this.backgroundSound);
        this.cricketSound.loop = true;
        if (!muteSounds) this.cricketSound.play();
        soundsArray.push(this.cricketSound);
    }


    /**
     * Sets the world object for the game.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Sets some sound volumes so they are not too loud.
     */
    setSoundVolumes() {
        this.coinCollectSound.volume = 0.1;
        this.bottleCollectSound.volume = 0.5;
    }


    /**
     * Fills the array of throwable bottles.
     */
    createThrowableBottles() {
        // Create 15 Bottles to throw
        for (let i = 0; i < this.level.bottles.length; i++) {
            this.throwableBottles.push(new Bottle(1200));  // 1200 means they are not visible when created because they are beneath the canvas
        }
    }


    /**
     * Draws the canvas with all its objects. If necessary it calls some sub functions.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Empties the canvas so that the old representation disappears when a movement is made
        this.ctx.translate(this.cameraX, 0); // Movement of the background, that is, here, of the entire canvas.

        this.drawBackgroundLayers();
        this.drawCollectableObjects();
        this.drawForegroundObjects();
        this.drawNonMovableObjects();
        this.drawEndGameImages();

        this.ctx.translate(-this.cameraX, 0); // Move the background back.

        // requestAnimationFrame -> wiederholt die aufgerufene Methode so häufig, wie es die Grafikkarte / der Computer zulässt.
        let self = this;  // Seltsamerweise kann this im requestAnimationFrame nicht genutzt werden. Daher die Zuweisung zu self.
        requestAnimationFrame(() => self.draw());
    }


    /**
     * Adds background objects to the canvas: Air, Clouds, Terrain
     */
    drawBackgroundLayers() {
        this.addObjArrayToCanvas(this.air);
        this.addObjArrayToCanvas(this.level.clouds);      // The clouds move separate from the moving of the character
        this.addObjArrayToCanvas(this.level.backgrounds); // The terrain is moving according to the moving of the character
        this.level.backgrounds.forEach(bg => bg.world = this);
    }


    /**
     * Adds collectable objects to the canvas: Coins and Bottles
     */
    drawCollectableObjects() {
        // Collectable objects
        this.addObjArrayToCanvas(this.level.coins);
        for (let i = 0; i < this.level.bottles.length; i++) {
            this.addToCanvas(this.level.bottles[i]);
        }
    }


    /**
     * Adds foreground objects to the canvas: Pepe, Enemies (chicken), throwable Bottles
     */
    drawForegroundObjects() {
        this.addObjArrayToCanvas(this.level.enemies);
        this.addObjArrayToCanvas(this.throwableBottles);
        if (!this.character.hasDied) {
            this.addToCanvas(this.character);
        }
    }


    /**
     * Adds non-movable objects to the canvas: the Status Bars
     */
    drawNonMovableObjects() {
        this.ctx.translate(-this.cameraX, 0);  // Zurückbewegen des Hintergrunds für non-movable objects
        this.addToCanvas(this.statusBarHealth);
        this.addToCanvas(this.statusBarCoins);
        this.addToCanvas(this.statusBarBottles);
        this.addToCanvas(this.statusBarBoss);
        this.ctx.translate(this.cameraX, 0); // Erneutes bewegen des Hintergrunds
    }


    /**
     * Adds the images for the end game messages to the canvas. They are not visible on the start.
     */
    drawEndGameImages() {
        this.addToCanvas(this.wonImg);
        this.addToCanvas(this.lostImg);
    }


    /**
     * Adds the objects in the passed array to the canvas by calling the according function for each entry.
     * 
     * @param {Array} objArray - An array of objects
     */
    addObjArrayToCanvas(objArray) {
        objArray.forEach(oa => this.addToCanvas(oa));
    }


    /**
     * Adds a passed object to the canvas.
     * 
     * @param {Object} movObj - The object that shall be added to the canvas
     */
    addToCanvas(movObj) {
        if (movObj.otherDirection) 
            this.flipImage(movObj);   // Spiegelt die Ausgabe

        if (movObj instanceof Bottle || movObj instanceof Coin) {
            if (!movObj.isCollected) movObj.draw(this.ctx);
        } else if (movObj instanceof EndGameImage) {
            if (movObj.isVisible) movObj.draw(this.ctx);
        } else {
            movObj.draw(this.ctx);
            // movObj.drawFrame(this.ctx);  // Draws a frame around certain object. Needed for development.
        }

        if (movObj.otherDirection)  // Dreht die Spiegelung wieder um. Grund: Wir wollen ausschließlich das aktuelle Objekt spiegeln.
            this.flipImageBack(movObj);
    }


    /**
     * Flips an image if it moves in the other direction (to the left). Usually only for Pepe.
     * 
     * @param {Object} movObj - The object to flip
     */
    flipImage(movObj) {
        this.ctx.save();                     // Speichert das Objekt, d.h. die Eigenschaften werden festgehalten
        this.ctx.translate(movObj.width, 0); // Spiegelverkehrt einfügen
        this.ctx.scale(-1, 1);               // Image leicht verschieben (um die Breite des Elements), damit es an der gleichen Stelle bleibt
        movObj.posX = movObj.posX * -1;      // X-Koordinate invertieren / spiegeln
    }


    /**
     * Flips an image back to its former state, given in the restore function of the canvas context.
     * 
     * @param {Object} movObj - The Object to flip
     */
    flipImageBack(movObj) {
        movObj.posX = movObj.posX * -1;      // X-Koordinate wieder zurückspiegeln
        this.ctx.restore();                  // Gespeicherte Werte (von flipImage) wiederherstellen
    }


    /**
     * Runs the screen and checks for collisions.
     */
    runScreen() {
        this.collisionsInterval = setInterval(() => {
            this.checkCollisionPepeEnemy();
            this.checkPepeNearsEndboss();
            this.checkCollisionPepeBottle();
            this.checkCollisionPepeCoin();
            this.checkCollisionBottleBoss();
        }, 50);
        intervalIDsArray.push(this.collisionsInterval);
    }


    /**
     * Checks for a collision of Pepe and an enemy.
     * Calls subfunctions if necessary.
     * Information: Check on speedY < 0 means, the character is in the fall after the jump.
     *              This way you can only jump on a chicken, but not against one.
     */
    checkCollisionPepeEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    // Pepe may only jump onto chicken, not the endboss
                    (enemy instanceof Endboss) ? this.collisionEnemyHitsPepe() : this.collisionPepeHitsEnemy(enemy);
                } else if (!enemy.hasDied) {
                    this.collisionEnemyHitsPepe();
                }
            }
        });
    }


    /**
     * Checks if the distance between Pepe and the endboss has fallen below a certain value.
     */
    checkPepeNearsEndboss() {
        if (this.character.isNearing(enemies[0], 700)) {
            enemies[0].tooNearFunctionality();
        }
    }


    /**
     * Called when Pepe jumps onto a chicken. Handles reaction for this situation.
     * 
     * @param {Object} enemy - The current enemy object (a chicken)
     */
    collisionPepeHitsEnemy(enemy) {
        if (!enemy.hasDied) {
            if (!muteSounds) this.squishSound.play();
            enemy.hasDied = true;
            enemy.speed = 0;
        }
    }


    /**
     * Called when an enemy runs into Pepe (or Pepe runs into an enemy). Handles reaction for this situation.
     */
    collisionEnemyHitsPepe() {
        this.character.hit(2);
        this.statusBarHealth.setPercentage('health', this.character.energy);
        if (this.character.hasDied) {  // Check if character is dead
            this.endGame('lost');
        }
    }


    /**
     * Checks for a collision of Pepe and a bottle.
     * Pepe then collects this bottle. Handles reaction for this situation.
     */
    checkCollisionPepeBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (!bottle.isCollected) {
                    this.level.throwableBottles++;
                    if (!muteSounds) this.bottleCollectSound.play();
                    let newValue = this.statusBarBottles.percentage += (100/this.level.bottles.length);
                    this.statusBarBottles.setPercentage('bottles', newValue);
                    bottle.isCollected = true;
                }
            }
        });
    }


    /**
     * Checks for a collision of Pepe and a coin.
     * Pepe then collects this coin. Handles reaction for this situation.
     */
    checkCollisionPepeCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (!coin.isCollected) {
                    if (!muteSounds) this.coinCollectSound.play();
                    let newValue = this.statusBarCoins.percentage += (100/this.level.coins.length);
                    this.statusBarCoins.setPercentage('coins', newValue);
                    coin.isCollected = true;
                }
            }
        });
    }


    /**
     * Checks if a bottle has hit the end boss.
     * Starts reactions if true.
     */
    checkCollisionBottleBoss() {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(enemies[0])) {
                if (!bottle.hasHitBoss) {
                    bottle.hasHitBoss = true; // One bottle may only once hit the boss
                    enemies[0].hit(10);       // Calls the hit-function of the boss
                    this.statusBarBoss.setPercentage('boss', enemies[0].energy);
                    bottle.startSplashAnimation();
                    if (enemies[0].energy <= 0) {  // Check if endboss is dead
                        setTimeout(() => this.endGame('won'), 500);  // half a second of waiting so the animation can run
                        // this.endGame('won');
                    }
                }
            }
        });
    }


    /**
     * Ends the game. Displays a final image dependent on win or loss of Pepe.
     * Stops also movement on X-Axis of all enemies. That way Pepe can't be killed after he has killed the end boss.
     * 
     * @param {String} - 'won' or 'lost', states whether Pepe has won or lost the game
     */
    endGame(wonOrLost) {
        if (wonOrLost == 'won') {
            // console.log('won');
            this.wonImg.posX = this.character.posX - 100;
            this.wonImg.isVisible = true;
        } else {
            // console.log('lost');
            this.lostImg.posX = this.character.posX - 100;
            this.lostImg.isVisible = true;
        }

        document.getElementById('infoMessage').classList.add('d-none');
        document.getElementById('restartMessage').classList.remove('d-none');
        clearAllIntervals();
    }
}