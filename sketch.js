const GRAVITY = 1;
const DAMPING = -0.8;
const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

let balls, amountOfBalls;
let canvas;

function setup() {
  container = document.getElementById("Container");
  canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent("Container");

  amountOfBalls = 5;
  balls = generateBalls(amountOfBalls);
}

function draw() {
  background("black");
  for (let j = 0; j < balls.length; j++) {
    ball = balls[j];
    ball.render();

    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    ball.ySpeed += GRAVITY;

    if (ball.rightEdge() > width || ball.leftEdge() < 0) {
      ball.xSpeed *= -1;
      if (ball.rightEdge() > width) {
        ball.x = width - ball.radius;
      } else {
        ball.x = ball.radius;
      }
    }
    if (ball.bottomEdge() > height || ball.topEdge() < 0) {
      ball.ySpeed *= DAMPING;
      if (ball.bottomEdge() > height) {
        ball.y = height - ball.radius;
      } else if (ball.topEdge() < 0) {
        ball.y = ball.radius;
      }
    }
  }
}

function mousePressed() {
  for (let k = 0; k < balls.length; k++) {
    balls[k].ySpeed -= 20;
  }
}

function ballFactory(colour, x, y, radius, xSpeed, ySpeed) {
  return {
    colour,
    x,
    y,
    radius,
    xSpeed,
    ySpeed,
    render() {
      fill(colour);
      circle(this.x, this.y, this.radius * 2);
    },
    topEdge() {
      return this.y - this.radius;
    },
    rightEdge() {
      return this.x + this.radius;
    },
    bottomEdge() {
      return this.y + this.radius;
    },
    leftEdge() {
      return this.x - this.radius;
    },
  };
}

function generateBalls(amount) {
    let ballArray = [];
    for (let i = 0; i < amount; i++) {
        ballArray.push(
            ballFactory(
                randomColor(),
                randomInt(0, width),
                randomInt(0, height),
                randomInt(height * 0.03, height * 0.2),
                randomInt(-10, 10),
                randomInt(-10, 10)
            )
        );
    
  }

  return ballArray;
}

function randomInt(start, stop) {
  return Math.floor(Math.random() * (stop - start) + start);
}

function verlet(currPos, prevPos, acc, dt) {
  return 2*currPos - prevPos + acc*dt*dt;
}

let resetButton = document.getElementById("reset");

function resetBalls() {
    balls = generateBalls(amountOfBalls);
}

resetButton.onclick = resetBalls;
