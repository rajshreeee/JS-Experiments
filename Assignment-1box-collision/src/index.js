let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1500;
const GAME_HEIGHT = 900;

/**
 * returns a random number
 *
 * @param {Number} minVal - minimum value
 * @param {Number} maxVal - maximum value
 */
function generateRandom(minVal, maxVal) {
  let randomNumber = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
  return randomNumber;
}

function rotate(velocityX, velocityY, angle) {
  return [
    velocityX * Math.cos(angle) - velocityY * Math.sin(angle),
    velocityX * Math.sin(angle) + velocityY * Math.cos(angle)
  ];
}

/**
 * checks for collision
 *
 * @param {object} ball - ball object
 * @param {object} gameObject - ball object
 */
function detectBallCollision(ball, gameObject) {
  let dx = gameObject.position.x - ball.position.x;
  let dy = gameObject.position.y - ball.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let sum = ball.radius + gameObject.radius;
  if (distance < sum) {
    return true;
  }
}

/**
 * checks if the mouse click is on the circle
 *
 * @param {object} point - mouse click position object
 * @param {object} ball - ball object
 */
function isIntersect(point, ball) {
  return (
    Math.sqrt(
      (point.x - ball.position.x) ** 2 + (point.y - ball.position.y) ** 2
    ) < ball.radius
  );
}

class Ball {
  /**
   * sets ball's properties
   *
   * @param {Number} x - center of circle in x axis
   * @param {Number} y - center of circle in y axis
   */
  constructor(x, y, r, velocityX, velocityY) {
    this.colors = ["#ccccff", "#99ffcc", "#ffff66", "#cc6699", "#FF0000"];
    this.radius = r;
    this.position = {
      x: x,
      y: y
    };
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.markedForDeletion = false;
  }

  /**
   * returns mass of the ball
   *
   */
  getMass() {
    return Math.PI * this.radius * this.radius;
  }

  /**
   * renders the ball
   *
   * @param {Number} ctx - context of canvas
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.colors[generateRandom(0, this.colors.length)];
    ctx.fill();
  }

  update(ballArray, index) {
    this.position.x += this.velocityX;
    this.position.y += this.velocityY;

    this.checkWallCollision();
    this.doElasticCollision(index);
    
  }

  checkWallCollision() {
    //checks to see if hits the wall left or right
    if (this.position.x + this.radius >= GAME_WIDTH) {
      this.position.x = GAME_WIDTH - this.radius;
      this.velocityX = -this.velocityX;
      // this.velocityX = -this.velocityY;
    } else if (this.position.x - this.radius <= 0) {
      this.position.x = this.radius;
      this.velocityX = -this.velocityX;
    }
    //checks to see if hits the wall top
    if (this.position.y - this.radius <= 0) {
      this.position.y = this.radius;
      this.velocityY = -this.velocityY;
    } else if (this.position.y + this.radius >= GAME_HEIGHT) {
      this.position.y = GAME_HEIGHT - this.radius;
      this.velocityY = -this.velocityY;
    }
  }

  doElasticCollision(index){
    for (let j = index + 1; j < ballArray.length; j++) {
      if (detectBallCollision(ballArray[j], this)) {
        let res = [
          this.velocityX - ballArray[j].velocityX,
          this.velocityY - ballArray[j].velocityY
        ];
        if (
          res[0] * (ballArray[j].position.x - this.position.x) +
            res[1] * (ballArray[j].position.y - this.position.y) >=
          0
        ) {
          let mass1 = this.getMass();
          let mass2 = ballArray[j].getMass();
          let angle = -Math.atan2(
            ballArray[j].position.y - this.position.y,
            ballArray[j].position.x - this.position.x
          );
          let v1 = rotate(this.velocityX, this.velocityY, angle);
          let v2 = rotate(
            ballArray[j].velocityX,
            ballArray[j].velocityY,
            angle
          );
          var u1 = rotate(
            (v1[0] * (mass1 - mass2)) / (mass1 + mass2) +
              (v2[0] * 2 * mass2) / (mass1 + mass2),
            v1[1],
            -angle
          );
          var u2 = rotate(
            (v2[0] * (mass2 - mass1)) / (mass1 + mass2) +
              (v1[0] * 2 * mass1) / (mass1 + mass2),
            v2[1],
            -angle
          );

          this.velocityX = u1[0];
          this.velocityY = u1[1];
          ballArray[j].velocityX = u2[0];
          ballArray[j].velocityY = u2[1];
        }
      }
    }
  }
}



canvas.addEventListener("click", e => {
  let rect = canvas.getBoundingClientRect();
  const pos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
  ballArray.forEach(ball => {
    if (isIntersect(pos, ball)) {
      ball.markedForDeletion = true;
    }
  });
});

let ballArray = [];

for (let i = 1; i < 1000; i++) {
  let min = Math.min(GAME_HEIGHT, GAME_WIDTH);
  let velocityX = Math.floor(((0.5 - Math.random()) * min) / 100);
  let velocityY = Math.floor(((0.5 - Math.random()) * min) / 100);
  let flag = false;
  while (flag === false) {
    let minRadius = min / 80;
    let maxRadius = min / 40;
    let radius =
      Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
    var x = Math.floor(Math.random() * (GAME_WIDTH - radius - radius)) + radius;
    var y = Math.floor(Math.random() * (GAME_HEIGHT - radius) + radius);
    var newBall = new Ball(x, y, radius, velocityX, velocityY);
    flag = true;
    for (let k = 0; k < ballArray.length; k++) {
      if (detectBallCollision(newBall, ballArray[k])) {
        flag = false;
      }
    }
  }
  ballArray.push(newBall);
}

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); /*clear our canvas */
  requestAnimationFrame(gameLoop);
  ballArray = ballArray.filter(function(ball) {
    return ball.markedForDeletion != true;
  });
  ballArray.forEach(function(ball, index) {
    ball.draw(ctx);
    ball.update(ballArray, index);
  });
}

gameLoop();
