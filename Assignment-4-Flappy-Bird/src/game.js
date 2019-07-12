import Foreground from "./foreground.js";
import Bird from "./bird.js";
import Pipe from "./pipes.js";
import { InputHandler } from "./inputHandler.js";

export default class Game {
  constructor(gameWidth, gameHeight, cvs) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.foreground = new Foreground(this.gameHeight);
    this.bird = new Bird(this);
    this.pipe = new Pipe();
    this.frames = 0;
    this.pipeArray = [];
    this.maxYPos = -150;
    this.score = {
      best: parseInt(localStorage.getItem("best")) || 0,
      value: 0
    };
    this.GAMESTATE = {
      getReady: 0,
      gamePlay: 1,
      gameOver: 2
    };
    this.gameState = this.GAMESTATE.getReady;
    InputHandler(this, cvs);
    this.image = document.getElementById("sprite");
  }

  start() {
    this.gameState = this.GAMESTATE.gamePlay;
  }

  restart() {
    this.pipeArray = [];
    this.score.value = 0;
    this.bird.reset();
  }
  update(deltaTime) {
    if (this.gameState === this.GAMESTATE.gamePlay) {
      this.foreground.update(deltaTime);
      this.bird.update(deltaTime);

      this.frames++;
      this.generatePipes();
      this.detectGroundCollision();
      this.detectPipeCollision();
    }
  }

  generatePipes() {
    if (this.frames % 100 === 0) {
      this.pipeArray.push({
        x: this.gameWidth,
        y: this.maxYPos * (Math.random() + 1)
      });
    }
  }

  detectGroundCollision() {
    if (
      this.bird.y + this.bird.height / 2 ===
      this.gameHeight - this.foreground.height
    ) {
      this.gameState = this.GAMESTATE.gameOver;
    }
  }

  detectPipeCollision() {
    for (let j = 0; j < this.pipeArray.length; j++) {
      let p = this.pipeArray[j];
      p.x -= 2;

      let leftOfBird = this.bird.x - this.bird.width / 2;
      let rightOfBird = this.bird.x + this.bird.width / 2;
      let topOfBird = this.bird.y - this.bird.height / 2;
      let bottomOfBird = this.bird.y + this.bird.height / 2;

      let leftOfTopPipe = p.x;
      let rightOfTopPipe = p.x + this.pipe.width;
      let topOfTopPipe = 0;
      let bottomOfTopPipe = p.y + this.pipe.height;

      let leftOfBottomPipe = p.x;
      let rightOfBottomPipe = p.x + this.pipe.width;
      let topOfBottomPipe = p.y + this.pipe.gap + this.pipe.height;
      let bottomOfBottomPipe = this.gameHeight;

      if (
        (leftOfBird < rightOfTopPipe &&
          rightOfBird > leftOfTopPipe &&
          topOfBird < bottomOfTopPipe &&
          bottomOfBird > topOfTopPipe) ||
        (leftOfBird < rightOfBottomPipe &&
          rightOfBird > leftOfBottomPipe &&
          topOfBird < bottomOfBottomPipe &&
          bottomOfBird > topOfBottomPipe)
      ) {
        this.gameState = this.GAMESTATE.gameOver;
      }
      if (p.x + this.pipe.width <= 0) {
        this.score.value++;
        this.score.best = Math.max(this.score.value, this.score.best);
        localStorage.setItem("best", this.score.best);
        this.pipeArray.shift();
      }
    }
  }

  draw(ctx) {
    this.renderBackground(ctx);

    this.foreground.draw(ctx);
    this.bird.draw(ctx);
    this.pipe.draw(ctx, this.pipeArray);

    this.renderCurrentScore(ctx);
    this.renderGetReadyState(ctx);
    this.renderGameOverState(ctx);
    
  }

  renderCurrentScore(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2; //making it bold
    ctx.font = "30px Teko"; //size and fontstyle
    let height = 50;
    ctx.fillText(this.score.value, this.gameWidth / 2, height);
    ctx.strokeText(this.score.value, this.gameWidth / 2, height);
  }

  renderGetReadyState(ctx) {
    const screenPosition = {
      sourceX: 0,
      sourceY: 228,
      sourceWidth: 173,
      sourceHeight: 152,
      targetY: 80,
      targetWidht: 173,
      targetHeight: 152
    };
    if (this.gameState === this.GAMESTATE.getReady) {
      ctx.drawImage(
        this.image,
        screenPosition.sourceX,
        screenPosition.sourceY,
        screenPosition.sourceWidth,
        screenPosition.sourceHeight,
        this.gameWidth / 2 - screenPosition.sourceWidth / 2,
        screenPosition.targetY,
        screenPosition.targetWidht,
        screenPosition.targetHeight
      );
    }
  }

  renderGameOverState(ctx) {
    const screenPosition = {
      sourceX: 175,
      sourceY: 228,
      sourceWidth: 225,
      sourceHeight: 202,
      targetY: 90,
      targetWidht: 225,
      targetHeight: 202
    };
    if (this.gameState === this.GAMESTATE.gameOver) {
      ctx.drawImage(
        this.image,
        screenPosition.sourceX,
        screenPosition.sourceY,
        screenPosition.sourceWidth,
        screenPosition.sourceHeight,
        this.gameWidth / 2 - screenPosition.sourceWidth / 2,
        screenPosition.targetY,
        screenPosition.targetWidht,
        screenPosition.targetHeight
      );

      ctx.font = "25px Teko"; //size and fontstyle
      //for value
      let value_height = 186;
      let best_height = 228;
      ctx.fillText(this.score.value, screenPosition.sourceWidth, value_height);
      ctx.strokeText(
        this.score.value,
        screenPosition.sourceWidth,
        value_height
      );
      //for best score
      ctx.fillText(this.score.best, screenPosition.sourceWidth, best_height);
      ctx.strokeText(this.score.best, screenPosition.sourceWidth, best_height);
    }
  }

  renderBackground(ctx){
    const position = {
      sourceX : 0,
      sourceY : 0,
      width : 275,
      height : 226,
      x : 0
    }
    ctx.drawImage(
      this.image,
      position.sourceX,
      position.sourceY,
      position.width,
      position.height,
      position.x,
      this.gameHeight - position.height,
      position.width,
      position.height
    );
    ctx.drawImage(
      this.image,
      position.sourceX,
      position.sourceY,
      position.width,
      position.height,
      position.x + position.width,
      this.gameHeight - position.height,
      position.width,
      position.height
    );
  
}

}