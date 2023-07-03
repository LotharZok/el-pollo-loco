class StatusBar extends DrawableObject {

    /**
     * Image arrays for specified movements (status) of the status bars
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    IMAGES_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ]
    

    /** 
     * Global Variables
     */
    width = 298;
    height = 79;
    posX = 30;
    percentage = 100;


    /**
     * Creates a status bar object of the specified type. Sets its vertical position and loads necessary images.
     * Sets also the initial value for the stats bar percentag.
     * 
     * @param {String} type - The type of the status bar that should be created.
     */
    constructor(type) {
        super();
        switch (type) {
            case 'health':
                this.loadHealthSBImages();
                break;
            case 'bottles':
                this.loadBottleSBImages();
                break;
            case 'coins':
                this.loadCoinSBImages();
                break;
            case 'boss':
                this.loadBossSBImages();
            default:
                break;
        }
    }


    /**
     * Loads the images for the health status bar.
     * Sets also the vertical position of this status bar and the start percentage.
     */
    loadHealthSBImages() {
        this.loadImage(this.IMAGES_HEALTH[0]);
        this.loadImages(this.IMAGES_HEALTH);
        this.posY = 10;
        this.setPercentage('health', 100);
    }


    /**
     * Loads the images for the bottle status bar.
     * Sets also the vertical position of this status bar and the start percentage.
     */
    loadBottleSBImages() {
        this.loadImage(this.IMAGES_BOTTLES[0]);
        this.loadImages(this.IMAGES_BOTTLES);
        this.posY = 90;
        this.setPercentage('bottles', 0);
    }


    /**
     * Loads the images for the coin status bar.
     * Sets also the vertical position of this status bar and the start percentage.
     */
    loadCoinSBImages() {
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.posY = 170;
        this.setPercentage('coins', 0);
    }


    /**
     * Loads the images for the boss status bar.
     * Sets also the vertical position of this status bar and the start percentage.
     * Additionally sets the horizontal position as this status bar is on the right side of the canvas.
     */
    loadBossSBImages() {
        this.loadImage(this.IMAGES_BOSS[0]);
        this.loadImages(this.IMAGES_BOSS);
        this.posY = 10;
        this.posX = 1100;
        this.setPercentage('boss', 100);
    }

    /**
     * Sets the percentage of the current object to the passed value and calls the function for setting the matching image.
     * 
     * @param {String} type - The type of the status bar
     * @param {Integer} pc - The new percentage value for the current object
     */
    setPercentage(type, pc) {
        this.percentage = pc;
        this.setImagePath(type);
    }


    /**
     * Sets the matching image to the percentage of the current object.
     * 
     * @param {String} type - The type of the status bar
     */
    setImagePath(type) {
        let imagePath;
        switch (type) {
            case 'health':
                imagePath = this.IMAGES_HEALTH[this.getImageIndex()];
                break;
            case 'coins':
                imagePath = this.IMAGES_COINS[this.getImageIndex()];
                break;
            case 'bottles':
                imagePath = this.IMAGES_BOTTLES[this.getImageIndex()];
                break;
            case 'boss':
                imagePath = this.IMAGES_BOSS[this.getImageIndex()];
                break;
        }
        this.img.src = this.imageCache[imagePath];
    }


    /**
     * Gives the index of the matching image inside the status bar image array of the current object.
     * 
     * @returns The index of the matching image inside the image array
     */
    getImageIndex() {
        if (this.percentage >= 90) {
            return 5;
        } else if (this.percentage >= 70) {
            return 4;
        } else if (this.percentage >= 50) {
            return 3;
        } else if (this.percentage >= 30) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}