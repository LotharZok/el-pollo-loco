class World {
    air = [
        new Air(-2880),
        new Air(-1440),

        new Air(0),
        new Air(1440),

        new Air(2880),
        new Air(4320)
    ];
    character = new Character();
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgrounds = level1.backgrounds;
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX;
    statusBarHealth = new StatusBar('health');
    statusBarCoins = new StatusBar('coins');
    statusBarBottles = new StatusBar('bottles');
    statusBarBoss = new StatusBar('boss');
    throwableBottles = [];
    
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.keyboard = keyboard;
        
        this.draw();
        this.setWorld();
        
        this.runScreen();

        // Create 15 Bottles to throw
        for (let i = 0; i < this.level.bottles.length; i++) {
            this.throwableBottles.push(new Bottle(1200));  // 1200 means they are not visible when created because they are beneath the canvas
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // leert das Canvas, so daß bei einer Bewegung die alte Darstellung verschwindet

        this.ctx.translate(this.cameraX, 0);             // Bewegen des Hintergrunds (d.h. in diesem Fall des gesamten Canvas)

        // Hintergrund-Ebenen (Luft, Wolken, Gelände)
        this.addObjArrayToCanvas(this.air);
        this.addObjArrayToCanvas(this.level.clouds);      // Die Wolken bewegen sich unabhängig von der Spielfigur
        this.addObjArrayToCanvas(this.level.backgrounds); // Das Gelände bewegt sich mit der Spielfigur
        this.level.backgrounds.forEach(bg => bg.world = this);
        
        // Sammeln
        this.addObjArrayToCanvas(this.level.coins);
        // this.addObjArrayToCanvas(this.level.bottles);
        for (let i = 0; i < this.level.bottles.length; i++) {
            this.addToCanvas(this.level.bottles[i]);
        }

        // Vordergrund-Ebenen : Charaktere (Pepe, Chicken, etc.)
        this.addObjArrayToCanvas(this.level.enemies);
        this.addObjArrayToCanvas(this.throwableBottles);
        if (!this.character.hasDied) {
            this.addToCanvas(this.character);
        }

        // Status Bars / Non-movable objects
        this.ctx.translate(-this.cameraX, 0);  // Zurückbewegen des Hintergrunds für non-movable objects
        this.addToCanvas(this.statusBarHealth);
        this.addToCanvas(this.statusBarCoins);
        this.addToCanvas(this.statusBarBottles);
        this.addToCanvas(this.statusBarBoss);
        this.ctx.translate(this.cameraX, 0); // Erneutes bewegen des Hintergrunds

        this.ctx.translate(-this.cameraX, 0);              // Bewegen des Hintergrunds (d.h. in diesem Fall des gesamten Canvas)

        // requestAnimationFrame -> wiederholt die aufgerufene Methode so häufig, wie es die Grafikkarte / der Computer zulässt.
        let self = this;  // Seltsamerweise kann this im requestAnimationFrame nicht genutzt werden. Daher die Zuweisung zu self.
        requestAnimationFrame(
            () => self.draw()
        );
    }

    addObjArrayToCanvas(objArray) {
        objArray.forEach(oa => this.addToCanvas(oa));
    }

    addToCanvas(movObj) {
        if (movObj.otherDirection) {
            this.flipImage(movObj);   // Spiegelt die Ausgabe
        }
        if (movObj instanceof Bottle || movObj instanceof Coin) {
            if (!movObj.isCollected) {
                movObj.draw(this.ctx);
            }
        } else {
            movObj.draw(this.ctx);
        }
        // movObj.drawFrame(this.ctx);

        if (movObj.otherDirection) {  // Dreht die Spiegelung wieder um. Grund: Wir wollen ausschließlich das aktuelle Objekt spiegeln.
            this.flipImageBack(movObj);
        }
    }

    flipImage(movObj) {
        this.ctx.save();                     // Speichert das Objekt, d.h. die Eigenschaften werden festgehalten
        this.ctx.translate(movObj.width, 0); // Spiegelverkehrt einfügen
        this.ctx.scale(-1, 1);               // Image leicht verschieben (um die Breite des Elements), damit es an der gleichen Stelle bleibt
        movObj.posX = movObj.posX * -1;      // X-Koordinate invertieren / spiegeln
    }

    flipImageBack(movObj) {
        movObj.posX = movObj.posX * -1;      // X-Koordinate wieder zurückspiegeln
        this.ctx.restore();                  // Gespeicherte Werte (von flipImage) wiederherstellen
    }

    runScreen() {
        setInterval(() => {
            this.checkCollisionPepeEnemy();
            this.checkCollisionPepeBottle();
            this.checkCollisionPepeCoin();
            this.checkCollisionBottleBoss();
        }, 200);
    }

    checkCollisionPepeEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    enemy.hasDied = true;
                    enemy.speed = 0;
                } else if (!enemy.hasDied) {
                    this.character.hit(2);
                    this.statusBarHealth.setPercentage('health', this.character.energy);
                }
            }
        });
    }

    checkCollisionPepeBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (!bottle.isCollected) {
                    this.level.throwableBottles++;
                    let newValue = this.statusBarBottles.percentage += (100/this.level.bottles.length);
                    this.statusBarBottles.setPercentage('bottles', newValue);
                    bottle.isCollected = true;
                }
            }
        });
    }

    checkCollisionPepeCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (!coin.isCollected) {
                    let newValue = this.statusBarCoins.percentage += (100/this.level.coins.length);
                    this.statusBarCoins.setPercentage('coins', newValue);
                    coin.isCollected = true;
                }
            }
        });
    }

    checkCollisionBottleBoss() {
        this.throwableBottles.forEach(bottle => {
            if (bottle.isColliding(enemies[0])) {
                if (!bottle.hasHitBoss) {
                    // console.log('Boss wurde getroffen');
                    bottle.hasHitBoss = true; // One bottle may only once hit the boss
                    enemies[0].hit(10);
                    this.statusBarBoss.setPercentage('boss', enemies[0].energy);
                }
            }
        });
    }
}