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
    choice.href = "finalboss/finalboss.html";

    choice_div.appendChild(choice);
    document.getElementById('choices').appendChild(choice_div);
}