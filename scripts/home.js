function appleGrabbed() {

    if(localStorage.getItem('home_apple') == 'true') {
        document.getElementById('apple_pickup').remove();
        document.getElementById('apple_para').remove();
    }
}

window.addEventListener('load', appleGrabbed, true);
