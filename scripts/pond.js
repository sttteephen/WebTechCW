function coinsTossed() {
 if(localStorage.getItem('item_coins') == '0') {
        document.getElementById('first_coin_toss').remove();
        document.getElementById('second_coin_toss').remove();

        let para1 = document.createElement('P');

        para1.appendChild(document.createTextNode("You think about throwing some coins in the pool in hope it would give you some luck. If only you had some coins."));
    
        document.getElementById('dialogue').appendChild(para1);
    
    } else if(localStorage.getItem('fairy') == 'false') {
        document.getElementById('second_coin_toss').remove();
    } else {
        document.getElementById('first_coin_toss').remove();
    }
}

window.addEventListener('load', coinsTossed, true);

function tossCoins() {

    let coins = parseInt(localStorage.getItem('item_coins'));
    coins -= 2;
    localStorage.setItem('item_coins', coins.toString());
}