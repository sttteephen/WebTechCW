
function init_items() {
    console.log('hey');
    localStorage.setItem('item_lives', '3');
    localStorage.setItem('item_coins', '2');
    localStorage.setItem('item_apples', '0');
    localStorage.setItem('item_normal_sword', '1');
    localStorage.setItem('item_bow', '1');
    localStorage.setItem('item_improved_bow', '0');
    localStorage.setItem('item_master_sword', '0');
    localStorage.setItem('item_lantern', '0');
    localStorage.setItem('home_apple', 'false');
    localStorage.setItem('old_mans_money', 'false');
    localStorage.setItem('fairy', 'false');
}

function load_items() {

    for(let i = 0; i < localStorage.length; i++) {

        if(localStorage.key(i).substr(0, 5) === 'item_') {

            let item = localStorage.key(i);

            let count = localStorage.getItem(item);
            let item_div = document.getElementById(item);

            if(count === '0') {
                item_div.remove();
                continue;
            }

            let text = document.createTextNode(`x${count}`);
            item_div.appendChild(text);
        }
    }

    if(localStorage.getItem('item_master_sword') === '1') {
        document.getElementById('item_normal_sword').remove();
    }

    if(localStorage.getItem('item_improved_bow') === '1') {
        document.getElementById('item_bow').remove();
    }
}

function add_home_apple() {
    let apple_count = parseInt(localStorage.getItem('item_apples'))
    apple_count += 1;
    localStorage.setItem('item_apples', apple_count.toString());
    localStorage.setItem('home_apple', 'true');
}

function take_lantern() {
    localStorage.setItem('item_lantern', '1');
}

function take_coins() {
    let coins = parseInt(localStorage.getItem('item_coins'));
    coins += 10;
    localStorage.setItem('item_coins', coins.toString());
    localStorage.setItem('old_mans_money', 'true');
}

function gainFairyHearts() {
    let hearts = parseInt(localStorage.getItem('item_lives'));
    hearts += 3;
    localStorage.setItem('item_lives', hearts.toString());
    localStorage.setItem('fairy', 'true');
}

function tellFortune() {

    let para1 = document.createElement('P');

    let coins = parseInt(localStorage.getItem('item_coins'));

    if(coins < 2) {
        para1.appendChild(document.createTextNode("\"Hmmmm I foresee that you will be not be able to pay for my services. Leave now before I put a curse on you!\""));
    } else if(localStorage.getItem('item_master_sword') == '0'){
        para1.appendChild(document.createTextNode("\"Abracadabra alakazam! I foresee that that a true hero will free the master sword from the monster in the darkness of the swamp ruins. Don't forget to leave a tip on your way out.\""));
        payCoins();
    } else {
        para1.appendChild(document.createTextNode("\"Hocus pocus! A great battle in the castle hall will decide the fate of the kingdom. Don't forget to leave a tip on your way out.\""));
        payCoins();
    }

    document.getElementById('dialogue').appendChild(para1);
    document.getElementById('tell_fortune').remove();
}

function payCoins() {
    let coins = parseInt(localStorage.getItem('item_coins'));
    coins -= 2;
    localStorage.setItem('item_coins', coins.toString());
}

function buyBow() {
    localStorage.setItem('item_improved_bow', '1');

    let coins = parseInt(localStorage.getItem('item_coins'));
    coins -= 5;
    localStorage.setItem('item_coins', coins.toString());
}