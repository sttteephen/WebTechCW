function talkToOldMan() {

    let hasLantern = localStorage.getItem('item_lantern');
    let hasMasterSword = localStorage.getItem('item_master_sword');
    let hasOldMansMoney = localStorage.getItem('old_mans_money');

    if(hasLantern == '0') {
        document.getElementById('have_lantern').remove();
        document.getElementById('have_master_sword').remove();
    } else if(hasMasterSword == '0' || hasOldMansMoney == 'true') {
        document.getElementById('talk_to_old_man').remove();
        document.getElementById('have_master_sword').remove();
    } else {
        document.getElementById('talk_to_old_man').remove();
        document.getElementById('have_lantern').remove();
    }
}

window.addEventListener('load', talkToOldMan, true)

function orderDrink() {

    let para1 = document.createElement('P');
    para1.appendChild(document.createTextNode("You slap your hand on the bar top forcefully. \"A gallon of your finest mead barkeep!\""));

    let para2 = document.createElement('P');
    para2.appendChild(document.createTextNode("The barkeep looks up from the glass she was polishing and slowly turns to face you. Her eyes scan you up and down. \"Bwahahahahahaa come back in about 10 years then we'll see.\" You back away from the bar embarassed."));

    document.getElementById('dialogue').appendChild(para1);
    document.getElementById('dialogue').appendChild(para2);

    document.getElementById('order_drink').remove();
}

function oldManDrunk() {
    let para1 = document.createElement('P');
    para1.appendChild(document.createTextNode("\"Hey there, how are you doing.\" You say to the old man. He grumbles something under his breath and waves his hand out at you. He doesn\'t seem in a talkative mood."));

    document.getElementById('dialogue').appendChild(para1);
    document.getElementById('have_lantern').remove();
}