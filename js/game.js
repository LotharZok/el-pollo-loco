/**
 * Global Variables
 */
let canvas;
let world;
let keyboard = new Keyboard();
let welcomeSound = new Audio('audio/start-screen-sound.mp3');


/**
 * Initialisation of the game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function welcomeToGame() {
    welcomeSound.loop = true;
    welcomeSound.play();
}

function hideWelcome() {
    welcomeSound.pause();
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('infoClickMessage').classList.remove('d-none');
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('clickMessage').classList.add('d-none');
    init();
}

function showInformation() {
    document.getElementById('infoScreen').classList.toggle('d-none');
    document.getElementById('infoScreen').classList.toggle('infoScreen');
}

function hideInformation() {
    document.getElementById('infoScreen').classList.toggle('d-none');
    document.getElementById('infoScreen').classList.toggle('infoScreen');
}


/**
 * Registration of an event listener (KEYDOWN) to react on pressing certain keys
 */
window.addEventListener('keydown', (e) => {
    // console.log(e);
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

        case 'KeyE':
        case 'KeyQ':
        case 'Enter':
        case 'NumpadEnter':
            // console.log('werfen');
            keyboard.THROW = false; //true;
            break;

        case 'Escape':
            keyboard.ESC = false;
        default:
            break;
    }
});


/**
 * Registration of an event listener (KEYUP) to react on releasing certain keys
 */
window.addEventListener('keyup', (e) => {

    switch (e.code) {
        case 'Space':
            keyboard.SPACE = false;
            break;

        case 'KeyW':
        case 'ArrowUp':
        case 'Numpad8':
            keyboard.UP = false;
            break;

        case 'KeyA':
        case 'ArrowLeft':
        case 'Numpad4':
            keyboard.LEFT = false;
            break;

        case 'KeyS':
        case 'ArrowDown':
        case 'Numpad2':
            keyboard.DOWN = false;
            break;

        case 'KeyD':
        case 'ArrowRight':
        case 'Numpad6':
            keyboard.RIGHT = false;
            break;

        case 'KeyE':
        case 'KeyQ':
        case 'Enter':
        case 'NumpadEnter':
            keyboard.THROW = true; // false;
            break;

        case 'Escape':
            keyboard.ESC = true;
        default:
            break;
    }
});