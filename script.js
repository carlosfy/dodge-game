const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const scoreElement = document.getElementById('score')
const restartButton = document.getElementById('restart')

let score = 0;
let inGame = true;
const acceleration = 0.002;

restartButton.style.display = 'none';



const myCircle = {
    x: 200,
    y: 200,
    size: 30,
    dx: 10,
    dy: 8,
    xdir: 1,
    ydir: 1
}

const image = document.getElementById('source');

const player = {
    w: 50,
    h: 70,
    x: 20,
    y: 400,
    speed: 5,
    dx: 0,
    dy: 0
};

const drawCircle = (circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'coral';
    ctx.fill()
}




const drawPlayer = () => {
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

const newPos = () => {
    player.x += player.dx;
    player.y += player.dy;
    detectWalls()
}

const detectWalls = () => {
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    }
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + player.h > canvas.width) {
        player.y = canvas.width - player.h;
    }
}




const keyDown = (e) => {
    switch (e.key) {
        case 'ArrowRight':
        case 'Right':
            moveRight();
            break;
        case 'ArrowLeft':
        case 'Left':
            moveLeft();
            break;
        case 'ArrowUp':
        case 'Up':
            moveUp();
            break;
        case 'ArrowDown':
        case 'Down':
            moveDown();
            break;
    }
}

function keyUp(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'Left' || e.key == 'ArrowLeft') {
        player.dx = 0;
    }
    if (
        e.key == 'Up' ||
        e.key == 'ArrowUp' ||
        e.key == 'Down' ||
        e.key == 'ArrowDown'
    ) {
        player.dy = 0;
    }
}

const moveUp = () => {
    player.dy = -player.speed
}

const moveDown = () => {
    player.dy = player.speed
}

const moveLeft = () => {
    player.dx = -player.speed
}

const moveRight = () => {
    player.dx = player.speed
}

const hitBox = (ox, oy, r) => {
    if (ox > player.x - r / 2 && ox < player.x + player.w + r / 2) {
        if (oy > player.y - r / 2 && oy < player.y + player.h + r / 2) {
            return false
        }
    }
    return true
}

const restart = () => {
    if (!inGame) {

        myCircle.x = 200;
        myCircle.y = 200;
        myCircle.dx = 10;
        myCircle.dy = 8;
        xdir = 1;
        ydir = 1;

        player.x = 20;
        player.y = 400;
        update();
        inGame = true;
        score = 0;
        restartButton.style.display = 'none';
    }
}


const update = () => {
    clear();

    drawPlayer();
    drawCircle(myCircle);
    // drawPlayer();

    // Change position circle
    myCircle.x += myCircle.dx * myCircle.xdir;
    myCircle.y += myCircle.dy * myCircle.ydir;

    if (myCircle.x + myCircle.size > canvas.width || myCircle.x - myCircle.size < 0) {
        myCircle.xdir *= -1;
    }

    if (myCircle.y + myCircle.size > canvas.height || myCircle.y - myCircle.size < 0) {
        myCircle.ydir *= -1;
    }

    //Change position player
    newPos();

    if (hitBox(myCircle.x, myCircle.y, myCircle.size)) {
        requestAnimationFrame(update);
        score += 1;
        scoreElement.innerHTML = score
        myCircle.dx += acceleration;
        myCircle.dy += acceleration;
    } else {
        restartButton.style.display = 'block';
        inGame = false;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
update()

