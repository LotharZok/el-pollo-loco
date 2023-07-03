/**
 * Global variables that are necessary right at the beginning
 */
let intervalIDsArray = [];
let soundsArray = [];
let muteSounds = false;


/**
 * Mutes all sound, when started. De-mutes all sound on a second click.
 */
function muteAllSounds() {
    console.log('muteAllSounds gestartet');
    if (muteSounds) {
        muteSounds = false;
        soundsArray.forEach(s => {
            if (s.paused) s.play();
        })
    } else {
        muteSounds = true;
        soundsArray.forEach(s => {
            s.pause();
        });
    }
}


/**
 * Stops all intervals, that are registered while playing.
 */
function clearAllIntervals() {
    setTimeout(intervalIDsArray.forEach(i => {
        clearInterval(i);
    }), 2000);
}