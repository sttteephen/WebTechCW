function startedStory() {

    if(localStorage.getItem('started_story') == null) {
        document.getElementById('continue_story').remove();
    }
}

window.addEventListener('load', startedStory, true);

function newStory() {
    localStorage.setItem('started_story', 'true');
}