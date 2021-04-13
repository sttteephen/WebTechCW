function hasEnoughMoney() {
    let coins = localStorage.getItem('item_coins');
    let hasBow = localStorage.getItem('item_improved_bow')

    if(coins < 5 || hasBow == '1') {
        document.getElementById('buy_bow').remove();
    }

    if(hasBow == '1') {
        document.getElementById('before_bow').remove();
    } else {
        document.getElementById('after_bow').remove();
    }
}

window.addEventListener('load', hasEnoughMoney, true);