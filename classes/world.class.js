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

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.keyboard = keyboard;

        this.draw();
        this.setWorld();

        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // leert das Canvas, so daß bei einer Bewegung die alte Darstellung verschwindet

        this.ctx.translate(this.cameraX, 0);             // Bewegen des Hintergrunds (d.h. in diesem Fall des gesamten Canvas)

        // Hintergrund-Ebenen (Luft, Wolken, Gelände)
        // this.addToCanvas(this.air);                 // Der Air-Hintergrund ist unbeweglich
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

        // Vordergrund-Ebenen : Charaktere (Pepe, Chicken)
        this.addToCanvas(this.character);
        this.addObjArrayToCanvas(this.level.enemies);

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
        movObj.draw(this.ctx);
        movObj.drawFrame(this.ctx);

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

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    // console.log('Collison with Character', enemy);
                    this.character.hit();
                    console.log('Energy: ', this.character.energy)
                }
            });
        }, 200);
    }
}