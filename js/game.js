let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {

    switch (e.code) {
        case 'Space':
            // console.log('Leertaste : true');
            keyboard.SPACE = true;
            break;

        case 'KeyW':
        case 'ArrowUp':
        case 'Numpad8':
            // console.log('nach oben');
            keyboard.UP = true;
            break;

        case 'KeyA':
        case 'ArrowLeft':
        case 'Numpad4':
            // console.log('nach links');
            keyboard.LEFT = true;
            break;

        case 'KeyS':
        case 'ArrowDown':
        case 'Numpad2':
            // console.log('nach unten');
            keyboard.DOWN = true;
            break;

        case 'KeyD':
        case 'ArrowRight':
        case 'Numpad6':
            // console.log('nach rechts');
            keyboard.RIGHT = true;
            break;

        default:
            break;
    }
});

window.addEventListener('keyup', (e) => {

    switch (e.code) {
        case 'Space':
            // console.log('Leertaste : false');
            keyboard.SPACE = false;
            break;

        case 'KeyW':
        case 'ArrowUp':
        case 'Numpad8':
            // console.log('nach oben');
            keyboard.UP = false;
            break;

        case 'KeyA':
        case 'ArrowLeft':
        case 'Numpad4':
            // console.log('nach links - ENDE');
            keyboard.LEFT = false;
            break;

        case 'KeyS':
        case 'ArrowDown':
        case 'Numpad2':
            // console.log('nach unten');
            keyboard.DOWN = false;
            break;

        case 'KeyD':
        case 'ArrowRight':
        case 'Numpad6':
            // console.log('nach rechts');
            keyboard.RIGHT = false;
            break;

        default:
            break;
    }
});