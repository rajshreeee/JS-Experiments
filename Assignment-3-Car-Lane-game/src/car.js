import { getRandom } from "./getRandom.js";
export default class Car {
  constructor(game, role) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.x;
    this.y;
    this.height = 70;
    this.width = 55;
    this.speed = 5;
    this.currentLane = 1;
    this.isPlayer = role; //true or false for enemy.isplayer hamro car ko speed 0
    if (!this.isPlayer) {
      this.image = document.getElementById("enemy");
      this.y = -this.height / 2;
      this.x =
        (getRandom(0, 3) * this.gameWidth) / 3 +
        this.gameWidth / 6 -
        this.width / 2;
    }

    if (this.isPlayer) {
      this.image = document.getElementById("player");
      this.sourceX = -130;
      this.sourceY = 10;
      this.x = this.gameWidth / 3 + this.gameWidth / 6 - this.width / 2;
      this.y = this.gameHeight - this.height;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.isPlayer != true) {
      this.y += 1;
    }
  }

  moveLeft() {
    if (this.isPlayer == true) {
      if (this.currentLane <= 0) {
        return;
      } else {
        this.x = this.x - this.gameWidth / 3;
        this.currentLane--;
      }
    }
  }

  moveRight() {
    if (this.isPlayer == true) {
      if (this.currentLane >= 2) {
        return;
      } else {
        this.x = this.x + this.gameWidth / 3;
        this.currentLane++;
      }
    }
  }
}
