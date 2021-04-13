const WIN_WIDTH = 1000;
const WIN_HEIGHT = 750;

// access the canvas and set width and height
var canvas = document.getElementById("can");
canvas.width = 1000;
canvas.height = 750;
var c = canvas.getContext('2d');

// load the heart image
let heart_img = new Image();
heart_img.onload = function() {
    c.drawImage(heart_img,0,0);
}
heart_img.src = "../images/heart.png";

// players lives, coordinates and velocity 
let link_lives = localStorage.getItem('item_lives');
let linkx = WIN_WIDTH / 2;
let linky = WIN_HEIGHT - 50;
let linkv = 50;

// emenies lives, coordinates and velocity
let enemy_lives = 10;
let enemyx = WIN_WIDTH / 2;
let enemyy = 60;
let velx = 2;
let vely = 2;

let arrows = [];    // list of arrow objects on the screen
let rm_arrows = [];     // list of  arrow objects that have left the screen to be deleted

let arrow_dmg = 1;
let arrow_colour = 'silver';

let magicv = 8;

if(localStorage.getItem('item_improved_bow') == '1') {
    arrow_dmg = 2;
    arrow_colour = 'cyan';
}

let sword_colour = '#EFF1F1';
let sword_dmg = 1;
if(localStorage.getItem('item_master_sword') == '1') {
    sword_colour = '#BEEBFA';
    sword_dmg = 2;
}

// creates a new arrow object
function Arrow(x, y) {
    this.x = x;
    this.y = y;
}

// animates all the arrows on the screen 
function animateArrows() {

    // loops over all the arrows in the list
    for(let i = 0; i < arrows.length; i++)
    {
        rm_arrows = [];
        drawArrow(arrows[i].x, arrows[i].y)

        arrows[i].y -= 10;   // move the arrow up the screen

        // add the index of arrows that are off screen to the removal list
        if (arrows[i].y < 0)
        {
            rm_arrows.push(i);
        }
    }

    // reverse the removel list so arrows at the end of the list are removed first
    rm_arrows.reverse();
    for(let j = 0; j < rm_arrows.length; j++)
    {
        arrows.splice(rm_arrows[j], 1);
    }

}

// draws an arrow at the given coordinates
function drawArrow(x, y) {
    // main body 
    c.beginPath();
    c.rect(x, y, 2, 30);
    c.stroke();
    c.fillStyle = 'brown';
    c.fill();
    // arrow head
    c.beginPath();
    c.moveTo(x + 1, y - 10);
    c.lineTo(x - 3, y);
    c.lineTo(x + 5, y);
    c.lineTo(x + 1, y - 10);
    c.fillStyle = arrow_colour;
    c.fill();
    c.stroke();
}

// draws players sprite on the canvas
function drawLink() {
    // left foot
    c.beginPath();
    c.arc(linkx - 25, linky + 30, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#87422E';
    c.stroke();
    c.fill();
    // right foot
    c.beginPath();
    c.arc(linkx + 25, linky + 30, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#87422E';
    c.stroke();
    c.fill();
    // body
    c.beginPath();
    c.arc(linkx, linky, 40, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#226D2C';
    c.stroke();
    c.fill();
    // hat
    c.beginPath();
    c.arc(linkx, linky - 70, 25, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'green';
    c.stroke();
    c.fill();
    // hat rim
    c.beginPath();
    c.arc(linkx, linky - 56, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'yellow';
    c.stroke();
    c.fill();
    // head
    c.beginPath();
    c.arc(linkx, linky - 50, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#F5C78C';
    c.stroke();
    c.fill();
    // left eye
    c.beginPath();
    c.arc(linkx - 10, linky - 55, 6, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'white';
    c.stroke();
    c.fill();
    // left pupil
    c.beginPath();
    c.arc(linkx - 9, linky - 54, 3, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'blue';
    c.stroke();
    c.fill();
    // right eye
    c.beginPath();
    c.arc(linkx + 10, linky - 55, 6, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'white';
    c.stroke();
    c.fill();
    // right pupil
    c.beginPath();
    c.arc(linkx + 9, linky - 54, 3, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'blue';
    c.stroke();
    c.fill();
    // right hand
    c.beginPath();
    c.arc(linkx + 40, linky - 5, 15, 0, Math.PI * 2, false)
    c.strokeStyle = 'black';
    c.fillStyle = '#F5C78C';
    c.stroke();
    c.fill();
    // left hand
    c.beginPath();
    c.arc(linkx - 40, linky - 5, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#F5C78C';
    c.stroke();
    c.fill();
}

// draws the enemy sprite then updates its position
function drawEnemy() {

    // left foot
    c.beginPath();
    c.arc(enemyx - 25, enemyy + 30, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#DEAD57';
    c.stroke();
    c.fill();
    // right foot
    c.beginPath();
    c.arc(enemyx + 25, enemyy + 30, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#DEAD57';
    c.stroke();
    c.fill();
    // body
    c.beginPath();
    c.arc(enemyx, enemyy, 40, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#D559AC';
    c.stroke();
    c.fill();
    // body
    c.beginPath();
    c.arc(enemyx, enemyy, 37, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#A0D572';
    c.stroke();
    c.fill();
    // hat
    c.beginPath();
    c.arc(enemyx, enemyy - 63, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#D559AC';
    c.stroke();
    c.fill();
    // hat rim
    c.beginPath();
    c.arc(enemyx, enemyy - 60, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'yellow';
    c.stroke();
    c.fill();
    // head
    c.beginPath();
    c.arc(enemyx, enemyy - 50, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#A0D572';
    c.stroke();
    c.fill();
    // crown jewel
    c.beginPath();
    c.moveTo(enemyx + 1, enemyy - 93);
    c.lineTo(enemyx - 3, enemyy - 78);
    c.lineTo(enemyx + 5, enemyy - 78);
    c.lineTo(enemyx + 1, enemyy - 93);
    c.fillStyle = 'red';
    c.fill();
    c.stroke();
    // left eye
    c.beginPath();
    c.arc(enemyx - 10, enemyy - 55, 6, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.stroke();
    c.fill();
    // left pupil
    c.beginPath();
    c.arc(enemyx - 9, enemyy - 54, 3, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'white';
    c.stroke();
    c.fill();
    // right eye
    c.beginPath();
    c.arc(enemyx + 10, enemyy - 55, 6, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.stroke();
    c.fill();
    // right pupil
    c.beginPath();
    c.arc(enemyx + 9, enemyy - 54, 3, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'white';
    c.stroke();
    c.fill();
    // right hand
    c.beginPath();
    c.arc(enemyx + 40, enemyy - 5, 15, 0, Math.PI * 2, false)
    c.strokeStyle = 'black';
    c.fillStyle = '#DEAD57';
    c.stroke();
    c.fill();
    // left hand
    c.beginPath();
    c.arc(enemyx - 40, enemyy - 5, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#DEAD57';
    c.stroke();
    c.fill();




    enemyx += velx;
    enemyy += vely;
    // if the enemy has reached the edge of the screen change direction
    if (enemyx+50 > WIN_WIDTH ||  enemyx-50 < 0) {
        velx = -velx;
    }
    if (enemyy+50 > WIN_HEIGHT ||  enemyy-50 < 0) {
        vely = -vely;
    }
}

// true if the player has collided with the enemey in the last 2 seconds
let justCollided = false;

// called 2 seconds after a collison to toggle value which allows another collision to occur
function toggleJustCollided() {
    justCollided = false;
}

// checks if the player is colliding with the enemy sprite
function checkCollision() {
    if (justCollided === false) // checks there hasnt just been a collision
    {
        // check the players coordinates are within a range around the enemy coordinate
        if (linky > enemyy - 50 && linky < enemyy + 50 && linkx > enemyx - 50 && linkx < enemyx + 50) {
            
            if(blocking === false) {
                loseHeart();
            } else {
                enemyLoseHeart(sword_dmg);
            }

            justCollided = true;
            // toggle justCollided in  2 seconds to allow another collision
            setTimeout(toggleJustCollided, 2000);
        }
    }
}

// true if the enemy has been hit with the an arrow in the last 2 seconds
let justHit = false;

// called 2 seconds after a hit to toggle value which allows another hit to occur
function toggleJustHit() {
    justHit = false;
}

// check if any of the arrows have hit the enemy
function checkHit() {
    if(justHit === false) {
        // for every arrows check if it is within a given distance of the enemy
        for(let i = 0; i < arrows.length; i++) {
            if (arrows[i].y > enemyy - 40 && arrows[i].y < enemyy + 40 && arrows[i].x > enemyx - 40 && arrows[i].x < enemyx + 40) {
                
                enemyLoseHeart(arrow_dmg);

                justHit = true;
                setTimeout(toggleJustHit, 2000);
            }
        }
    }
}

// true if an arrow has just been fired
let justFired = false;

// called 0.5 seconds after an arrow has been fired to allow another to be fired
function toggleJustFired() {
    justFired = false;
}

// checks if the enemy has run out of lives
function checkWin() {
    if(enemy_lives <= 0) {
        // give player the master sword and load the winners page
        localStorage.setItem('item_master_sword', '1');
        window.location.href = 'win.html'
    }
}

// take the given amount of hearts from the enemy
function enemyLoseHeart(dmg) {
    enemy_lives -= dmg;
    checkWin();

    // increase enemy speed after each hit
    if(velx > 0) {
        velx += 3;
    }
    else {
        velx -= 3;
    }

    // increase the speed of the enemys magic orbs
    magicv += 2;

    // change enemy direction after each hit
    temp = velx;
    velx = vely;
    vely = -temp;

    return;
}

// draws the hearts image on the screen
function drawHearts() {
    let x = 0;
    let y = 0;
    for(let i = 0; i < link_lives; i++) {
        c.drawImage(heart_img, x, y, 60, 60);
        x += 60;
    }
}

function loseHeart() {
    link_lives -= 1;
    console.log(link_lives);

    // if the player has run out of lives load the loser page
    if(link_lives == 0)
    {
        window.location.href = 'lose.html'
    }
}

function drawSword() {
    // sword hilt
    c.beginPath();
    c.rect(linkx+40, linky-30, 4, 10);
    c.stroke();
    c.fillStyle = 'brown';
    c.fill();
    // sword 
    c.beginPath();
    c.moveTo(linkx+38, linky-30);
    c.lineTo(linkx+38, linky-90);
    c.lineTo(linkx+42, linky-100);
    c.lineTo(linkx+46, linky-90);
    c.lineTo(linkx+46, linky-30);
    c.fillStyle = sword_colour;
    c.fill();
    c.stroke();
    if(localStorage.getItem('item_master_sword') == '1') {
        // protective bubble
        c.beginPath();
        c.arc(linkx, linky-17, 80, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
    }
}

let blocking = false;
let magic = [];

// creates a new arrow object
function Magic() {
    this.x = enemyx;
    this.y = enemyy;
}

function fireMagic() {
    new_magic = new Magic();
    magic.push(new_magic);
}

function animateMagic() {
    // loops over all the arrows in the list
    for(let i = 0; i < magic.length; i++)
    {
        let x = magic[i].x;
        let y = magic[i].y;

        drawMagic(x, y);

        (x < linkx) ? magic[i].x += magicv : magic[i].x -= magicv;
        (y < linky) ? magic[i].y += magicv : magic[i].y -= magicv;

        if(linky > y - 70 && linky < y + 70 && linkx > x - 70 && linkx < x + 70) {
            magic.pop();

            if(blocking == false || localStorage.getItem('item_master_sword') == '0') {
                for(let i = 0; i < 3; i++) {
                    loseHeart();
                }
            }
        }
    }
}

function drawMagic(x, y) {
    // magic orb
    c.beginPath();
    c.arc(x, y, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#BCE4D7';
    c.stroke();
    c.fill();
}

// clears the canvas, draw the next frame and check for collisions
function animate() {
    c.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    drawLink();
    drawEnemy();
    animateArrows();
    drawHearts();
    animateMagic();
    drawMagic();
    if(blocking) {
        drawSword();
    }
    checkHit();
    checkCollision();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// check if the player is pressing an arrow key and adjust position on canvas
function keyDownHandler(e) {
    if(blocking == false) {
        if(e.keyCode == 66) {
            blocking = true;
        }
        else if(e.key == 'Right' || e.key == 'ArrowRight') {
            if(linkx + 75 < WIN_WIDTH) {
                linkx += linkv;
            }

        } 
        else if(e.key == 'Left' || e.key == 'ArrowLeft') {
            if(linkx > 75) {
                linkx -= linkv;
            }
        }
        else if(e.key == 'Up' || e.key == 'ArrowUp') {
            if(linky > 75) {
                linky -= linkv;
            }
        }
        else if(e.key == 'Down' || e.key == 'ArrowDown') {
            if(linky + 75 < WIN_HEIGHT) {
                linky += linkv;
            }
        }
        // fire a arrow when the space bar is hit 
        else if(e.keyCode == 32) {
            if(justFired == false) {
                new_arrow = new Arrow(linkx, linky);
                arrows.push(new_arrow);
                
                justFired = true;
                setTimeout(toggleJustFired, 500);
            }
        }
    }
}

function keyUpHandler (e) {
    if(e.keyCode == 66) {
        blocking = false;
    }
}

setInterval(animate, 20);
setInterval(fireMagic, 4000);