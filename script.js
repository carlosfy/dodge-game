const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score')
const restartButton = document.getElementById('restart')

let score = 0;
let inGame = true;
const acceleration = 0.002;

restartButton.style.display = 'none';

const image = document.getElementById('source');
const poussin = document.getElementById('poussin');
const oeuf = document.getElementById('oeuf');
const huevo = document.getElementById('huevo')

// var lePoussin = new Image()
// lePoussin.src = './poussin3.png'
// var leHuevo = new Image()
// leHuevo.src = './huevo2.png'
// // var leOeuf = new Image()
// // leOeuf.src = './egg3.png'

const player = {
    w: 90,
    h: 90,
    x: 20,
    y: 400,
    speed: 5,
    dx: 0,
    dy: 0
};

const ball = {
    x: 200,
    y: 200,
    size: 60,
    w: 60,
    h: 60,
    dx: 10,
    dy: 8,
    xdir: 1,
    ydir: 1
}

const drawPlayer = () => {
    void ctx.drawImage(poussin, player.x, player.y, player.w, player.h);
}


const drawBall = () => {
    if (inGame) {
        void ctx.drawImage(huevo, ball.x, ball.y, ball.w, ball.h);
    } else {
        void ctx.drawImage(oeuf, ball.x, ball.y, ball.w, ball.h);
    }

}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const newPosPlayer = () => {
    player.x += player.dx;
    player.y += player.dy;
    detectWalls()
}

const detectWalls = () => {
    if (player.x < -18) {
        player.x = -18;
    } else if (player.x + player.w > canvas.width + 20) {
        player.x = canvas.width - player.w + 20;
    }
    if (player.y < -20) {
        player.y = -20;
    } else if (player.y + player.h > canvas.height + 20) {
        player.y = canvas.width - player.h + 20;
    }
}


const newPosBall = () => {
    ball.x += ball.dx * ball.xdir;
    ball.y += ball.dy * ball.ydir;

    if (ball.x + ball.size > canvas.width || ball.x < 0) {
        ball.xdir *= -1;
    }

    if (ball.y + ball.size > canvas.height || ball.y < 0) {
        ball.ydir *= -1;
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

const hitBox = (ox, oy, w, h) => {
    if (ox > player.x - w / 2 && ox < player.x + player.w - 30) {
        if (oy > player.y && oy < player.y + player.h - 20) {
            return false
        }
    }
    return true
}


const restart = () => {
    if (!inGame) {

        ball.x = 200;
        ball.y = 200;
        ball.dx = 10;
        ball.dy = 8;
        ball.xdir = 1;
        ball.ydir = 1;

        player.x = 20;
        player.y = 400;
        update();
        inGame = true;
        score = 0;
        restartButton.style.display = 'none';
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

const update = () => {
    clear();

    drawPlayer();
    drawBall();

    newPosPlayer();
    newPosBall();

    if (hitBox(ball.x, ball.y, ball.w, ball.h)) {
        requestAnimationFrame(update);
        score += 1;
        scoreElement.innerHTML = score;
        ball.dx += acceleration;
        ball.dy += acceleration;
    } else {
        restartButton.style.display = 'block';
        inGame = false;
        clear();
        drawPlayer();
        drawBall()
    }



}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update()



}






// const egg = {
//     x: 200,
//     y: 200,
//     size: 30,
//     dx: 10,
//     dy: 8,
//     xdir: 1,
//     ydir: 1
// }


// const myCircle = {
//     x: 200,
//     y: 200,
//     size: 30,
//     w: 30,
//     h: 30,
//     dx: 10,
//     dy: 8,
//     xdir: 1,
//     ydir: 1
// }





// const drawCircle = (circle) => {
//     ctx.drawImage(poussin, circle.x, circle.y, egg.w, egg.h)
//     // ctx.beginPath();
//     // ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//     // ctx.fillStyle = 'coral';
//     // ctx.fill()
// }

// drawCircle(myCircle)


// void ctx.drawImage(poussin, 0, 0, canvas.width, canvas.height);
// const clear = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

// }


// const newPos = () => {
//     player.x += player.dx;
//     player.y += player.dy;
//     detectWalls()
// }


// const detectWalls = () => {
//     if (player.x < 0) {
//         player.x = 0;
//     } else if (player.x + player.w > canvas.width) {
//         player.x = canvas.width - player.w;
//     }
//     if (player.y < 0) {
//         player.y = 0;
//     } else if (player.y + player.h > canvas.width) {
//         player.y = canvas.width - player.h;
//     }
// }




// const keyDown = (e) => {
//     switch (e.key) {
//         case 'ArrowRight':
//         case 'Right':
//             moveRight();
//             break;
//         case 'ArrowLeft':
//         case 'Left':
//             moveLeft();
//             break;
//         case 'ArrowUp':
//         case 'Up':
//             moveUp();
//             break;
//         case 'ArrowDown':
//         case 'Down':
//             moveDown();
//             break;
//     }
// }

// function keyUp(e) {
//     if (e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'Left' || e.key == 'ArrowLeft') {
//         player.dx = 0;
//     }
//     if (
//         e.key == 'Up' ||
//         e.key == 'ArrowUp' ||
//         e.key == 'Down' ||
//         e.key == 'ArrowDown'
//     ) {
//         player.dy = 0;
//     }
// }

// const moveUp = () => {
//     player.dy = -player.speed
// }

// const moveDown = () => {
//     player.dy = player.speed
// }

// const moveLeft = () => {
//     player.dx = -player.speed
// }

// const moveRight = () => {
//     player.dx = player.speed
// }

// const hitBox = (ox, oy, r) => {
//     if (ox > player.x - r / 2 && ox < player.x + player.w + r / 2) {
//         if (oy > player.y - r / 2 && oy < player.y + player.h + r / 2) {
//             return false
//         }
//     }
//     return true
// }

// const restart = () => {
//     if (!inGame) {

//         myCircle.x = 200;
//         myCircle.y = 200;
//         myCircle.dx = 10;
//         myCircle.dy = 8;
//         xdir = 1;
//         ydir = 1;

//         player.x = 20;
//         player.y = 400;
//         update();
//         inGame = true;
//         score = 0;
//         restartButton.style.display = 'none';
//     }
// }


// const update = () => {
//     clear();

//     drawPlayer();
//     drawCircle(myCircle);
//     // drawPlayer();

//     // Change position circle
//     myCircle.x += myCircle.dx * myCircle.xdir;
//     myCircle.y += myCircle.dy * myCircle.ydir;

//     if (myCircle.x + myCircle.size > canvas.width || myCircle.x - myCircle.size < 0) {
//         myCircle.xdir *= -1;
//     }

//     if (myCircle.y + myCircle.size > canvas.height || myCircle.y - myCircle.size < 0) {
//         myCircle.ydir *= -1;
//     }

//     //Change position player
//     newPos();

//     if (hitBox(myCircle.x, myCircle.y, myCircle.size)) {
//         requestAnimationFrame(update);
//         score += 1;
//         scoreElement.innerHTML = score
//         myCircle.dx += acceleration;
//         myCircle.dy += acceleration;
//     } else {
//         restartButton.style.display = 'block';
//         inGame = false;
//     }
// }

// document.addEventListener('keydown', keyDown);
// document.addEventListener('keyup', keyUp);
// update()

