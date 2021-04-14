function startedStory() {

    // initialize started story flag
    if(localStorage.getItem('started_story') == null) {
        document.getElementById('continue_story').remove();
    }

    // set audio to muted for first page
    localStorage.setItem('muted', 'true');
    document.getElementById('mute_img').src = 'images/volume_off.svg';

}

window.addEventListener('load', startedStory, true);

function newStory() {
    localStorage.setItem('started_story', 'true');
}

function toggleMute() {

    const audio = document.querySelector("audio")

    if(localStorage.getItem('muted') == 'true') {
        localStorage.setItem('muted', 'false');
        document.getElementById('mute_img').src = 'images/volume_on.svg';

        audio.volume = 0.2;
        audio.play();
    } else {
        localStorage.setItem('muted', 'true');
        document.getElementById('mute_img').src = 'images/volume_off.svg';

        audio.pause();
    }   
}