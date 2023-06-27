class StatusBar extends DrawableObject {

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
    
    width = 298;
    height = 79;
    posX = 30;
    percentage = 100;

    constructor(type) {
        super();
        switch (type) {
            case 'health':
                this.loadImage(this.IMAGES_HEALTH[0]);
                this.loadImages(this.IMAGES_HEALTH);
                this.posY = 10;
                this.setPercentage('health', 100);
                break;
            case 'bottles':
                this.loadImage(this.IMAGES_BOTTLES[0]);
                this.loadImages(this.IMAGES_BOTTLES);
                this.posY = 90;
                this.setPercentage('bottles', 0);
                break;
            case 'coins':
                this.loadImage(this.IMAGES_COINS[0]);
                this.loadImages(this.IMAGES_COINS);
                this.posY = 170;
                this.setPercentage('coins', 0);
                break;
            default:
                break;
        }
    }

    setPercentage(type, pc) {
        this.percentage = pc;
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
            default:
                break;
        }
        // let imagePath = this.IMAGES_HEALTH[this.getImageIndex()];
        this.img.src = this.imageCache[imagePath];  // SRC !!! (siehe Ticket)
    }

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