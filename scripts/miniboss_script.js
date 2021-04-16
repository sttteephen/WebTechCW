/* 
 * Javascript for the battle against Moldrom.
 */

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
let enemy_lives = 6;
let enemyx = WIN_WIDTH / 2;
let enemyy = 60;
let velx = 5;
let vely = 5;

let arrows = [];    // list of arrow objects on the screen
let rm_arrows = [];     // list of  arrow objects that have left the screen to be deleted

// set arrows damage and colour depending on what bow the player has
let arrow_dmg = 1;
let arrow_colour = 'silver';
if(localStorage.getItem('item_improved_bow') == '1') {
    arrow_dmg = 2;
    arrow_colour = 'cyan';
}

// set sword damage and colour depending on what sword the player has
let sword_colour = '#EFF1F1';
let sword_dmg = 1;
if(localStorage.getItem('item_master_sword') == '1') {
    sword_colour = '#BEEBFA';
    sword_dmg = 2;
}

let blocking = false; // true if the player is currentley using sword to block

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

// draws the sword on the screen when the player is blocking
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
        // draw protective bubble if player has master sword
        c.beginPath();
        c.arc(linkx, linky-17, 80, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
    }
}

// draws the enemy sprite then updates its position
function drawEnemy() {
    // tail end
    if (enemy_lives > 4)
    {
        c.beginPath();
        c.arc(enemyx, enemyy - 90, 30, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.fillStyle = '#AD2D21';
        c.stroke();
        c.fill();
    }
    // tail
    if (enemy_lives > 3)
    {
        c.beginPath();
        c.arc(enemyx, enemyy - 50, 40, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.fillStyle = '#AD2D21';
        c.stroke();
        c.fill();
    }
    // outer body
    c.beginPath();
    c.arc(enemyx, enemyy, 50, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#AD2D21';
    c.stroke();
    c.fill();
    // inner body
    if (enemy_lives > 1) {
        c.beginPath();
        c.arc(enemyx, enemyy, 40, 0, Math.PI * 2, false);
        c.strokeStyle = '#ED8232';
        c.fillStyle = '#ED8232';
        c.stroke();
        c.fill();
    }
    // inner inner body
    if (enemy_lives > 2)
    {
        c.beginPath();
        c.arc(enemyx, enemyy, 30, 0, Math.PI * 2, false);
        c.strokeStyle = '#AF7138';
        c.fillStyle = '#AF7138';
        c.stroke();
        c.fill();
    }
    // left eye
    c.beginPath();
    c.arc(enemyx + 25, enemyy + 40, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#FCF4B0';
    c.stroke();
    c.fill();
    // right eye
    c.beginPath();
    c.arc(enemyx - 25, enemyy + 40, 15, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = '#FCF4B0';
    c.stroke();
    c.fill();
    // left pupil
    c.beginPath();
    c.arc(enemyx + 25, enemyy + 45, 5, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
    c.stroke();
    c.fill();
    // right pupil
    c.beginPath();
    c.arc(enemyx - 25, enemyy + 45, 5, 0, Math.PI * 2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'black';
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
        // check if the enemy and player coordinates are in close range of each other
        if (linky > enemyy - 50 && linky < enemyy + 50 && linkx > enemyx - 50 && linkx < enemyx + 50) {
            
            // set just collided flag to true, and toggle it back in 2 seconds
            justCollided = true;
            setTimeout(toggleJustCollided, 2000);

            // if the player wasn't blocking they lose lives, else enemy loses lives
            if(blocking === false) {
                loseHeart();
            } else {
                enemyLoseHeart(sword_dmg);
            }
        }
    }
}

// true if the enemy has been hit with the an arrow in the last 2 seconds
let justHit = false;

// called 1 seconds after a hit to toggle value which allows another hit to occur
function toggleJustHit() {
    justHit = false;
}

// check if any of the arrows have hit the enemy
function checkHit() {

    if(justHit === false) // check enemy hasn't just been hit
    {
        // for every arrows check if it is within a given range of enemy coordinates
        for(let i = 0; i < arrows.length; i++) {
            if (arrows[i].y > enemyy - 40 && arrows[i].y < enemyy + 40 && arrows[i].x > enemyx - 40 && arrows[i].x < enemyx + 40) {
                
                enemyLoseHeart(arrow_dmg);
            }
        }
    }
}

// take the given amount of hearts from the enemy
function enemyLoseHeart(dmg) {
    enemy_lives -= dmg;
    checkWin();

    // increase enemy speed after each hit
    if(velx > 0) {
        velx += 5;
    }
    else {
        velx -= 5;
    }

    // change enemy direction after each hit
    temp = velx;
    velx = vely;
    vely = -temp;

    justHit = true;
    setTimeout(toggleJustHit, 1000);
    return;
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
        window.location.href = 'miniboss_win.html'
    }
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

// take a heart from player
function loseHeart() {
    link_lives -= 1;

    // if the player has run out of lives load the loser page
    if(link_lives == 0)
    {
        window.location.href = 'miniboss_lose.html'
    }
}

// animation loop if the player has not collected the lantern
function noLantern() {
    
    // cover the screen in black
    c.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    c.beginPath();
    c.rect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    c.stroke();
    c.fillStyle = 'black';
    c.fill();

    // cut out a circle around link
    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.arc(linkx, linky - 30, 70, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();

    // draw link to the sreen
    c.globalCompositeOperation = 'source-over';
    drawLink();
    drawHearts();
}

// animation loop if the player has collected the lantern
// clears the canvas, draw the next frame and check for arrow hits or collisions
function animate() {
    c.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
    drawLink();
    drawEnemy();
    animateArrows();
    drawHearts();
    if(blocking) {
        drawSword();
    }
    checkHit();
    checkCollision();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// check if the player is pressing down any buttons
function keyDownHandler(e) {

    if(blocking == false) {     // only lets the player move when not blocking with sword
        if(e.keyCode == 66) {   // block with sword when b is pressed
            blocking = true;
        }
        // move in the direction of the pressed arrow key
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
        else if(e.keyCode == 32) {  // fire an arrow when the space bar is hit 
            if(justFired == false) {
                new_arrow = new Arrow(linkx, linky);
                arrows.push(new_arrow);
                
                // allow another arrow to be fired in half a second
                justFired = true;
                setTimeout(toggleJustFired, 500);
            }
        }
    }
}

// check if the player has stoped blocking
function keyUpHandler (e) {
    if(e.keyCode == 66) {
        blocking = false;
    }
}

if(localStorage.getItem('item_lantern') == '0') {
    // if there is no lantern black out the screen and take all lives from player gradually
    setInterval(noLantern, 20);
    setInterval(loseHeart, 1000);
} else {
    // if there is a lantern allow player to play normally
    setInterval(animate, 20);
}