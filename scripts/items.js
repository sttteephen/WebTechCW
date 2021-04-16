
// sets the started story flag when the player starts a new game
function newStory() {
    localStorage.setItem('started_story', 'true');
}

// plays or pauses background music when the user clicks the mute button
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

// when the page loads set the music to muted and load muted image
function loadMuteImg() {

    if(localStorage.getItem('muted') == 'false') {
        localStorage.setItem('muted', 'true')
    }

    document.getElementById('mute_img').src = 'images/volume_off.svg';
}

// initializes the story items when the player starts a new game
function init_items() {
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

    loadMuteImg();
}

// loads the players items 
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

    loadMuteImg();
}

// called when the player picks up the apple in their home 
function add_home_apple() {
    let apple_count = parseInt(localStorage.getItem('item_apples'))
    apple_count += 1;
    localStorage.setItem('item_apples', apple_count.toString());
    localStorage.setItem('home_apple', 'true');
}

// called when the player takes the lantern from the old man
function take_lantern() {
    localStorage.setItem('item_lantern', '1');
}

// called when the player takes the coins from the old man
function take_coins() {
    let coins = parseInt(localStorage.getItem('item_coins'));
    coins += 10;
    localStorage.setItem('item_coins', coins.toString());
    localStorage.setItem('old_mans_money', 'true');
}

// adds some dialouge to the screen when the player talks to the old man
function oldManDrunk() {
    let para1 = document.createElement('P');
    para1.appendChild(document.createTextNode("\"Hey there, how are you doing.\" You say to the old man. He grumbles something under his breath and waves his hand out at you. He doesn\'t seem in a talkative mood."));

    document.getElementById('dialogue').appendChild(para1);
    document.getElementById('have_lantern').remove();
}

// adds some dialouge to the screen when the player orders a drink
function orderDrink() {

    let para1 = document.createElement('P');
    para1.appendChild(document.createTextNode("You slap your hand on the bar top forcefully. \"A gallon of your finest mead barkeep!\""));

    let para2 = document.createElement('P');
    para2.appendChild(document.createTextNode("The barkeep looks up from the glass she was polishing and slowly turns to face you. Her eyes scan you up and down. \"Bwahahahahahaa come back in about 10 years then we'll see.\" You back away from the bar embarassed."));

    document.getElementById('dialogue').appendChild(para1);
    document.getElementById('dialogue').appendChild(para2);

    document.getElementById('order_drink').remove();
}

// called when the player throws coins in the fountain
function gainFairyHearts() {
    let hearts = parseInt(localStorage.getItem('item_lives'));
    hearts += 3;
    localStorage.setItem('item_lives', hearts.toString());
    localStorage.setItem('fairy', 'true');
}

// takes 2 coins from player when they get their fortune told or throw coins into fountain
function payCoins() {
    let coins = parseInt(localStorage.getItem('item_coins'));
    coins -= 2;
    localStorage.setItem('item_coins', coins.toString());
}

// called when the player asks for their fortune
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

// give player the imporved bow and takes 5 coins when the player upgrades the bow
function buyBow() {
    localStorage.setItem('item_improved_bow', '1');

    let coins = parseInt(localStorage.getItem('item_coins'));
    coins -= 5;
    localStorage.setItem('item_coins', coins.toString());
}

// adds some dialouge to the page when the player enters the castle
function enterCastle() {
    let para1 = document.createElement('P');

    para1.appendChild(document.createTextNode("You creak open the large wooden doors and enter the castle. You stand in a large open room with lit braziers lining the walls casting long shadow across the floor. In the center of the room stands a figure wearing a green robe that covers their face. Infront of them on a red cerimonal table lies an unconcious girl. Without second thought you know this is Princess Zelda."));

    document.getElementById('dialogue').appendChild(para1);

    let hasMasterSword = localStorage.getItem('item_master_sword');

    let para2 = document.createElement('P');
    if(hasMasterSword === '0') {

        para2.appendChild(document.createTextNode("\"Mwahahaha, is this some joke. The chosen one is a child and a woefully unprepared one at that. Well never the less, lets get this over with shall we.\""));
    } else {

        para2.appendChild(document.createTextNode("\"Ah, chosen one we meet at last. I see you've come prepared to stop me, but I have waited a long time for this and even you will not stand in my way.\""));
    }

    document.getElementById('dialogue').appendChild(para2);

    document.getElementById('enter_castle').remove();
    document.getElementById('head_back').remove();

    let choice_div = document.createElement('div');
    let choice = document.createElement('a');

    choice.appendChild(document.createTextNode('START BATTLE'));
    choice.href = "finalboss.html";

    choice_div.appendChild(choice);
    document.getElementById('choices').appendChild(choice_div);
}
