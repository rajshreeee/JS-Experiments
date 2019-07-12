export default class Bird {
  constructor(game) {
    this.game = game;
    this.sourceX = 276;
    this.sourceY = 112;
    this.x = 50;
    this.y = 150;
    this.width = 34;
    this.height = 26;
    this.frame = 0;
    this.gravity = 0.26;
    this.jump = 4.6;
    this.speed = 0;
    this.rotation = 0;
    this.image = document.getElementById("sprite");
    this.DEGREE = Math.PI / 180;
    this.animation = [
      { sourceX: 276, sourceY: 112 }, //bird pic1
      { sourceX: 276, sourceY: 139 }, //bird pic2
      { sourceX: 276, sourceY: 164 }, //brid pic3
      { sourceX: 276, sourceY: 139 } //bird pic2
    ];
  }

  draw(ctx) {
    let birdSprite = this.animation[this.frame];
    this.frame = this.frame % this.animation.length;
    ctx.save();
    ctx.translate(this.x, this.y); //to rotate the bird, we have to translate the point of rotation from origin to the bird position and rotate the canvas
    ctx.rotate(this.rotation); //rotating canvas
    ctx.drawImage(
      this.image,
      birdSprite.sourceX,
      birdSprite.sourceY,
      this.width,
      this.height,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  update() {
    this.speed += this.gravity;
    this.y += this.speed;
    if (
      this.y >=
      this.game.gameHeight - this.game.foreground.height - this.height / 2
    ) {
      this.y =
        this.game.gameHeight - this.game.foreground.height - this.height / 2;
    }

    //if the speed is greater than the jump, it means the bird is falling down
    if (this.speed >= this.jump) {
      this.rotation = 90 * this.DEGREE;
      this.frame = 1; //when bird falls down, it must stop flapping
    } else {
      this.rotation = -25 * this.DEGREE;
    }
  }

  flyUp() {
    this.speed = -this.jump;
  }

  reset() {
    this.rotation = 0;
    this.y = 150;
    this.speed = 0;
  }
}
