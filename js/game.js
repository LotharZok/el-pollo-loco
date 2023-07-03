/**
 * Global Variables
 */
let canvas;
let world;
let keyboard = new Keyboard();
let welcomeSound = new Audio('audio/start-screen-sound.mp3');


/**
 * Starts the welcome audio.
 */
function welcomeToGame() {
    welcomeSound.loop = true;
    welcomeSound.play();
    this.bindBtnPressEvents()
}


/**
 * Hides the welcome screen and starts the init function to start the game.
 */
function hideWelcome() {
    welcomeSound.pause();
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('infoClickMessage').classList.remove('d-none');
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('clickMessage').classList.add('d-none');
    document.getElementById('restartClickMessage').classList.add('d-none');
    init();
}


/**
 * Initialisation of the game. Called when welcome Screen is closed.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Displays the information screen.
 */
function showInformation() {
    document.getElementById('infoScreen').classList.toggle('d-none');
    document.getElementById('infoScreen').classList.toggle('infoScreen');
}


/**
 * Hides the information screen.
 */
function hideInformation() {
    document.getElementById('infoScreen').classList.toggle('d-none');
    document.getElementById('infoScreen').classList.toggle('infoScreen');
}


/**
 * Restarts a game, that is, is reloads the website.
 */
function restartGame() {
    location.reload();
}


/**
 * Registration of an event listener (KEYDOWN) to react on pressing certain keys
 */
window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space':
            keyboard.SPACE = true;
            break;

        case 'KeyW':
        case 'ArrowUp':
        case 'Numpad8':
            keyboard.UP = true;
            break;

        case 'KeyA':
        case 'ArrowLeft':
        case 'Numpad4':
            keyboard.LEFT = true;
            break;

        case 'KeyS':
        case 'ArrowDown':
        case 'Numpad2':
            keyboard.DOWN = true;
            break;

        case 'KeyD':
        case 'ArrowRight':
        case 'Numpad6':
            keyboard.RIGHT = true;
            break;

        case 'KeyE':
        case 'KeyQ':
        case 'Enter':
        case 'NumpadEnter':
            keyboard.THROW = false;
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
            keyboard.THROW = true;
            break;

        case 'Escape':
            keyboard.ESC = true;
        default:
            break;
    }
});


/**
 * Registration of an event listener (touchstart / touchend) to react on touching buttons on a mobile device.
 */
function bindBtnPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.THROW = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.THROW = false;
    });
}