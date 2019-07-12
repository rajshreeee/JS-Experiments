import Car from "./car.js";
import { collisionDetection } from "./collisionDetection.js";
import { buildCarsArray } from "./cars.js";
import InputHandler from "./inputHandler.js";
import Background from "./background.js";
import Bullet from "./bullet.js";

const GAMESTATE = {
  MENU: 1,
  RUNNING: 2,
  PAUSED: 3
};

const startBtn = {
  x: 225,
  y: 202,
  width: 400,
  height: 400
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.car = new Car(this, true);
    this.carArray = [];
    buildCarsArray(this);
    this.background = new Background();
    this.gameOjects = [this.background, this.car];
    new InputHandler(this.car, this);
    this.score = 0;
    this.gameState = GAMESTATE.MENU;
    this.sprite = document.getElementById("sprite");
    this.startBtn = startBtn;

    document.addEventListener("keydown", event => {
      //event occurs whenever a user presses a key
      switch (event.keyCode) {
        case 32:
          this.bullet = new Bullet(this.car, this.carArray);
          break;
        default:
        //pass
      }
    });
  }

  start() {
    this.gameState = GAMESTATE.RUNNING;
  }

  pause() {
    this.gameState = GAMESTATE.PAUSED;
  }

  update(x) {
    if (this.gameState === GAMESTATE.RUNNING) {
      this.carArray.forEach(car => car.update());

      [...this.gameOjects].forEach(object => object.update());

      for (let j = 0; j < this.carArray.length; j++) {
        if (this.carArray[j].y == this.gameHeight) {
          this.score++;
          this.carArray.shift();
        }
      }

      for (let i = 0; i < this.carArray.length; i++) {
        let currentCar = this.carArray[i];
        if (collisionDetection(currentCar, this.car)) {
          cancelAnimationFrame(x);
          this.score = 0;
        }
      }

      if (this.bullet !== undefined) {
        this.bullet.update(this.carArray);
      }
    }
  }

  draw(ctx, canvas) {
    if (this.gameState !== GAMESTATE.RUNNING) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.drawImage(
        this.sprite,
        250,
        400,
        this.startBtn.x,
        this.startBtn.y,
        this.gameWidth / 2 - 50,
        this.gameHeight / 2,
        this.startBtn.width,
        this.startBtn.height
      );

      ctx.fillStyle = "#FFF";
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 2; //making it bold
      ctx.font = "30px Teko"; //size and fontstyle
      ctx.fillText("Press a to move left and d to move right.", 70, 50);
      ctx.fillText("Press spacebar to release bullets", 70, 80);

      canvas.addEventListener(
        "click",
        function(evt) {
          let rect = canvas.getBoundingClientRect();
          let clickX = evt.clientX - rect.left;
          let clickY = evt.clientY - rect.top;
          //check if we click on start button
          if (
            clickX >= startBtn.x &&
            clickX <= startBtn.x + startBtn.width &&
            clickY >= startBtn.y &&
            clickY <= startBtn.y + startBtn.height
          ) {
            this.start();
          }
        }.bind(this)
      );
    }

    if (this.gameState === GAMESTATE.RUNNING) {
      [...this.gameOjects].forEach(object => object.draw(ctx));
      this.carArray.forEach(car => car.draw(ctx));
      if (this.bullet !== undefined) {
        this.bullet.draw(ctx);
      }
      ctx.fillStyle = "#FFF";
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 2; //making it bold
      ctx.font = "35px Teko"; //size and fontstyle
      ctx.fillText(this.score, this.gameWidth / 2, 50);
      ctx.strokeText(this.score, this.gameWidth / 2, 50);
    }
  }
}
